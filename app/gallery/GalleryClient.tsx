"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GalleryGrid from "../../components/GalleryGrid";

export default function GalleryClient() {
  const [images, setImages] = useState<{ url: string; path?: string; createdAt?: string }[]>([]);
  const [category, setCategory] = useState("lifestyle");

  useEffect(() => {
    fetchImages();
  }, [category]);

  async function fetchImages() {
    try {
      const res = await fetch(`/api/gallery?section=${category}`);
      const data = await res.json();
      
      if (data.images) {
        setImages(data.images);
      }
    } catch (err) {
      console.warn("Fetch failed:", err);
    }
  }

  return (
    <section className="rounded-2xl ring-1 ring-accent/20 dark:ring-accent/25 bg-white dark:bg-gray-900 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-brand dark:text-white">Gallery</h1>
        <div className="h-1.5 w-16 bg-accent rounded-full mt-2 mb-6"></div>
        <div className="mb-6 flex gap-4 flex-wrap">
          {[
            "lifestyle",
            "event",
            "lovelife",
            "family",
            "outdoor",
            "portrait",
          ].map(c => (
            <motion.button
              key={c}
              onClick={() => setCategory(c)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn px-4 py-2 text-sm ${
                category === c
                  ? "btn-accent"
                  : "btn-outline border-gray-300 dark:border-gray-600 hover:border-accent"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        <GalleryGrid images={images} />
      </motion.div>
    </section>
  );
}
