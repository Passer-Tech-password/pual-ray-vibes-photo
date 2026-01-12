import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyFirebaseToken } from "./lib/verifyToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("firebase-token")?.value;

  // Not logged in → redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Validate token using Firebase Admin SDK
  const { valid } = await verifyFirebaseToken(token);
  if (!valid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
