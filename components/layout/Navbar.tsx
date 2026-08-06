"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, Menu, X, BookOpen } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export function Navbar() {
  const items = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const router = useRouter();

  // Avoid hydration mismatch: cart count is read from localStorage on the
  // client, so it isn't known during server rendering.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const count = hydrated ? items.reduce((a, i) => a + i.quantity, 0) : 0;

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = () => {
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(query)}&category=All&sort=featured`);
  };

  return (
    <nav className="bg-card/80 border-border sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="from-accent to-accent-deep text-accent-foreground flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br shadow-md transition-shadow group-hover:shadow-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-serif text-ink text-xl font-bold tracking-tight">
              BookHaven
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="text-muted-foreground hover:text-ink hover:bg-muted rounded-lg px-4 py-2 text-sm font-medium transition-all"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-muted-foreground hover:text-ink hover:bg-muted rounded-lg px-4 py-2 text-sm font-medium transition-all"
            >
              Shop
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-muted-foreground hover:text-ink hover:bg-muted rounded-lg p-2 transition-all"
              aria-label="Search"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleCart}
              className="text-muted-foreground hover:text-ink hover:bg-muted relative rounded-lg p-2 transition-all"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="bg-accent text-accent-foreground animate-fade-in absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-ink hover:bg-muted rounded-lg p-2 transition-all md:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-border bg-card/60 animate-fade-in border-t backdrop-blur-sm">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Search by title, author, or ISBN..."
                className="border-border focus:border-ink w-full rounded-lg border-2 py-2.5 pr-24 pl-10 text-sm transition-all focus:outline-none"
              />
              <button
                onClick={submitSearch}
                className="bg-ink text-ink-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded-md px-3 py-1.5 text-xs font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="border-border bg-card animate-fade-in border-t md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-ink hover:bg-muted block rounded-lg px-4 py-2 text-sm font-medium transition-all"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-ink hover:bg-muted block rounded-lg px-4 py-2 text-sm font-medium transition-all"
            >
              Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
