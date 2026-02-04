import { NextResponse } from "next/server";
import { adminAuth, adminDB, adminStorage } from "@/lib/firebase-admin";

export const runtime = "nodejs"; // ✅ Ensure server-only runtime
export const dynamic = "force-dynamic"; // ✅ Prevent build-time evaluation

export async function POST(req: Request) {
  try {
    // ✅ Extract firebase-token cookie
    const cookie = req.headers.get("cookie") ?? "";
    const match = cookie.match(/(?:^|;\s*)firebase-token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify Firebase ID token
    const decoded = await adminAuth.verifyIdToken(token);

    // ✅ Check admin role in Firestore
    const roleDoc = await adminDB.collection("roles").doc(decoded.uid).get();
    const role = roleDoc.data()?.role as string | undefined;

    if (!roleDoc.exists || role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Parse FormData
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const section = form.get("section") as string | null;

    if (!file || !section) {
      return NextResponse.json(
        { error: "Missing file or section" },
        { status: 400 }
      );
    }

    // ✅ Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Generate filename
    let filename = "";
    if (section === "ceo") {
      filename = `ceo/${Date.now()}-${file.name}`;
    } else {
      filename = `gallery/${section}/${Date.now()}-${file.name}`;
    }

    // ✅ Upload to Firebase Storage
    const bucket = adminStorage;
    const uploadFile = bucket.file(filename);

    await uploadFile.save(buffer, {
      contentType: file.type,
      public: true, // optional: change if you want restricted access
    });

    // ✅ Public URL
    const url = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[Upload API Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
