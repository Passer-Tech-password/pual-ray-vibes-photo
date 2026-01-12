import admin from "./firebaseAdmin";

export async function verifyFirebaseToken(token: string) {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false };
  }
}
