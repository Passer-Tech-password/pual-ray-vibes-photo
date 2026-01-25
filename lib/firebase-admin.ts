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
    console.warn("⚠️ FIREBASE_PRIVATE_KEY is missing. Firebase Admin not initialized.");
    // Return null to allow build to proceed (imports won't fail), 
    // but runtime usage will fail if keys are still missing.
    return null;
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

export const adminAuth = adminApp ? getAuth(adminApp) : {} as ReturnType<typeof getAuth>;
export const adminDB = adminApp ? getFirestore(adminApp) : {} as ReturnType<typeof getFirestore>;
export const adminStorage = adminApp ? getStorage(adminApp).bucket() : {} as ReturnType<typeof getStorage>['bucket'] extends (...args: any) => infer R ? R : never;
