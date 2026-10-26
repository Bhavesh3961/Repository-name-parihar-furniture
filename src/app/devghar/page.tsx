import type { Metadata } from "next";
import { DevgharClient } from "./devghar-client";

export const metadata: Metadata = {
  title: "Sacred Wooden Devghar Mandir · Parihar Furniture Pune",
  description:
    "Handcrafted solid Burma teakwood Pooja Mandirs and Devghar sanctums with laser-cut Om jali, warm 2700K ambient LED halo, and diya oil-resistant finish in Vishrantwadi, Pune.",
};

export default function DevgharPage() {
  return <DevgharClient />;
}
