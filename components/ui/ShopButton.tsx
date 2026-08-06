"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  shopButtonClasses,
  shopButtonSizes,
  shopButtonVariants,
} from "@/lib/shop-button-styles";

interface ShopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof shopButtonVariants;
  size?: keyof typeof shopButtonSizes;
}

export const ShopButton = React.forwardRef<HTMLButtonElement, ShopButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(shopButtonClasses(variant, size), className)}
      {...props}
    />
  ),
);

ShopButton.displayName = "ShopButton";

export { shopButtonClasses };
