import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
}
