"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    name: "John Doe",
    role: "Lead Photographer",
    image: "/images/team-1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Creative Director",
    image: "/images/team-2.jpg",
  },
  {
    name: "Michael Lee",
    role: "Photo Editor",
    image: "/images/team-3.jpg",
  },
];

export default function AboutUs() {
  const whatsappLink =
    "https://wa.me/2348168847345?text=Hello%20I%20would%20like%20to%20book%20a%20photoshoot";

  return (
    <section className="w-full px-4 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= HERO / INTRO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-3xl ring-1 ring-accent/20 shadow-sm p-6 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-brand dark:text-white">
                About Our Photography Brand
              </h1>
              <div className="h-1.5 w-16 bg-accent rounded-full mt-4"></div>

              <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl">
                We capture authentic moments and turn them into timeless visual
                stories through lifestyle, portrait, event, and creative
                photography.
              </p>
            </div>

            <div className="relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-hero.jpg"
                alt="Photography studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ================= SERVICES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            "Lifestyle Photography",
            "Event Photography",
            "Couple Shoots",
            "Family Portraits",
            "Outdoor Photography",
            "Creative Studio Shoots",
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 ring-1 ring-accent/15 hover:ring-accent/40 transition"
            >
              <h3 className="text-lg font-semibold text-brand dark:text-white">
                {service}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                High-quality, professional coverage tailored to your moments.
              </p>
            </div>
          ))}
        </motion.div>

        {/* ================= CEO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800/40 rounded-3xl p-6 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden ring-4 ring-accent/30">
              <Image
                src="/images/ceo.jpg"
                alt="CEO"
                fill
                className="object-cover"
              />
            </div>

            <div className="md:col-span-2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-brand dark:text-white">
                Meet the CEO
              </h2>
              <div className="h-1 w-12 bg-accent rounded mt-3 mb-5 mx-auto md:mx-0"></div>

              <p className="text-gray-700 dark:text-gray-300">
                Our CEO leads with creativity, storytelling, and a deep passion
                for capturing emotion through photography.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= TEAM ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand dark:text-white">
              Meet Our Creative Team
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              The professionals behind every beautiful shot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden ring-1 ring-accent/15 shadow-sm"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-brand dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= STATS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Happy Clients", value: "500+" },
            { label: "Events Covered", value: "300+" },
            { label: "Years Experience", value: "8+" },
            { label: "Photos Delivered", value: "50k+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center ring-1 ring-accent/15"
            >
              <p className="text-3xl font-bold text-brand dark:text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ================= CTA (WHATSAPP) ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-brand to-accent rounded-3xl p-8 md:p-14 text-center text-white"
        >
          <h2 className="text-2xl md:text-4xl font-bold">
            Ready to Book Your Photoshoot?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Chat with us instantly on WhatsApp to schedule your session and
            bring your vision to life.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-xl bg-white text-brand font-semibold hover:bg-white/90 transition"
            >
              📱 Chat on WhatsApp
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
