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

const mockAuth = {
  verifyIdToken: async () => { throw new Error("Firebase Admin not initialized (Auth)"); },
  getUser: async () => { throw new Error("Firebase Admin not initialized (Auth)"); },
} as unknown as ReturnType<typeof getAuth>;

const mockFirestore = {
  collection: () => ({ 
    doc: () => ({ 
      get: async () => { throw new Error("Firebase Admin not initialized (Firestore)"); },
      set: async () => { throw new Error("Firebase Admin not initialized (Firestore)"); },
      update: async () => { throw new Error("Firebase Admin not initialized (Firestore)"); }
    })
  }),
} as unknown as ReturnType<typeof getFirestore>;

const mockStorageBucket = {
  getFiles: async () => { throw new Error("Firebase Admin not initialized (Storage)"); },
  file: () => ({
    save: async () => { throw new Error("Firebase Admin not initialized (Storage)"); },
    getSignedUrl: async () => { throw new Error("Firebase Admin not initialized (Storage)"); },
    delete: async () => { throw new Error("Firebase Admin not initialized (Storage)"); },
  }),
} as unknown as ReturnType<typeof getStorage>['bucket'] extends (...args: any) => infer R ? R : never;

export const adminAuth = adminApp ? getAuth(adminApp) : mockAuth;
export const adminDB = adminApp ? getFirestore(adminApp) : mockFirestore;
const storageService = adminApp ? getStorage(adminApp) : null;
export const adminStorage = storageService ? storageService.bucket() : mockStorageBucket;
export const adminStorageService = storageService;
