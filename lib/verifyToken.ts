import { adminAuth } from "@/lib/firebase-admin";

export async function verifyFirebaseToken(token: string) {
  return await adminAuth.verifyIdToken(token);
}
