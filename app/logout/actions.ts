"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  cookies().set({
    name: "admin-token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return { success: true };
}
