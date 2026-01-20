"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  // Toaster component provides the UI for the toasts
  return <Toaster position="top-center" reverseOrder={false} />;
}
