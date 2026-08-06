"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ShopButton } from "@/components/ui/ShopButton";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  if (!isOpen) return null;

  const totalItems = items.reduce((a, i) => a + i.quantity, 0);
  const totalPrice = items.reduce((a, i) => a + i.book.price * i.quantity, 0);

  return (
    <>
      <div
        className="animate-fade-in fixed inset-0 z-99 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      <div className="bg-card animate-slide-in-right fixed top-0 right-0 z-100 flex h-full w-full max-w-md flex-col shadow-2xl">
        <div className="border-border flex items-center justify-between border-b p-6">
          <h2 className="font-serif text-ink text-xl font-bold">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="hover:bg-muted rounded-lg p-2 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="text-muted mb-4 h-16 w-16" />
              <h3 className="text-ink mb-1 font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Looks like you haven&apos;t added any books yet.
              </p>
              <ShopButton variant="outline" onClick={closeCart}>
                Keep browsing
              </ShopButton>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.book.id}
                className="border-border/60 hover:border-border flex gap-4 rounded-xl border p-3 transition-colors"
              >
                <Link
                  href={`/shop/${item.book.id}`}
                  onClick={closeCart}
                  className="bg-muted relative h-28 w-20 shrink-0 overflow-hidden rounded-lg"
                >
                  <Image
                    src={item.book.cover}
                    alt={`Cover of ${item.book.title}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link href={`/shop/${item.book.id}`} onClick={closeCart}>
                    <h4 className="text-ink hover:text-accent line-clamp-1 text-sm font-semibold transition-colors">
                      {item.book.title}
                    </h4>
                  </Link>
                  <p className="text-muted-foreground mb-2 text-xs">{item.book.author}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <QuantityStepper
                      quantity={item.quantity}
                      onChange={(qty) => updateQuantity(item.book.id, qty)}
                    />
                    <div className="text-right">
                      <p className="text-ink text-sm font-bold">
                        {formatPrice(item.book.price * item.quantity)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatPrice(item.book.price)} each
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.book.id)}
                  className="text-muted-foreground hover:text-destructive self-start rounded p-1.5 transition-colors"
                  aria-label={`Remove ${item.book.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-border space-y-4 border-t p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-border flex justify-between border-t pt-2 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <ShopButton
              className="w-full"
              size="lg"
              onClick={() => toast.success("Checkout is coming soon!")}
            >
              Checkout
              <ArrowRight className="h-4 w-4" />
            </ShopButton>
            <button
              onClick={clearCart}
              className="text-muted-foreground hover:text-destructive w-full text-center text-sm transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
