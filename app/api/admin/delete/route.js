// app/api/admin/delete/route.js
import { NextResponse } from "next/server";
import admin from "../../_lib/firebase-admin";

export async function POST(req) {
  try {
    // Read token from cookie 'fb_token' or Authorization header
    const cookie = req.headers.get("cookie") ?? "";
    const match = cookie.match(/fb_token=([^;]+)/);
    let token = match ? match[1] : null;

    if (!token) {
      // fallback: Authorization header Bearer <token>
      const auth = req.headers.get("authorization") || "";
      const m = auth.match(/Bearer\s+(.*)/);
      if (m) token = m[1];
    }

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify ID token
    const decoded = await admin.auth().verifyIdToken(token);
    // Optionally check uid/email for admin role:
    const allowedAdmins = [
      process.env.ADMIN_UID || "",
      process.env.ADMIN_EMAIL || "",
    ];
    if (
      !allowedAdmins.includes(decoded.uid) &&
      !allowedAdmins.includes(decoded.email)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // parse body for path to delete
    const { path } = await req.json();
    if (!path)
      return NextResponse.json({ error: "Missing path" }, { status: 400 });

    // Delete file from Cloud Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(path); // path like "gallery/lifestyle/1654323-photo.jpg"
    await file.delete();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete error", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
