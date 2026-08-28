import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      productId,
      productName,
      price,
      quantity,
      customerName,
      phone,
      address,
      city,
      pincode,
    } = body;

    // Basic validation
    if (
      !productId ||
      !productName ||
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const qty = Number(quantity) || 1;
    const productPrice = Number(price) || 0;

    if (qty < 1 || qty > 20) {
      return NextResponse.json(
        { error: "Quantity must be between 1 and 20." },
        { status: 400 }
      );
    }

    const total = productPrice * qty;

    const ref = await db().collection("orders").add({
      productId,
      productName,
      price: productPrice,
      quantity: qty,
      total,

      customerName: String(customerName).trim(),
      phone: String(phone).trim(),
      address: String(address).trim(),
      city: String(city).trim(),
      pincode: String(pincode).trim(),

      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        orderId: ref.id,
        total,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ORDER_ERROR:", error);

    return NextResponse.json(
      { error: "Unable to place order. Please try again." },
      { status: 500 }
    );
  }
}