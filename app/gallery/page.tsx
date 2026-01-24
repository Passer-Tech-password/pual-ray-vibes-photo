"use client";
import { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import GalleryGrid from "../../components/GalleryGrid";

export default function GalleryPage() {
  const [images, setImages] = useState<{ url: string; path?: string }[]>([]);
  const [category, setCategory] = useState("lifestyle");

  useEffect(() => {
    fetchImages();
  }, [category]);

  async function fetchImages() {
    try {
      const listRef = ref(storage, `gallery/${category}/`);
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async item => ({
          url: await getDownloadURL(item),
          path: item.fullPath,
        }))
      );
      setImages(urls);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="rounded-2xl ring-1 ring-accent/20 dark:ring-accent/25 bg-white dark:bg-gray-900 p-4 md:p-6">
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
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`btn px-4 py-2 text-sm ${
              category === c
                ? "btn-accent"
                : "btn-outline border-gray-300 dark:border-gray-600 hover:border-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <GalleryGrid images={images} />
    </section>
  );
}
