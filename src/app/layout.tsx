import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parihar Furniture & Interior | Pune",
  description: "Solid wood furniture, custom sofas, Devghar and complete 1BHK, 2BHK and 3BHK interiors in Pune.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
