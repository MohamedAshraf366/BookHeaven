import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

const sizeClasses = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  showCount = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= Math.round(rating)
                ? "fill-accent text-accent"
                : "fill-muted text-muted",
            )}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-muted-foreground ml-1 text-xs">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
