"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { auth } from "@/firebase";

export async function loginAction(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCredential.user.getIdToken();

    // ✅ FIX: await cookies()
    const cookieStore = await cookies();

    cookieStore.set({
      name: "firebase-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
