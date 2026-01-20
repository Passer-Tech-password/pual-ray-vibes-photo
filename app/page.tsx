"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function HomePage() {
  return (
    <>
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-brand dark:text-white"
        >
          Capture Your Moments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300"
        >
          Immersive photography with storytelling — lifestyle, events, family,
          and outdoor sessions.
        </motion.p>

        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <Link
            href="/booking"
            className="px-6 py-3 rounded-full bg-brand text-white font-medium shadow-md hover:bg-brand-muted transition-colors"
          >
            Book a Session
          </Link>
          <Link
            href="/gallery"
            className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-accent hover:text-accent transition-colors"
          >
            Explore Gallery
          </Link>
          <Link
            href="/about-Us"
            className="px-6 py-3 rounded-full border border-transparent text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
          >
            About Us
          </Link>
        </motion.div>

        {/* small animated hero images row */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          {[
            "/sample/1.jpg",
            "/sample/2.jpg",
            "/sample/3.jpg",
            "/sample/4.jpg",
          ].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Portfolio preview ${i + 1}`}
              className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
            />
          ))}
        </motion.div>
      </section>

      <TestimonialsCarousel />
    </>
  );
}
