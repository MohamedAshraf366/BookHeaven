export type Category =
  | "Fiction"
  | "Non-Fiction"
  | "Sci-Fi"
  | "Mystery"
  | "Romance"
  | "Tech";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: Category;
  cover: string;
  description: string;
  isbn: string;
  pages: number;
  publishedDate: string;
  inStock: boolean;
  bestseller?: boolean;
  tags: string[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest";

export type ViewMode = "grid" | "list";

export const CATEGORIES: (Category | "All")[] = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Mystery",
  "Romance",
  "Tech",
];
