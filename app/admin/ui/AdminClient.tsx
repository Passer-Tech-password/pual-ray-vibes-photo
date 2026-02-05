"use client";

import { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";

type GalleryImage = {
  id: string;
  url: string;
  section?: string;
  status?: "pending" | "uploading" | "success" | "error";
  localId?: string;
};

const SECTIONS = ["lifestyle", "event", "lovelife", "family", "outdoor", "portrait", "ceo"];

export default function AdminClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [section, setSection] = useState("lifestyle");
  const [loadingImages, setLoadingImages] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery?public_id=${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Failed to delete");
      
      // Remove from UI
      setImages(prev => prev.filter(img => img.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  }

  async function fetchImages() {
    setLoadingImages(true);
    try {
      // Fetch all images from Cloudinary (gallery folder)
      const res = await fetch("/api/gallery?section=all");
      const data = await res.json();
      
      if (data.images) {
        setImages(data.images);
      }
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
    setErrorDetails(null);
    const filesArray = Array.from(files);
    
    // 1. Optimistic UI: Add images immediately
    const newImages = filesArray.map(file => ({
      id: `temp-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      section: section,
      status: "uploading" as const,
      localId: `${Date.now()}-${Math.random()}`
    }));
    
    // Prepend new images to the grid
    setImages(prev => [...newImages, ...prev]);

    const totalFiles = filesArray.length;
    let completedCount = 0;
    let errorCount = 0;

    // Process in batches
    const BATCH_SIZE = 3; 
    const chunks = [];
    for (let i = 0; i < totalFiles; i += BATCH_SIZE) {
      chunks.push({
        files: filesArray.slice(i, i + BATCH_SIZE),
        imagesMeta: newImages.slice(i, i + BATCH_SIZE)
      });
    }

    console.log(`Starting upload of ${totalFiles} files...`);

    try {
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const batchNumber = i + 1;
        setUploadStatus(`Processing batch ${batchNumber}/${chunks.length}...`);

        await Promise.all(chunk.files.map(async (file, idx) => {
          const imageMeta = chunk.imagesMeta[idx];
          
          try {
            console.log(`[Batch ${batchNumber}] Compressing ${file.name}...`);
            
            // Fast Compression
            const compressed = await imageCompression(file, {
              maxWidthOrHeight: 1200, 
              useWebWorker: true,
              fileType: "image/jpeg",
              initialQuality: 0.8,
            });

            const formData = new FormData();
            formData.append("file", compressed);
            formData.append("section", section);

            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.error || "Upload failed");
            }

            console.log(`[Batch ${batchNumber}] Uploaded ${file.name}.`);
            
            // Update status to success
            setImages(prev => prev.map(img => 
              img.localId === imageMeta.localId ? { ...img, status: "success" } : img
            ));
            
          } catch (err: any) {
            console.error(`Failed to upload ${file.name}:`, err);
            setErrorDetails(`Error uploading ${file.name}: ${err.message || "Unknown error"}`);
            errorCount++;
            
            // Update status to error
            setImages(prev => prev.map(img => 
              img.localId === imageMeta.localId ? { ...img, status: "error" } : img
            ));
          } finally {
            completedCount++;
          }
        }));
        
        setUploadStatus(`Uploaded ${completedCount}/${totalFiles} images...`);
      }

      if (errorCount > 0) {
        alert(`${errorCount} images failed to upload. Check the red error box.`);
      } else {
        setTimeout(() => {
           fetchImages(); // Refresh from server
        }, 2000);
      }

      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (err: any) {
      console.error("Batch upload critical error:", err);
      setErrorDetails(`Critical Error: ${err.message || "Unknown error occurred"}`);
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

      {errorDetails && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Upload Failed! </strong>
          <span className="block sm:inline">{errorDetails}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Target Section</label>
          <select
            className="w-full border p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            {SECTIONS.map(s => (
               <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
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
              multiple 
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
            key={img.id ?? img.localId ?? i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group aspect-square overflow-hidden rounded-lg shadow-md bg-gray-100"
          >
            <img
              src={img.url}
              alt={img.section || "Gallery image"}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${img.status === "uploading" ? "opacity-50 grayscale" : ""}`}
              loading="lazy"
            />
            
            {/* Overlay for uploading/error/success */}
            {img.status === "uploading" && (
               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
               </div>
            )}

            {img.status === "error" && (
               <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-50">
                 <span className="text-white font-bold text-xl">!</span>
               </div>
            )}

             {img.status === "success" && (
               <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-40">
                 <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
               </div>
            )}
            
            {/* Delete Button */}
            {img.status !== "uploading" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(img.id);
                }}
                disabled={deletingId === img.id}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 disabled:opacity-50 z-10 shadow-sm"
                title="Delete Image"
              >
                 {deletingId === img.id ? (
                   <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                 ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                   </svg>
                 )}
              </button>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
               {img.section || "uploaded"}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
