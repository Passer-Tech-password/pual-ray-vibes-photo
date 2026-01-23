import { adminAuth } from "@/lib/firebaseAdmin";

export async function verifyFirebaseToken(token: string) {
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false };
  }
}
