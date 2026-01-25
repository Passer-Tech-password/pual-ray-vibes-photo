// app/api/session/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    await adminAuth.verifyIdToken(token);

    (await cookies()).set("firebase-token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }
}
