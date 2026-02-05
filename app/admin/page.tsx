"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AdminClient from "./ui/AdminClient";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("Not logged in");
        window.location.href = "/login";
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
        window.location.href = "/login";
        return;
      }

      console.log("Admin verified");
      setAuthorized(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authorized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AdminClient/>
  );
}





