import { NextRequest } from "next/server";
import { adminAuth, appCheckAdmin } from "./firebase-admin";

function ownerEmails() {
  return (process.env.OWNER_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireOwner(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) throw new Error("UNAUTHORIZED");

  const token = header.slice("Bearer ".length).trim();
  if (process.env.FIREBASE_APPCHECK_REQUIRED === "true") {
    const appCheckToken = request.headers.get("X-Firebase-AppCheck");
    if (!appCheckToken) throw new Error("APP_CHECK_REQUIRED");
    await appCheckAdmin().verifyToken(appCheckToken);
  }

  const decoded = await adminAuth().verifyIdToken(token, true);
  const email = decoded.email?.toLowerCase();
  if (!email || !decoded.email_verified || !ownerEmails().includes(email)) {
    throw new Error("FORBIDDEN");
  }
  return decoded;
}
