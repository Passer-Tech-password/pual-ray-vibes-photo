import { adminAuth } from "@/lib/firebaseAdmin";

export async function verifyFirebaseToken(token: string) {
  return await adminAuth.verifyIdToken(token);
}
