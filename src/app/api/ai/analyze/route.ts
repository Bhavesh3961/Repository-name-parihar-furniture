import { NextRequest, NextResponse } from "next/server";
import { requireOwner } from "@/lib/auth";
import { analyzeProductImage } from "@/lib/ai";
import { saveImage } from "@/lib/storage";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_BYTES = 8 * 1024 * 1024;

const allowed = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isRealImage(buffer: Buffer, mime: string) {
  if (mime === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8;
  }

  if (mime === "image/png") {
    return buffer
      .subarray(0, 8)
      .equals(
        Buffer.from([
          137,
          80,
          78,
          71,
          13,
          10,
          26,
          10,
        ])
      );
  }

  if (mime === "image/webp") {
    return (
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Check Firebase owner authentication
    const user = await requireOwner(request);

    // Limit AI requests from one owner
    const rl = rateLimit(
      `ai:${user.uid}`,
      10,
      60 * 60 * 1000
    );

    if (!rl.ok) {
      return NextResponse.json(
        {
          error:
            "AI limit reached. Try again later.",
        },
        { status: 429 }
      );
    }

    // Read uploaded form
    const form = await request.formData();
    const file = form.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        {
          error:
            "Image must be 8MB or smaller",
        },
        { status: 413 }
      );
    }

    // Check file type
    if (!allowed.has(file.type)) {
      return NextResponse.json(
        {
          error:
            "Only JPG, PNG and WebP are allowed",
        },
        { status: 415 }
      );
    }

    // Convert uploaded file into Buffer
    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    // Verify that the file really is an image
    if (!isRealImage(buffer, file.type)) {
      return NextResponse.json(
        {
          error:
            "File content does not match its image type",
        },
        { status: 415 }
      );
    }

    // Convert image to Base64 for Gemini
    const base64 = buffer.toString("base64");

    // Ask Gemini to understand the furniture
    const metadata = await analyzeProductImage(
      base64,
      file.type
    );

    // Save the ORIGINAL photo.
    // We are no longer generating a second AI image.
    const original = await saveImage(
      buffer,
      file.type,
      "products/original"
    );

    return NextResponse.json({
      metadata,

      // The original image is now the product image.
      imageUrl: original.url,

      originalImageUrl: original.url,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "AI_PROCESSING_FAILED";

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