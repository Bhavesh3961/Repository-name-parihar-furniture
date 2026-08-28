import { initializeAppCheck, ReCaptchaEnterpriseProvider, getToken } from "firebase/app-check";
import { firebaseApp } from "./firebase-client";

let instance: ReturnType<typeof initializeAppCheck> | null = null;

export function appCheck() {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY) return null;
  if (!instance) {
    instance = initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaEnterpriseProvider(process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY),
      isTokenAutoRefreshEnabled: true
    });
  }
  return instance;
}

export async function appCheckToken() {
  const current = appCheck();
  if (!current) return null;
  const token = await getToken(current, false);
  return token.token;
}
