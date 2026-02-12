"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { GalleryImage } from "@/types";

/* ✅ Properly typed props */
interface LightboxProps {
  open: boolean;
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  // Use refs to keep handlers stable for the effect
  const onCloseRef = useRef(onClose);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);

  // Update refs whenever props change
  useEffect(() => {
    onCloseRef.current = onClose;
    onPrevRef.current = onPrev;
    onNextRef.current = onNext;
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft") onPrevRef.current();
      if (e.key === "ArrowRight") onNextRef.current();
    }

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open]); // Dependencies reduced to just 'open' to prevent scroll flicker

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
              alt={images[index]?.alt ?? "Gallery image"}
              className="w-full max-h-[80vh] object-contain rounded"
            />

            {/* controls */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded"
            >
              ✕
            </button>

            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded"
            >
              ◀
            </button>

            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded"
            >
              ▶
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
