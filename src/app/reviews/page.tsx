import type { Metadata } from "next";
import { ReviewsClient } from "./reviews-client";

export const metadata: Metadata = {
  title: "Verified Client Reviews · Parihar Furniture & Interior Pune",
  description:
    "Read genuine Google verified reviews from homeowners in Pune who commissioned bespoke solid Burma teak sofas, dining sets, hydraulic beds, and sacred Devghar sanctuaries from Parihar Furniture.",
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
