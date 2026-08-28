import { cert, getApps, initializeApp, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAppCheck } from "firebase-admin/app-check";

let adminApp: App;

function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    throw new Error("Firebase Admin environment variables are missing.");
  }

  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
  return adminApp;
}

export function adminAuth() {
  return getAuth(getAdminApp());
}
export function db() {
  return getFirestore(getAdminApp());
}
export function bucket() {
  return getStorage(getAdminApp()).bucket();
}
export function appCheckAdmin() {
  return getAppCheck(getAdminApp());
}
