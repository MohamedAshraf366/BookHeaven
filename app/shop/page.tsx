import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop All Books — BookHaven",
  description:
    "Filter and sort the full BookHaven catalog by category, price and rating to find your next read.",
  openGraph: {
    title: "Shop All Books — BookHaven",
    description: "Filter and sort the full BookHaven catalog to find your next read.",
  },
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopPageClient />
    </Suspense>
  );
}
