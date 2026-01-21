"use client";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleLogin(formData: FormData) {
    const res = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.success) setError(data.message);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        action={handleLogin}
        className="bg-white p-8 shadow-md rounded-lg w-full max-w-sm"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
