"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  cookies().set({
    name: "firebase-token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return { success: true };
}
