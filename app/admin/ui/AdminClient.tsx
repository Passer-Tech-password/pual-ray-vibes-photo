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
        className="border p-2 rounded-lg mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      >
        <option value="lifestyle">Lifestyle</option>
        <option value="event">Event</option>
        <option value="lovelife">Love Life</option>
        <option value="family">Family</option>
        <option value="outdoor">Outdoor</option>
      </select>

      <label className="cursor-pointer inline-flex items-center btn btn-primary">
        {uploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          "Upload Image"
        )}
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
