import { NextResponse } from "next/server";
import { getReviews } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(getReviews());
}
