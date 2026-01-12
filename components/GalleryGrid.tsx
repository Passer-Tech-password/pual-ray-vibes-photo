"use client";
import { useState } from "react";
import Lightbox from "./Lightbox";
import { motion } from "framer-motion";

export default function GalleryGrid({ images, onDelete }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => { setIdx(i); setOpen(true); };
  const next = () => setIdx((i) => (i+1) % images.length);
  const prev = () => setIdx((i) => (i-1 + images.length) % images.length);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div key={img.path ?? i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
            <div className="relative overflow-hidden rounded-xl ring-1 ring-accent/30 hover:ring-accent transition-shadow shadow-sm hover:shadow-md aspect-[4/3]">
              <img
                src={img.url}
                onClick={() => openAt(i)}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />
            </div>
            {onDelete && img.path && (
              <button onClick={() => onDelete(img.path)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            )}
          </motion.div>
        ))}
      </div>

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
