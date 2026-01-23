"use client";

import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";

type GalleryImage = {
  id?: string;
  url: string;
  section?: string;
};

export default function AdminClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [section, setSection] = useState("lifestyle");

  async function fetchImages() {
    const res = await fetch("/api/gallery", {
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json();
    setImages(data.images ?? []);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });

    const formData = new FormData();
    formData.append("file", compressed);
    formData.append("section", section);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (res.ok) fetchImages();
    else alert("Upload failed");

    setUploading(false);
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Admin Dashboard
      </motion.h1>

      <select
        className="border p-2 rounded mb-4"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      >
        <option value="lifestyle">Lifestyle</option>
        <option value="event">Event</option>
        <option value="lovelife">Love Life</option>
        <option value="family">Family</option>
        <option value="outdoor">Outdoor</option>
      </select>

      <label className="cursor-pointer inline-block bg-black text-white px-4 py-2 rounded">
        {uploading ? "Uploading…" : "Upload Image"}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {images.map((img, i) => (
          <motion.div
            key={img.id ?? i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src={img.url}
              alt={img.section || "Gallery image"}
              className="rounded shadow"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
