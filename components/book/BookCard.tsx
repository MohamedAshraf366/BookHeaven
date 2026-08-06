"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import type { Book } from "@/lib/books.types";
import { useCartStore } from "@/lib/cart-store";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { StarRating } from "@/components/ui/StarRating";
import { ShopButton } from "@/components/ui/ShopButton";
import { formatPrice, calculateDiscount } from "@/lib/format";

interface BookCardProps {
  book: Book;
  view?: "grid" | "list";
}

export function BookCard({ book, view = "grid" }: BookCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = calculateDiscount(book.price, book.originalPrice);

  if (view === "list") {
    return (
      <div className="group border-border bg-card flex gap-6 rounded-xl border p-4 transition-all duration-300 hover:shadow-lg">
        <Link
          href={`/shop/${book.id}`}
          className="bg-muted relative h-48 w-32 shrink-0 overflow-hidden rounded-lg"
        >
          <Image
            src={book.cover}
            alt={`Cover of ${book.title}`}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discount && (
            <span className="bg-destructive text-destructive-foreground absolute top-2 left-2 rounded px-2 py-0.5 text-xs font-bold">
              -{discount}%
            </span>
          )}
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <CategoryBadge category={book.category} className="mb-2 self-start" />
          <Link href={`/shop/${book.id}`}>
            <h3 className="font-serif text-ink group-hover:text-accent line-clamp-1 text-lg font-bold transition-colors">
              {book.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mb-2 text-sm">{book.author}</p>
          <StarRating rating={book.rating} reviewCount={book.reviewCount} showCount />
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
            {book.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-ink text-xl font-bold">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <span className="text-muted-foreground text-sm line-through">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>
            <ShopButton onClick={() => addItem(book)} size="sm">
              <ShoppingCart className="h-4 w-4" />
              Add
            </ShopButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group border-border bg-card overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link
        href={`/shop/${book.id}`}
        className="bg-muted relative block aspect-2/3 overflow-hidden"
      >
        <Image
          src={book.cover}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount && (
          <span className="bg-destructive text-destructive-foreground absolute top-3 left-3 rounded px-2 py-1 text-xs font-bold">
            -{discount}%
          </span>
        )}
        {book.bestseller && (
          <span className="bg-accent text-accent-foreground absolute top-3 right-3 rounded px-2 py-1 text-xs font-bold">
            Bestseller
          </span>
        )}
      </Link>
      <div className="p-4">
        <CategoryBadge category={book.category} />
        <Link href={`/shop/${book.id}`}>
          <h3 className="font-serif text-ink group-hover:text-accent mt-2 line-clamp-1 font-bold transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm">{book.author}</p>
        <div className="mt-2">
          <StarRating rating={book.rating} reviewCount={book.reviewCount} showCount />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-ink text-lg font-bold">{formatPrice(book.price)}</span>
            {book.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          <ShopButton
            onClick={() => addItem(book)}
            size="sm"
            className="p-2"
            aria-label={`Add ${book.title} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </ShopButton>
        </div>
      </div>
    </div>
  );
}
