import { cn } from "@/lib/utils";

export const shopButtonVariants = {
  primary: "bg-ink text-ink-foreground hover:bg-ink/90",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  ghost: "bg-transparent text-ink border border-border hover:bg-muted",
  outline: "bg-transparent text-ink border-2 border-ink hover:bg-muted",
};

export const shopButtonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const shopButtonClasses = (
  variant: keyof typeof shopButtonVariants = "primary",
  size: keyof typeof shopButtonSizes = "md",
  className?: string,
) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
    shopButtonVariants[variant],
    shopButtonSizes[size],
    className,
  );
