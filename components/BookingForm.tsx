"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  selectedPackage?: string;
  onBack: () => void;
}

export default function BookingForm({
  selectedDate,
  selectedTime,
  selectedPackage,
  onBack,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: selectedPackage || "lifestyle",
    location: "",
    message: "",
    guests: "1-2",
    duration: "1 hour",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [isConfirming, setIsConfirming] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof typeof prev]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsConfirming(true);
    }
  };

  const handleConfirmBooking = async () => {
    setIsConfirming(false);
    setIsSubmitting(true);

    const bookingPromise = fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        date: selectedDate.toISOString(),
        time: selectedTime,
        package: selectedPackage,
      }),
    });

    await toast
      .promise(
        bookingPromise.then(async res => {
          if (res.ok) {
            return res.json();
          }
          const errorData = await res
            .json()
            .catch(() => ({ error: "An unknown error occurred." }));
          throw new Error(errorData.error || "Something went wrong.");
        }),
        {
          loading: "Sending booking request...",
          success: data => {
            setSubmitStatus("success"); // To show the success screen
            setFormData({
              name: "",
              email: "",
              phone: "",
              sessionType: "lifestyle",
              location: "",
              message: "",
              guests: "1-2",
              duration: "1 hour",
            });
            return data.message || "Booking request sent successfully!";
          },
          error: err =>
            err.message || "Something went wrong. Please try again.",
        },
      )
      .catch(() => {
        // Catch block to prevent unhandled promise rejection,
        // react-hot-toast already handles displaying the error.
      });

    setIsSubmitting(false);
  };

  const sessionTypes = [
    { value: "lifestyle", label: "Lifestyle Photography" },
    { value: "event", label: "Event Photography" },
    { value: "family", label: "Family Portraits" },
    { value: "outdoor", label: "Outdoor Session" },
    { value: "portrait", label: "Professional Portrait" },
    { value: "wedding", label: "Wedding Photography" },
  ];

  const guestOptions = ["1-2", "3-5", "6-10", "10+"];
  const durationOptions = [
    "1 hour",
    "2 hours",
    "3 hours",
    "Half day (4 hours)",
    "Full day (8 hours)",
  ];

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Booking Request Sent!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your booking request. We&apos;ll contact you within 24
          hours to confirm your session details.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onBack}
            className="btn btn-outline px-6 py-2 rounded-lg"
          >
            Book Another Session
          </button>
          <Link
            href="/"
            className="btn btn-primary px-6 py-2 rounded-lg"
          >
            Go to Homepage
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsConfirming(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Confirm Your Booking
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please review your details before confirming.
              </p>
              <div className="space-y-3 text-sm border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Date:</span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {selectedDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Time:</span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Session:</span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {
                      sessionTypes.find(s => s.value === formData.sessionType)
                        ?.label
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Name:</span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {formData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Email:</span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {formData.email}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsConfirming(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Calendar
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Selected Session
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedTime}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="sessionType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Session Type *
              </label>
              <select
                id="sessionType"
                name="sessionType"
                value={formData.sessionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {sessionTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {guestOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Session Duration
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {durationOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Preferred Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Lagos, Abuja, or specific venue"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Additional Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your vision, special requirements, or any questions..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn btn-primary w-full"
            >
              {isSubmitting ? "Processing..." : "Review Booking"}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
