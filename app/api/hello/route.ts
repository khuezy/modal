import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {

  const headers: any[] = []
  request.headers.forEach((v, k) => {
    headers.push({ k, v })
  })
  return NextResponse.json({
    hello: request.headers.get("host"),
    region: request.headers.get('CloudFront-Viewer-City'),
    url: request.url,
    host: request.nextUrl.host,
    origin: request.nextUrl.origin,
    headers
  });
}
