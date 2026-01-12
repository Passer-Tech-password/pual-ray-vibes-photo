// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlxeJ2sIvVki8yFLO23-UPnUL2tiVqVew",
  authDomain: "pee-photo-portfolio.firebaseapp.com",
  projectId: "pee-photo-portfolio",
  storageBucket: "pee-photo-portfolio.firebasestorage.appspot.com",
  messagingSenderId: "613936497366",
  appId: "1:613936497366:web:a984f0cb09f392797fbf77",
  measurementId: "G-GBVQYXGDBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;