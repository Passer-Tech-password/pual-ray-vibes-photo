import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyFirebaseToken } from "@/lib/verifyToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("firebase-token")?.value;

  // Not logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Will throw if token is invalid
    await verifyFirebaseToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
