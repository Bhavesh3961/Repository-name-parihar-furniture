import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireOwner } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(request);
    const { id } = await params;
    await db().collection("products").doc(id).update({ published: false, updatedAt: new Date() });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "BAD_REQUEST";
    const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" || message === "APP_CHECK_REQUIRED" ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
