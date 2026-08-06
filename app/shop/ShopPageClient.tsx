"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { useState } from "react";
import { books, sortBooks } from "@/lib/books";
import { CATEGORIES, type ViewMode } from "@/lib/books.types";
import { BookGrid } from "@/components/book/BookGrid";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export function ShopPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "All";
  const sort = searchParams.get("sort") ?? "featured";

  const [view, setView] = useState<ViewMode>("grid");

  const query = q.trim().toLowerCase();
  let results = books.filter((book) => {
    const matchesCategory = category === "All" || book.category === category;
    const matchesQuery =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.includes(query) ||
      book.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });
  results = sortBooks(results, sort);

  const update = (patch: Partial<{ q: string; category: string; sort: string }>) => {
    const params = new URLSearchParams({ q, category, sort, ...patch });
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-serif text-ink text-3xl font-extrabold md:text-4xl">
          Shop all books
        </h1>
        <p className="text-muted-foreground mt-2">
          {results.length} {results.length === 1 ? "title" : "titles"} available
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-4">
        <div className="relative max-w-xl">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          <input
            type="text"
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search by title, author, ISBN or tag..."
            aria-label="Search books"
            className="border-border focus:border-accent bg-card w-full rounded-lg border-2 py-2.5 pr-10 pl-10 text-sm transition-colors focus:outline-none"
          />
          {q && (
            <button
              onClick={() => update({ q: "" })}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-ink absolute top-1/2 right-3 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => update({ category: cat })}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                  category === cat
                    ? "bg-ink text-ink-foreground border-ink"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent-deep",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value })}
              aria-label="Sort books"
              className="border-border bg-card rounded-lg border px-3 py-2 text-sm font-medium focus:outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="border-border flex overflow-hidden rounded-lg border">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={cn(
                  "p-2 transition-colors",
                  view === "grid"
                    ? "bg-ink text-ink-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={cn(
                  "p-2 transition-colors",
                  view === "list"
                    ? "bg-ink text-ink-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted",
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookGrid books={results} view={view} />
    </div>
  );
}
