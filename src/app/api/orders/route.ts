import { NextRequest, NextResponse } from "next/server";
import { addOrder, getOrders } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(getOrders());
}

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
    const total = productPrice * qty;

    const order = addOrder({
      productId: String(productId),
      productName: String(productName),
      price: productPrice,
      quantity: qty,
      total,
      customerName: String(customerName).trim(),
      phone: String(phone).trim(),
      address: String(address).trim(),
      city: String(city).trim(),
      pincode: String(pincode).trim(),
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
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