import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const getFirebaseAdminApp = () => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  
  if (!privateKey) {
    // In build phase or if env vars are missing, return null or throw a clearer error
    // Returning a dummy app or skipping initialization might be safer for build time
    // providing we don't actually use it during build.
    console.warn("⚠️ FIREBASE_PRIVATE_KEY is missing. Firebase Admin not initialized.");
    
    // Check if we are in a build environment where we can skip this?
    // For now, let's try to throw a clearer error to stop the build if it's critical,
    // or return a mocked object if we want to bypass build.
    // However, since we need to export adminAuth, we can't return null easily without breaking exports.
    // Let's throw a descriptive error.
    throw new Error("FIREBASE_PRIVATE_KEY is missing or invalid in .env.local");
  }

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
    storageBucket: "pual-ray-vibes.firebasestorage.app",
  });
};

const adminApp = getFirebaseAdminApp();

export const adminAuth = getAuth(adminApp);
export const adminDB = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp).bucket();
