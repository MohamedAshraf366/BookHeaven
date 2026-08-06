"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book, CartItem } from "@/lib/books.types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (book, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.book.id === book.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.book.id === book.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { book, quantity }] });
        }
        set({ isOpen: true });
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.book.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i.book.id === id ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((a, i) => a + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((a, i) => a + i.book.price * i.quantity, 0),

      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      closeCart: () => set({ isOpen: false }),
      openCart: () => set({ isOpen: true }),
    }),
    {
      name: "bookhaven-cart",
      partialize: (state) => ({ items: state.items }) as unknown as CartStore,
    },
  ),
);
