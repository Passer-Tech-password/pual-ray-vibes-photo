"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AdminClient from "./ui/AdminClient";

export default function AdminPage() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("Not logged in");
        return;
      }

      // 🔐 STEP 5 STARTS HERE
      const token = await user.getIdToken();

      const res = await fetch("/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Not authorized");
        return;
      }

      console.log("Admin verified");
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminClient/>
  );
}





