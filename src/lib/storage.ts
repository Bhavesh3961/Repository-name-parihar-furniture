import crypto from "node:crypto";
import { bucket } from "./firebase-admin";

export async function saveImage(buffer: Buffer, mimeType: string, folder = "products") {
  const ext = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
  const filePath = `${folder}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const file = bucket().file(filePath);
  await file.save(buffer, {
    metadata: {
      contentType: mimeType,
      cacheControl: "public,max-age=31536000,immutable",
      metadata: { firebaseStorageDownloadTokens: crypto.randomUUID() }
    },
    resumable: false,
    validation: "md5"
  });
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 365
  });
  return { path: filePath, url };
}
