"use client";

import { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
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
  const [uploadStatus, setUploadStatus] = useState("");
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

      // Sort: Firestore images first (assuming newer), or mix them
      // Since we can't easily sort mixed sources by date without metadata, 
      // we'll just put Firestore ones (likely newer/fallback) at the top if no duplicates.
      
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
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const totalFiles = files.length;
    let completedCount = 0;
    let errorCount = 0;

    console.log(`Starting batch upload of ${totalFiles} files...`);

    try {
      // Process files in parallel
      const uploadPromises = Array.from(files).map(async (file, index) => {
        try {
          setUploadStatus(`Processing ${index + 1}/${totalFiles}...`);
          
          console.log(`[File ${index + 1}] Compressing...`);
          // Compress: Max 0.4MB to ensure it fits in Firestore
          const compressed = await imageCompression(file, {
            maxSizeMB: 0.4,
            maxWidthOrHeight: 1000,
            useWebWorker: true, // Speed up compression
          });

          // 1. Try Upload to Firebase Storage
          try {
            const filename = `${Date.now()}-${file.name}`;
            const path = section === "ceo" 
              ? `ceo/${filename}`
              : `gallery/${section}/${filename}`;

            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, compressed);
            console.log(`[File ${index + 1}] Uploaded to Storage.`);
            return; // Success
          } catch (storageErr) {
            console.warn(`[File ${index + 1}] Storage failed, trying Firestore fallback...`);
          }

          // 2. Upload to Firestore (Fallback)
          await new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
              try {
                const base64String = reader.result as string;
                
                if (base64String.length > 1000000) {
                   throw new Error("Image too large (>1MB).");
                }

                await addDoc(collection(db, "images"), {
                  url: base64String,
                  section: section,
                  createdAt: new Date().toISOString(),
                  name: file.name
                });
                
                console.log(`[File ${index + 1}] Saved to Firestore.`);
                resolve();
              } catch (err) {
                reject(err);
              }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(compressed);
          });

        } catch (err) {
          console.error(`[File ${index + 1}] Failed:`, err);
          errorCount++;
          // We don't throw here so other files can continue
        } finally {
          completedCount++;
          setUploadStatus(`Uploaded ${completedCount}/${totalFiles}`);
        }
      });

      await Promise.all(uploadPromises);

      if (errorCount === 0) {
        alert("All images uploaded successfully!");
      } else if (errorCount < totalFiles) {
        alert(`Uploaded ${totalFiles - errorCount} images. ${errorCount} failed.`);
      } else {
        alert("All uploads failed. Please check your connection or image sizes.");
      }

      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchImages(); // Refresh list

    } catch (err) {
      console.error("Batch upload critical error:", err);
      alert("An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
      setUploadStatus("");
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

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Target Section</label>
          <select
            className="w-full border p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
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
        </div>

        <div className="flex-1 w-full">
           <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Actions</label>
           <label className={`cursor-pointer inline-flex items-center justify-center w-full btn btn-primary py-2.5 ${uploading ? 'opacity-75 cursor-not-allowed' : ''}`}>
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {uploadStatus || "Uploading..."}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Images (Multi)
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              multiple // ENABLED MULTIPLE UPLOADS
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {loadingImages && (
        <div className="flex justify-center my-8">
           <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <div className="space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-36"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
        </div>
      )}

      {!loadingImages && images.length === 0 && (
         <p className="text-center text-gray-500 my-10">No images found. Upload some!</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {images.map((img, i) => (
          <motion.div
            key={img.id ?? i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group aspect-square overflow-hidden rounded-lg shadow-md bg-gray-100"
          >
            <img
              src={img.url}
              alt={img.section || "Gallery image"}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
               {img.section}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}