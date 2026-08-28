import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase-admin";
import { requireOwner } from "@/lib/auth";
import { productInputSchema } from "@/lib/validation";
import { seedProducts } from "@/data/seed";

export const runtime = "nodejs";

export async function GET() {
  try {
    const snap = await db()
      .collection("products")
      .where("published", "==", true)
      .get();

    const products = snap.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a: any, b: any) => {
        const aTime = a.createdAt?.toMillis?.() ?? 0;
        const bTime = b.createdAt?.toMillis?.() ?? 0;
        return bTime - aTime;
      });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to load Firestore products:", error);
    return NextResponse.json(seedProducts);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireOwner(request);

    const body = productInputSchema.parse(await request.json());

    const ref = await db().collection("products").add({
      ...body,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "BAD_REQUEST";

    const status =
      message === "UNAUTHORIZED"
        ? 401
        : message === "FORBIDDEN" || message === "APP_CHECK_REQUIRED"
          ? 403
          : 400;

    return NextResponse.json({ error: message }, { status });
  }
}