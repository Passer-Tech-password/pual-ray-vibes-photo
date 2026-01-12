import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("fb_token");

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    // Optional: allow through; for strong security validate token via Admin SDK in an API route
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
