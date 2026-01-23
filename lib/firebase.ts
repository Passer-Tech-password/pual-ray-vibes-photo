// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBioyhFbBPz55ph9J-9lZep3d70lYD4Ua4",
  authDomain: "pual-ray-vibes.firebaseapp.com",
  projectId: "pual-ray-vibes",
  storageBucket: "pual-ray-vibes.firebasestorage.app",
  messagingSenderId: "997795880185",
  appId: "1:997795880185:web:1701c981bb068111891628",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;
