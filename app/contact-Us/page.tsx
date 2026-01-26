"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-brand dark:text-white">
        Contact Us
      </h1>
      <div className="h-1.5 w-16 bg-accent rounded-full mt-2 mb-6"></div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-900 p-6 shadow rounded-lg"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows={5}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        ></textarea>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn btn-accent disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}


