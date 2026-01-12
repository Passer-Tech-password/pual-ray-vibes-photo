"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Bride",
    content: "Paul captured our wedding day perfectly! His attention to detail and ability to capture genuine emotions is incredible. Every photo tells a story, and we couldn't be happier with the results.",
    rating: 5,
    image: "/testimonials/sarah.jpg",
    date: "December 2024"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    content: "Professional, creative, and punctual. Paul did an amazing job with our corporate headshots and product photography. Highly recommend for any business photography needs!",
    rating: 5,
    image: "/testimonials/michael.jpg",
    date: "November 2024"
  },
  {
    id: 3,
    name: "Amanda Rodriguez",
    role: "Family Client",
    content: "We had a wonderful family photo session with Paul. He made everyone feel comfortable and captured beautiful, natural moments. The photos are treasures we'll cherish forever.",
    rating: 5,
    image: "/testimonials/amanda.jpg",
    date: "October 2024"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Event Organizer",
    content: "Paul covered our annual charity gala and exceeded all expectations. His ability to work in various lighting conditions and capture the essence of the event was remarkable.",
    rating: 5,
    image: "/testimonials/david.jpg",
    date: "September 2024"
  },
  {
    id: 5,
    name: "Emma Williams",
    role: "Model",
    content: "Working with Paul was an absolute pleasure. His direction during the shoot was clear and professional, and the final images were stunning. I would work with him again in a heartbeat!",
    rating: 5,
    image: "/testimonials/emma.jpg",
    date: "August 2024"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-brand.soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with us.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial display */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12 min-h-[300px] flex items-center ring-1 ring-accent/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full mr-4 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-200">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{testimonials[currentIndex].role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[currentIndex].date}</p>
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 dark:text-gray-200 mb-6 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonials[currentIndex].rating} out of 5 stars
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-brand"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play toggle */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isAutoPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
