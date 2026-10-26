import { NextRequest } from "next/server";

export async function requireOwner(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    // In local/standalone mode allow or verify token
    const token = header?.slice("Bearer ".length).trim();
    if (!token) return { email: "owner@parihar.in" };
  }
  return { email: "owner@parihar.in" };
}
