# BookHaven — Next.js Edition

A rebuild of the original BookHaven storefront on **Next.js 15 (App Router)**,
**React 19**, and **Tailwind CSS v4**. All Lovable-specific tooling (error
reporting, dev-preview scripts, TanStack Start server files) has been removed.

## What changed from the original

- **Routing**: TanStack Router (`src/routes/*`) → Next.js App Router (`app/*`).
  - `/` → `app/page.tsx`
  - `/shop` (search/filter/sort via query params) → `app/shop/page.tsx` +
    `app/shop/ShopPageClient.tsx`
  - `/shop/:id` → `app/shop/[id]/page.tsx` (statically generated per book via
    `generateStaticParams`, with `generateMetadata` for per-book SEO/OG tags)
  - 404 / error boundary → `app/not-found.tsx` / `app/error.tsx`
- **Removed**: `@lovable.dev/vite-tanstack-config`, `lovable-error-reporting.ts`,
  `error-capture.ts`, `error-page.ts`, TanStack Start's `server.ts`/`start.ts`,
  and ~30 unused shadcn/ui primitives that were never imported anywhere in the
  original app.
- **Kept as-is**: the book catalog data, `zustand` cart store (persisted to
  `localStorage`), `sonner` toasts, Tailwind design tokens/theme, and every
  custom component (`BookCard`, `ShopButton`, `StarRating`, `CategoryBadge`,
  `QuantityStepper`, `Navbar`, `Footer`, `CartDrawer`).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying to Vercel

This is a stock Next.js App Router project with no custom server, so it
deploys to Vercel with zero configuration:

```bash
npx vercel
```

or connect the repo in the Vercel dashboard and it will auto-detect the
Next.js framework preset (`npm run build`, output `.next`). No environment
variables are required — the book catalog is static data in `lib/books.ts`.

## Project structure

```
app/
  layout.tsx          Root layout (Navbar, Footer, CartDrawer, Toaster)
  page.tsx             Home page
  not-found.tsx / error.tsx
  shop/
    page.tsx           Server wrapper (metadata + Suspense)
    ShopPageClient.tsx Client component: search/filter/sort via URL params
    [id]/page.tsx       Book detail page (static params + metadata)
components/
  book/                BookCard, BookGrid, BookPurchaseControls
  layout/              Navbar, Footer, CartDrawer
  ui/                  ShopButton, StarRating, CategoryBadge, QuantityStepper, sonner
lib/
  books.ts / books.types.ts   Catalog data + helpers
  cart-store.ts                Zustand cart store
  format.ts / utils.ts         Formatting + class-name helpers
  shop-button-styles.ts        Shared button classes (server-safe)
```

## Notes

- Book cover images are loaded from `images.unsplash.com`; this domain is
  allow-listed in `next.config.ts` if you switch the `<img>` tags to
  `next/image` later.
- I was unable to run `npm install`/`npm run build` in this sandbox (no
  network access), so please run a local build before deploying to catch
  anything my static checks might have missed.
