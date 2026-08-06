"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Book } from "@/lib/books.types";
import { useCartStore } from "@/lib/cart-store";
import { ShopButton } from "@/components/ui/ShopButton";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function BookPurchaseControls({ book }: { book: Book }) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <QuantityStepper quantity={quantity} onChange={setQuantity} />
      <ShopButton
        size="lg"
        disabled={!book.inStock}
        onClick={() => addItem(book, quantity)}
      >
        <ShoppingCart className="h-5 w-5" />
        Add to cart
      </ShopButton>
    </div>
  );
}
