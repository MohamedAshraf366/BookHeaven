import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { books, getBestsellers } from "@/lib/books";
import { BookGrid } from "@/components/book/BookGrid";
import { CATEGORIES } from "@/lib/books.types";
import { shopButtonClasses } from "@/lib/shop-button-styles";

export const metadata: Metadata = {
  title: "BookHaven — Curated Books for Curious Minds",
  description:
    "Shop handpicked fiction, non-fiction, sci-fi, mystery and tech titles. Free shipping on every order.",
  openGraph: {
    title: "BookHaven — Curated Books for Curious Minds",
    description: "Shop handpicked fiction, non-fiction, sci-fi, mystery and tech titles at BookHaven.",
  },
};

const perks = [
  { icon: Truck, title: "Free Shipping", text: "On every order, no minimum" },
  { icon: ShieldCheck, title: "Secure Checkout", text: "Your data stays private" },
  { icon: BookOpen, title: "Curated Catalog", text: "Handpicked by readers" },
];

export default function HomePage() {
  const bestsellers = getBestsellers(8);
  const categories = CATEGORIES.filter((c) => c !== "All");

  return (
    <div>
      <section className="from-parchment via-background to-background bg-linear-to-b">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div className="animate-slide-up">
            <span className="bg-accent/15 text-accent-deep inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              New arrivals every week
            </span>
            <h1 className="font-serif text-ink mt-5 text-4xl leading-tight font-extrabold md:text-6xl">
              Find your next
              <span className="text-accent-deep"> favorite book</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-lg text-lg leading-relaxed">
              A carefully curated shelf of {books.length} titles across fiction,
              science, mystery and technology — chosen by people who actually read
              them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop?q=&category=All&sort=featured"
                className={shopButtonClasses("primary", "lg")}
              >
                Browse the shop
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop?q=&category=All&sort=rating"
                className={shopButtonClasses("outline", "lg")}
              >
                Top rated
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {bestsellers.slice(0, 6).map((book, i) => (
              <Link
                key={book.id}
                href={`/shop/${book.id}`}
                className="bg-muted animate-slide-up relative aspect-2/3 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <Image
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  fill
                  sizes="(min-width: 1024px) 16vw, 30vw"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-y">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-4">
              <div className="bg-accent/15 text-accent-deep flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
                <perk.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-ink font-serif font-bold">{perk.title}</h3>
                <p className="text-muted-foreground text-sm">{perk.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-ink text-2xl font-bold md:text-3xl">
          Browse by category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/shop?q=&category=${encodeURIComponent(category)}&sort=featured`}
              className="border-border bg-card hover:border-accent hover:text-accent-deep rounded-xl border p-4 text-center text-sm font-semibold transition-all hover:-translate-y-1 hover:shadow-md"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-parchment/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-ink text-2xl font-bold md:text-3xl">
                Bestsellers
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                What everyone is reading right now
              </p>
            </div>
            <Link
              href="/shop?q=&category=All&sort=featured"
              className="text-accent-deep hidden items-center gap-1 text-sm font-semibold hover:underline md:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <BookGrid books={bestsellers} />
        </div>
      </section>
    </div>
  );
}
