"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const packages: Package[] = [
  {
    id: "basic",
    name: "Basic Session",
    price: 250,
    duration: "1 Hour",
    description: "Perfect for quick portraits or small family sessions",
    features: [
      "1 hour photography session",
      "1 location",
      "15-20 edited photos",
      "Online gallery access",
      "High-resolution digital images",
      "2 weeks delivery time"
    ],
    buttonText: "Book Basic"
  },
  {
    id: "standard",
    name: "Standard Session",
    price: 450,
    duration: "2 Hours",
    description: "Our most popular package for comprehensive coverage",
    features: [
      "2 hour photography session",
      "Up to 2 locations",
      "40-50 edited photos",
      "Online gallery access",
      "High-resolution digital images",
      "Print release included",
      "1 week delivery time",
      "Basic retouching"
    ],
    popular: true,
    buttonText: "Book Standard"
  },
  {
    id: "premium",
    name: "Premium Session",
    price: 750,
    duration: "3 Hours",
    description: "Complete photography experience with extensive coverage",
    features: [
      "3 hour photography session",
      "Up to 3 locations",
      "80-100 edited photos",
      "Online gallery access",
      "High-resolution digital images",
      "Print release included",
      "5 days delivery time",
      "Advanced retouching",
      "20-page photo album",
      "USB drive with all images"
    ],
    buttonText: "Book Premium"
  },
  {
    id: "wedding",
    name: "Wedding Package",
    price: 1500,
    duration: "Full Day",
    description: "Complete wedding day coverage with all the essentials",
    features: [
      "Full day coverage (8 hours)",
      "Engagement session included",
      "200+ edited photos",
      "Online gallery access",
      "High-resolution digital images",
      "Print release included",
      "2 weeks delivery time",
      "Advanced retouching",
      "30-page premium album",
      "Second photographer option"
    ],
    buttonText: "Book Wedding"
  }
];

const addOns = [
  {
    name: "Additional Hour",
    price: 100,
    description: "Extra hour of photography time"
  },
  {
    name: "Extra Location",
    price: 75,
    description: "Additional shooting location"
  },
  {
    name: "Rush Delivery",
    price: 150,
    description: "48-hour delivery for urgent needs"
  },
  {
    name: "Advanced Retouching",
    price: 25,
    description: "Per image professional editing"
  },
  {
    name: "Second Photographer",
    price: 300,
    description: "Additional photographer for events"
  },
  {
    name: "Photo Album (20 pages)",
    price: 200,
    description: "Professional printed photo album"
  }
];

export default function PricingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("standard");

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    // Navigate to booking page with selected package
    window.location.href = `/booking?package=${packageId}`;
  };

  return (
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Photography Packages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect package for your photography needs. All packages include professional editing and online gallery access.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ring-1 ring-accent/20 hover:ring-accent transition-shadow ${
                pkg.popular ? "ring-2 ring-accent" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent text-black">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${pkg.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">/{pkg.duration}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    pkg.popular
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {pkg.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="rounded-lg p-4 bg-white dark:bg-gray-900 ring-1 ring-accent/20 dark:ring-accent/25 hover:ring-accent transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{addon.name}</h3>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${addon.price}</span>
                  </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 ring-1 ring-accent/15 dark:ring-accent/25"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-lg p-4 ring-1 ring-accent/15 dark:ring-accent/25 mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's included in the editing?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All packages include color correction, exposure adjustment, and basic retouching. Premium packages include advanced skin smoothing and object removal.
                </p>
              </div>

              <div className="rounded-lg p-4 ring-1 ring-accent/15 dark:ring-accent/25">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How long does delivery take?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Delivery times vary by package: Basic (2 weeks), Standard (1 week), Premium (5 days), Wedding (2 weeks). Rush delivery available as an add-on.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-lg p-4 ring-1 ring-accent/15 dark:ring-accent/25 mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do you travel for shoots?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Travel within Lagos is included. Outside Lagos, travel fees apply based on distance and accommodation needs.
                </p>
              </div>

              <div className="rounded-lg p-4 ring-1 ring-accent/15 dark:ring-accent/25">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can we customize a package?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! Contact us to discuss your specific needs and we'll create a custom package just for you.
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
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Book Your Session?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Contact us today to discuss your photography needs and secure your preferred date.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/booking"
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Book Now
            </a>
            <a
              href="/contact-Us"
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
