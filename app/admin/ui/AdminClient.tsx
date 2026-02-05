"use client";

import { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";

// Temporary fallback: Use Firestore if Storage is unavailable
// (Ideally you would just fix Storage, but user asked for alternatives)
// We will store just the URL if available, but since Storage is broken,
// we might have to store base64 strings in Firestore (not recommended for production but works for small demo).
// HOWEVER, storing large base64 strings in Firestore is bad practice.
// A better alternative is Cloudinary or just fixing Firebase Storage.
// Since I can't setup Cloudinary without keys, I will stick to trying to fix Storage or
// guide the user to fix the billing/project issue.

// ... But wait, user asked "is there another way to storage those image / vidoe".
// I can implement a "local" storage fallback or just Base64 in Firestore for now?
// Base64 in Firestore has a 1MB limit. Compressed images might fit.

import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
const db = getFirestore();

type GalleryImage = {
  id?: string;
  url: string;
  section?: string;
  isBase64?: boolean;
};

const SECTIONS = ["lifestyle", "event", "lovelife", "family", "outdoor", "portrait", "ceo"];

export default function AdminClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [section, setSection] = useState("lifestyle");
  const [loadingImages, setLoadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchImages() {
    setLoadingImages(true);
    try {
      const allImages: GalleryImage[] = [];
      
      // 1. Try to fetch from Firestore (Base64 fallback)
      try {
        const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allImages.push({
            id: doc.id,
            url: data.url,
            section: data.section,
            isBase64: true
          });
        });
      } catch (err) {
        console.warn("Firestore fetch failed:", err);
      }

      // 2. Try to fetch from Storage (if available)
      try {
        await Promise.all(SECTIONS.map(async (sec) => {
          const folderPath = sec === "ceo" ? "ceo" : `gallery/${sec}`;
          const folderRef = ref(storage, folderPath);
          
          try {
            const res = await listAll(folderRef);
            const urls = await Promise.all(
              res.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return {
                  id: item.fullPath,
                  url,
                  section: sec,
                  isBase64: false
                };
              })
            );
            allImages.push(...urls);
          } catch (err) {
            // Ignore storage errors for now since we know it's down
          }
        }));
      } catch (err) {
        // Ignore
      }

      // Sort combined list
      // For Storage items, we don't have createdAt easily, so we might need mixed sorting
      // But currently Firestore items are at top if we prepend them?
      // Let's just rely on the fact that Firestore items have a "createdAt" if we wanted to sort properly.
      
      setImages(allImages);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    } finally {
      setLoadingImages(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    console.log("Starting upload process...");

    try {
      console.log("Compressing image...");
      // Max 500KB to ensure it fits in Firestore (limit 1MB)
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
      });
      console.log("Compression done.");

      // 1. Try Upload to Firebase Storage
      try {
        // Determine path
        const filename = `${Date.now()}-${file.name}`;
        const path = section === "ceo" 
          ? `ceo/${filename}`
          : `gallery/${section}/${filename}`;

        const storageRef = ref(storage, path);
        
        console.log(`Uploading to ${path}...`);
        await uploadBytes(storageRef, compressed);
        console.log("Upload success!");
        
        alert("Upload successful!");
        setUploading(false);
        setUploadProgress(0);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchImages(); // Refresh list
        return; // Exit if successful
      } catch (storageErr) {
        console.warn("Storage upload failed, trying Firestore fallback...", storageErr);
      }

      // 2. Upload to Firestore (Fallback)
      // Convert image to Base64 (Temporary solution since Storage is down)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        // Store in Firestore "images" collection
        await addDoc(collection(db, "images"), {
          url: base64String, // Storing base64 directly
          section: section,
          createdAt: new Date().toISOString(),
          name: file.name
        });

        alert("Upload successful (saved to Firestore)!");
        setUploading(false);
        setUploadProgress(0);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchImages(); // Refresh gallery
      };
      reader.readAsDataURL(compressed);

    } catch (err) {
      console.error("Upload Error Catch:", err);
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Upload Failed: ${msg}`);
    } finally {
      console.log("Resetting uploading state.");
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Admin Dashboard
      </motion.h1>

      <select
        className="border p-2 rounded-lg mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      >
        <option value="lifestyle">Lifestyle</option>
        <option value="event">Event</option>
        <option value="lovelife">Love Life</option>
        <option value="family">Family</option>
        <option value="outdoor">Outdoor</option>
        <option value="portrait">Portrait</option>
        <option value="ceo">CEO Profile</option>
      </select>

      <label className="cursor-pointer inline-flex items-center btn btn-primary">
        {uploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          "Upload Image"
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </label>

      {loadingImages && <p className="mt-4 text-gray-500">Loading images...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {images.map((img, i) => (
          <motion.div
            key={img.id ?? i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src={img.url}
              alt={img.section || "Gallery image"}
              className="rounded shadow"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
