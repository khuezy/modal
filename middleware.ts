// import { NextRequest } from "next/dist/server/web/spec-extension/request";
// import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextResponse, NextRequest } from "next/server";
// import { withAuth } from "next-auth/middleware";
// import createIntlMiddleware from "next-intl/middleware";

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}


export async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  // const ar = await withAuth()

  const path = request.nextUrl.pathname; //new URL(request.url).pathname;

  const host = request.headers.get("host");
  const protocol = host === "localhost:3000" ? "http" : "https";
  if (path?.includes("/feed")) {
    return new NextResponse(
      JSON.stringify({
        message: "hi?",
        url: request.url,
        host,
        nextUrl: request.nextUrl.host,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } else if (path?.includes("/redirect")) {
    const u = new URL("/about", `${protocol}://${host}`);
    return NextResponse.redirect(u);
  } else if (path?.includes("/rewrite")) {
    const u = new URL("/help", `${protocol}://${host}`);
    return NextResponse.rewrite(u);
  } else if (path === ("/i18n")) {

    const locale = getLocale(request)

    const u = new URL(`/${locale}`, `${protocol}://${host}`);
    return NextResponse.rewrite(u);
  }

  // const u = new URL("/feed", request.url);
  // console.log(request.url);
  const rHeaders = new Headers();
  rHeaders.set('hhh', request.nextUrl.searchParams.get('hhh')!)
  // rHeaders.set('content-encodng', 'gzip')
  // Step 3: Alter the response
  rHeaders.set('x-default-locale', defaultLocale);
  const r = NextResponse.next({
    headers: rHeaders,
    // request: {
    //   headers: rHeaders,
    // },
  });
  r.cookies.set('koocies', 'keks')
  r.cookies.set('hellow', 'orld')
  // console.log('~~mw')
  return r;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|match|static|fonts|api/auth|og|api/og|beta/opengraph-*|api/revalidate).*)",
  ],
};
