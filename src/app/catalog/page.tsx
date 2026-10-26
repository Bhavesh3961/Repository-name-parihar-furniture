import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "Furniture Catalog · Parihar Furniture & Interior Pune",
  description:
    "Explore our complete range of solid Burma teak sofas, 6-seater dining sets, German hydraulic storage beds, sliding wardrobes, and study desks handcrafted in Vishrantwadi, Pune.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
