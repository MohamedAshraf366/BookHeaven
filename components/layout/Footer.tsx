"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="from-accent to-accent-deep text-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-serif text-ink-foreground text-lg font-bold">
                BookHaven
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your curated destination for discovering great books, from timeless
              classics to cutting-edge tech.
            </p>
          </div>
          <div>
            <h4 className="text-ink-foreground mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?q=&category=All&sort=featured" className="hover:text-accent transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/shop?q=&category=All&sort=rating" className="hover:text-accent transition-colors">
                  Highest Rated
                </Link>
              </li>
              <li>
                <Link href="/shop?q=&category=All&sort=newest" className="hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-ink-foreground mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Shipping Info</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="text-ink-foreground mb-4 font-semibold">Stay Updated</h4>
            <p className="mb-3 text-sm">
              Get notified about new releases and exclusive offers.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="bg-ink-elevated border-ink-border text-ink-foreground placeholder:text-ink-muted focus:border-accent flex-1 rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-ink-border flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm md:flex-row">
          <p>© 2026 BookHaven. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
