import { NextRequest, NextResponse } from "next/server";
import { estimateSchema } from "@/lib/validation";

const base = { "1 BHK Complete Package": 85000, "2 BHK Complete Package": 145000, "3 BHK Complete Package": 205000 };
const finish = { "Machine Melamine Gloss / Matte Polish": 1, "Solid Wood Natural Finish": 1.22, "Premium Velvet + Wood Mix": 1.14 };

export async function POST(request: NextRequest) {
  try {
    const input = estimateSchema.parse(await request.json());
    let low = base[input.packageType] * finish[input.finish];
    let high = low * 1.34;
    if (input.devghar) { low += 18000; high += 32000; }
    if (input.sectional) { low += 22000; high += 42000; }
    return NextResponse.json({ low: Math.round(low / 100) * 100, high: Math.round(high / 100) * 100 });
  } catch {
    return NextResponse.json({ error: "Invalid estimate input" }, { status: 400 });
  }
}
