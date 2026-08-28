import { NextRequest, NextResponse } from "next/server";
import { requireOwner } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(request: NextRequest) {
  try {
    await requireOwner(request);

    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image must be 8MB or smaller" },
        { status: 413 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG and WebP are allowed" },
        { status: 415 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }

    const cloudinaryForm = new FormData();

    cloudinaryForm.append("file", file);
    cloudinaryForm.append(
      "upload_preset",
      uploadPreset
    );
    cloudinaryForm.append(
      "folder",
      "parihar/products"
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary upload error:", data);

      return NextResponse.json(
        {
          error:
            data.error?.message ||
            "Cloudinary upload failed",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      imageUrl: data.secure_url,
      publicId: data.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "UPLOAD_FAILED";

    const status =
      message === "UNAUTHORIZED"
        ? 401
        : message === "FORBIDDEN" ||
          message === "APP_CHECK_REQUIRED"
        ? 403
        : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}