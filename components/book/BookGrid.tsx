import type { Book } from "@/lib/books.types";
import { BookCard } from "./BookCard";

interface BookGridProps {
  books: Book[];
  view?: "grid" | "list";
}

export function BookGrid({ books, view = "grid" }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="font-serif text-ink mb-2 text-xl font-bold">No books found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} view="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} view="grid" />
      ))}
    </div>
  );
}
