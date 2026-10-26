import type { Metadata } from "next";
import { LocationClient } from "./location-client";

export const metadata: Metadata = {
  title: "Workshop Location & Atelier Visit · Parihar Furniture Pune",
  description:
    "Visit Parihar Furniture & Interior manufacturing workshop at Vishrantwadi, Pune. Inspect genuine Burma teak and Sheesham timber, touch machine-melamine finishes, and consult directly with master craftsmen. Open daily 8 AM – 10 PM.",
};

export default function LocationPage() {
  return <LocationClient />;
}
