import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { seedReviews } from "@/data/seed";

export const runtime = "nodejs";

export async function GET() {
  try {
    const snap = await db().collection("reviews").orderBy("createdAt", "desc").limit(12).get();
    return NextResponse.json(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch {
    return NextResponse.json(seedReviews);
  }
}
