"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Lightbox from "@/components/Lightbox";
import { GalleryImage } from "@/types";

const CATEGORIES = ["lifestyle", "event", "lovelife", "family", "outdoor", "portrait"];

export default function HomeClient() {
  const [featuredImages, setFeaturedImages] = useState<Record<string, GalleryImage[]>>({});
  const [heroImages, setHeroImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? lightboxImages.length - 1 : i - 1));
  }, [lightboxImages]);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i === lightboxImages.length - 1 ? 0 : i + 1));
  }, [lightboxImages]);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const results = await Promise.all(
          CATEGORIES.map(async (category) => {
            const res = await fetch(`/api/gallery?section=${category}`);
            const data = await res.json();
            return {
              category,
              images: data.images ? data.images.slice(0, 10) : [],
            };
          })
        );

        const newImages: Record<string, GalleryImage[]> = {};
        results.forEach((item) => {
          if (item.images.length > 0) {
            newImages[item.category] = item.images;
          }
        });

        setFeaturedImages(newImages);
        
        // Also set hero images here to avoid extra render cycle
        if (Object.keys(newImages).length > 0) {
          setHeroImages(
            Object.values(newImages)
              .flat()
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
          );
        }
      } catch (error) {
        console.error("Failed to fetch featured images", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllCategories();
  }, []);

  return (
    <>
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-brand dark:text-white"
        >
          Artsbypaulray-Lifestyle & Fashion Photographer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300"
        >
          "Timeless imagery defined by color, depth, and story."
        </motion.p>

        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/booking" className="btn btn-primary">
              Book a Session
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/gallery" className="btn btn-outline">
              Explore Gallery
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/about-Us" className="btn btn-ghost">
              About Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Dynamic Hero Images Row */}
        {heroImages.length > 0 && (
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            {heroImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                className="relative w-full h-36 sm:h-40 md:h-44 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={`Portfolio preview - ${img.id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Featured Collections Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Featured Collections
          </h2>
          
          {loading ? (
             <div className="flex justify-center p-10">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
             </div>
          ) : (
            <div className="space-y-16">
              {CATEGORIES.map((category) => {
                const images = featuredImages[category];
                if (!images || images.length === 0) return null;

                return (
                  <div key={category} className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold capitalize text-gray-800 dark:text-gray-200">
                        {category}
                      </h3>
                      <Link 
                        href={`/gallery?category=${category}`}
                        className="text-brand hover:underline text-sm font-medium"
                      >
                        View All
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {images.map((img, index) => (
                        <motion.button
                          key={img.id}
                          whileHover={{ y: -5 }}
                          className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md cursor-pointer w-full p-0 border-0 focus:outline-none focus:ring-2 focus:ring-brand"
                          onClick={() => {
                            setLightboxImages(images);
                            setLightboxIndex(index);
                            setLightboxOpen(true);
                          }}
                          aria-label={`View ${category} image ${index + 1}`}
                        >
                          <Image
                            src={img.url}
                            alt={`${category} photo`}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 20vw"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <TestimonialsCarousel />

      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        images={lightboxImages}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
