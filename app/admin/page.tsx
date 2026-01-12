"use client";

import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [section, setSection] = useState("lifestyle");

  // Fetch images from API
  async function fetchImages() {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setImages(data.images);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload Handler
  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    // Compress image
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

    if (res.ok) {
      fetchImages(); // refresh gallery after upload
    } else {
      alert("Upload failed");
    }

    setUploading(false);
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6"
      >
        Admin Dashboard
      </motion.h1>

      {/* Section Select */}
      <select
        className="border p-2 rounded mb-4"
        onChange={e => setSection(e.target.value)}
      >
        <option value="lifestyle">Lifestyle</option>
        <option value="event">Event</option>
        <option value="lovelife">Love Life</option>
        <option value="family">Family</option>
        <option value="outdoor">Outdoor</option>
      </select>

      {/* Upload */}
      <label className="cursor-pointer inline-block bg-black text-white px-4 py-2 rounded">
        {uploading ? "Uploading…" : "Upload Image"}
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>

      {/* Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img src={img.url} className="rounded shadow" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
