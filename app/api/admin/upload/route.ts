import { NextResponse } from "next/server";
import { adminAuth, adminDB, adminStorage } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? "";
    const match = cookie.match(/(?:^|;)\s*firebase-token=([^;]+)/);
    const token = match ? match[1] : null;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify token
    const decoded = await adminAuth.verifyIdToken(token);

    // Check admin role in Firestore
    const roleDoc = await adminDB.collection("roles").doc(decoded.uid).get();
    const role = roleDoc.data()?.role as string | undefined;
    if (!roleDoc.exists || role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Parse FormData
    const form = await req.formData();
    const file = form.get("file") as File;
    const section = form.get("section") as string;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `${section}/${Date.now()}-${file.name}`;

    const bucket = adminStorage;
    const upload = bucket.file(filename);

    await upload.save(buffer, {
      contentType: file.type,
      public: true,
    });

    const url = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
