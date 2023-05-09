import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Access-Control-Allow-Origin", "*");
  requestHeaders.set("Access-Control-Max-Age", "86400");
  requestHeaders.set("Access-Control-Allow-Methods", "GET, OPTIONS");

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Max-Age", "86400");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  return response;
}
