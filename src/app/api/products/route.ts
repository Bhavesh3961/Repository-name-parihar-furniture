import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/store";
import { productInputSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to load products:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();
    const body = productInputSchema.parse(raw);
    const created = addProduct({
      ...body,
      price: body.price ?? 0,
      published: true,
    });
    return NextResponse.json({ id: created.id, product: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "BAD_REQUEST";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}