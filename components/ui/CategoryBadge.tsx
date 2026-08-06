import { cn } from "@/lib/utils";
import type { Category } from "@/lib/books.types";

const categoryStyles: Record<Category, string> = {
  Fiction: "bg-blue-100 text-blue-800",
  "Non-Fiction": "bg-green-100 text-green-800",
  "Sci-Fi": "bg-purple-100 text-purple-800",
  Mystery: "bg-red-100 text-red-800",
  Romance: "bg-pink-100 text-pink-800",
  Tech: "bg-cyan-100 text-cyan-800",
};

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase",
        categoryStyles[category],
        className,
      )}
    >
      {category}
    </span>
  );
}
