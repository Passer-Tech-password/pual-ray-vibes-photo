"use client";
import { useState } from "react";
import Lightbox from "./Lightbox";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  url: string;
  path?: string;
  alt?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onDelete?: (path: string) => void;
}

export default function GalleryGrid({ images, onDelete }: GalleryGridProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };
  const next = () => setIdx(i => (i + 1) % images.length);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);

  return (
    <>
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {images.map((img, i) => (
            <motion.div
              layout
              key={img.path ?? img.url} // Use url as fallback key if path is missing
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-xl ring-1 ring-accent/30 hover:ring-accent transition-shadow shadow-sm hover:shadow-md aspect-[4/3]">
                <img
                  src={img.url}
                  alt={img.alt || "Gallery image"}
                  onClick={() => openAt(i)}
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
                />
              </div>
              {onDelete && img.path && (
                <button
                  onClick={() => onDelete(img.path!)}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        open={open}
        images={images}
        index={idx}
        onClose={() => setOpen(false)}
        onNext={next}
        onPrev={prev}
      />
    </>
  );
}
