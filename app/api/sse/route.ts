import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const resStream = new TransformStream();
  const writer = resStream.writable.getWriter();
  // const encoder = new TextEncoder();
  writer.write(`data: ${JSON.stringify({ message: "hello" })}\n\n`);
  setTimeout(() => {
    writer.write(`data: ${JSON.stringify({ message: "close" })}\n\n`);
    writer.close();
  }, 4000);
  const res = new Response(resStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Content-Encoding": "none",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });

  return res;
}
