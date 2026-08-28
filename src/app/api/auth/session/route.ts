import { NextRequest, NextResponse } from "next/server";
import { requireOwner } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await requireOwner(request);
    return NextResponse.json({ ok: true, email: user.email });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNAUTHORIZED";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" || message === "APP_CHECK_REQUIRED" ? 403 : 401 });
  }
}
