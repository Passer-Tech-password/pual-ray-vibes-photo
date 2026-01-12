"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Lightbox({ open, images = [], index = 0, onClose, onPrev, onNext }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]?.url}
              alt=""
              className="w-full max-h-[80vh] object-contain rounded"
            />

            {/* controls */}
            <button onClick={onClose} className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded">✕</button>
            <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded">◀</button>
            <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded">▶</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
