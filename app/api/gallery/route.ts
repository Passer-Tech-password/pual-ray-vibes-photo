import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    // Construct folder path
    // If section is provided, look in gallery/{section}
    // If NOT provided, we might want to list everything under gallery/ 
    // But cloudinary.api.resources prefix is flat. 
    
    let folder = "gallery";
    if (section && section !== "all") {
      folder = `gallery/${section}`;
    }

    // Fetch from Cloudinary
    // Note: To browse folders recursively or by specific folder, use expressions or prefix
    // Prefix matches the start of public_id. "gallery/" matches "gallery/lifestyle/..."
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder, 
      max_results: 100,
      sort_by: "created_at",
      direction: "desc",
    });

    const images = result.resources.map((res: any) => ({
      id: res.public_id,
      url: res.secure_url,
      width: res.width,
      height: res.height,
      createdAt: res.created_at,
    }));

    return NextResponse.json({ images });
  } catch (err: any) {
    console.error("Gallery list error:", err);
    return NextResponse.json({ error: err.message || "Internal Error" }, { status: 500 });
  }
}
