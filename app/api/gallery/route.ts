import { NextResponse } from "next/server";
import { adminAuth, adminStorage } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? "";
    const match = cookie.match(/(?:^|;\s*)firebase-token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await adminAuth.verifyIdToken(token);
    } catch (authError) {
      console.error("Auth verification failed:", authError);
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    // Check if storage is ready
    if (typeof adminStorage.getFiles !== "function") {
       console.error("Storage not initialized properly");
       return NextResponse.json({ error: "Storage Configuration Error" }, { status: 500 });
    }

    const [files] = await adminStorage.getFiles();

    const images = files.map((file) => {
      const name = file.name; // e.g., "gallery/lifestyle/123.jpg" or "ceo/123.jpg"
      const parts = name.split("/");
      
      let section = "uncategorized";
      if (parts[0] === "gallery" && parts.length > 2) {
        section = parts[1];
      } else if (parts[0] === "ceo") {
        section = "ceo";
      } else if (parts.length > 1) {
        section = parts[0];
      }

      const url = `https://storage.googleapis.com/${adminStorage.name}/${name}`;
      
      return {
        id: name,
        url,
        section
      };
    });

    // Sort by time (newest first) based on filename timestamp if possible, or just reverse
    // Filenames are section/timestamp-name
    images.sort((a, b) => {
      // Try to extract timestamp
      const getTs = (name: string) => {
        const parts = name.split("/");
        if (parts.length < 2) return 0;
        const ts = parseInt(parts[1].split("-")[0]);
        return isNaN(ts) ? 0 : ts;
      };
      return getTs(b.id) - getTs(a.id);
    });

    return NextResponse.json({ images });
  } catch (err) {
    console.error("Gallery list error:", err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
