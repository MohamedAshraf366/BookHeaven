import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getBookById, books } from "@/lib/books";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { StarRating } from "@/components/ui/StarRating";
import { BookCard } from "@/components/book/BookCard";
import { BookPurchaseControls } from "@/components/book/BookPurchaseControls";
import { formatPrice, calculateDiscount } from "@/lib/format";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return books.map((book) => ({ id: book.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    return {
      title: "Book not found — BookHaven",
      robots: { index: false },
    };
  }

  const title = `${book.title} by ${book.author} — BookHaven`;
  const description = book.description.slice(0, 155);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [book.cover],
    },
    twitter: {
      images: [book.cover],
    },
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) notFound();

  const discount = calculateDiscount(book.price, book.originalPrice);
  const related = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/shop?q=&category=All&sort=featured"
        className="text-muted-foreground hover:text-ink mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="bg-muted relative mx-auto aspect-2/3 w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={book.cover}
            alt={`Cover of ${book.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 448px, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <CategoryBadge category={book.category} />
          <h1 className="font-serif text-ink mt-3 text-3xl font-extrabold md:text-4xl">
            {book.title}
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">by {book.author}</p>

          <div className="mt-4">
            <StarRating rating={book.rating} reviewCount={book.reviewCount} size="md" showCount />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-ink text-3xl font-bold">{formatPrice(book.price)}</span>
            {book.originalPrice && (
              <>
                <span className="text-muted-foreground text-lg line-through">
                  {formatPrice(book.originalPrice)}
                </span>
                <span className="bg-destructive text-destructive-foreground rounded px-2 py-0.5 text-xs font-bold">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mt-6 leading-relaxed">{book.description}</p>

          <div className="border-border mt-6 grid grid-cols-2 gap-4 rounded-xl border p-4 text-sm">
            <div>
              <dt className="text-muted-foreground">ISBN</dt>
              <dd className="text-ink font-medium">{book.isbn}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Pages</dt>
              <dd className="text-ink font-medium">{book.pages}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Published</dt>
              <dd className="text-ink font-medium">{book.publishedDate}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Availability</dt>
              <dd
                className={
                  book.inStock ? "font-medium text-green-600" : "text-destructive font-medium"
                }
              >
                {book.inStock ? "In stock" : "Out of stock"}
              </dd>
            </div>
          </div>

          <BookPurchaseControls book={book} />

          <div className="text-muted-foreground mt-6 flex flex-wrap gap-6 text-sm">
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4" /> Free shipping
            </span>
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> 30-day returns
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Secure payment
            </span>
          </div>

          {book.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {book.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-ink mb-6 text-2xl font-bold">
            More in {book.category}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
