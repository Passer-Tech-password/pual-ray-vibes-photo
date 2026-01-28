"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

interface PricingItem {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const photoshootPackages: PricingItem[] = [
  {
    id: "photo-5",
    name: "5 Pictures",
    price: "₦75,000",
    description: "1 Outfit",
    features: ["5 Edited Pictures", "1 Outfit", "High-resolution digital images"],
    buttonText: "Book Now",
  },
  {
    id: "photo-7",
    name: "7 Pictures",
    price: "₦100,000",
    description: "2 Outfits",
    features: ["7 Edited Pictures", "2 Outfits", "High-resolution digital images"],
    popular: true,
    buttonText: "Book Now",
  },
  {
    id: "photo-10",
    name: "10 Pictures",
    price: "₦150,000",
    description: "Max 2 Outfits",
    features: [
      "10 Edited Pictures",
      "Max 2 Outfits",
      "High-resolution digital images",
    ],
    buttonText: "Book Now",
  },
  {
    id: "photo-15",
    name: "15 Pictures",
    price: "₦200,000",
    description: "Max 3 Outfits",
    features: [
      "15 Edited Pictures",
      "Max 3 Outfits",
      "High-resolution digital images",
    ],
    buttonText: "Book Now",
  },
  {
    id: "photo-20",
    name: "20 Pictures",
    price: "₦250,000",
    description: "Max 4 Outfits",
    features: [
      "20 Edited Pictures",
      "Max 4 Outfits",
      "High-resolution digital images",
    ],
    buttonText: "Book Now",
  },
];

const videoPackages: PricingItem[] = [
  {
    id: "video-hd",
    name: "HD Lifestyle Video",
    price: "₦70,000",
    description: "1 Minute Clip",
    features: ["HD Quality", "1 Minute Duration", "Lifestyle Concept"],
    buttonText: "Book Video",
  },
  {
    id: "video-4k",
    name: "4K Lifestyle Video",
    price: "₦150,000",
    description: "2 Minutes Max",
    features: ["4K Quality", "2 Minutes Max Duration", "Lifestyle Concept"],
    buttonText: "Book Video",
  },
];

const eventPackages: PricingItem[] = [
  {
    id: "event-exclusive",
    name: "Event Coverage (Exclusive)",
    price: "₦500,000",
    description: "Comprehensive Event Coverage",
    features: [
      "50 Edited Pictures",
      "4K Video Trailer of the Event",
      "Exclusive Coverage",
    ],
    buttonText: "Book Event",
  },
];

const addOns = [
  {
    name: "Extra Picture",
    price: "₦15,000",
    description: "Per additional edited image",
  },
  {
    name: "Express Delivery",
    price: "₦15,000",
    description: "24-hour delivery timeline",
  },
  {
    name: "Lateness Fee",
    price: "₦10,000",
    description: "Charged for 2 hours lateness",
  },
  {
    name: "Rescheduling (Day of Shoot)",
    price: "₦10,000",
    description: "Fee for last-minute rescheduling",
  },
];

export default function PricingPage() {
  const router = useRouter();

  const handlePackageSelect = (packageId: string) => {
    // Navigate to booking page with selected package
    router.push(`/booking?package=${packageId}`);
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pricing & Packages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transparent pricing for professional photography and videography services.
          </p>
        </div>

        {/* Photoshoot Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Photoshoot Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {photoshootPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-brand hover:shadow-xl transition-all h-full flex flex-col ${
                  pkg.popular ? "ring-2 ring-brand dark:ring-brand" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand text-white uppercase tracking-wide shadow-sm">
                      Best Value
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col h-full">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {pkg.name}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                      {pkg.description}
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl font-bold text-brand">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`mt-auto w-full py-2.5 px-4 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand ${
                      pkg.popular
                        ? "bg-brand text-white hover:bg-brand/90"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {pkg.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Videoshoot & Event Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Videoshoot */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Videoshoot Packages
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {videoPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-brand transition-all"
                >
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      {pkg.description}
                    </p>
                    <div className="text-2xl font-bold text-brand">
                      {pkg.price}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePackageSelect(pkg.id)}
                    className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    {pkg.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Event Coverage */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Event Coverage
            </h2>
            <div className="grid grid-cols-1 gap-6 h-full">
              {eventPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-xl p-8 flex flex-col justify-between h-full ring-1 ring-gray-700"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold">{pkg.name}</h3>
                      <span className="bg-brand text-white text-xs font-bold px-2 py-1 rounded uppercase">
                        Exclusive
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-accent mb-6">
                      {pkg.price}
                    </div>
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckIcon className="w-6 h-6 text-brand mr-3 flex-shrink-0" />
                          <span className="text-gray-300 text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handlePackageSelect(pkg.id)}
                    className="w-full py-4 bg-brand text-white rounded-xl font-bold text-lg hover:bg-brand/90 transition-colors shadow-lg shadow-brand/25"
                  >
                    {pkg.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-24"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Additional Services & Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="rounded-xl p-6 bg-gray-50 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-brand transition-all"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {addon.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      {addon.description}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-brand">
                    {addon.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-8 lg:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  How long does editing take?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Standard editing takes 3 days after the shoot. Express delivery (24 hours) is available for an additional ₦15,000.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Do you charge for lateness?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, punctuality is important. 2 hours lateness attracts an additional fee of ₦10,000.
                </p>
              </div>
            </div>
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  What is your rescheduling policy?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Rescheduling must be done at least 24 hours before the shoot. Rescheduling on the day of the shoot attracts an additional ₦10,000 fee.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Do you travel for shoots?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, but locations outside our standard territory (e.g., Asaba) attract an additional ₦15,000 for logistics.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-24"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Create Magic?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Book your session today or contact us for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="px-8 py-4 bg-brand text-white rounded-xl font-bold hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20 w-full sm:w-auto"
            >
              Book Now
            </Link>
            <Link
              href="/contact-Us"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
