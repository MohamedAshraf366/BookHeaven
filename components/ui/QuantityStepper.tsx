"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="border-border bg-card hover:bg-muted flex h-8 w-8 items-center justify-center rounded-l-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        value={quantity}
        aria-label="Quantity"
        onChange={(e) => {
          const val = parseInt(e.target.value) || min;
          onChange(Math.max(min, Math.min(max, val)));
        }}
        className="border-border bg-card h-8 w-12 border-y text-center text-sm font-semibold focus:outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="border-border bg-card hover:bg-muted flex h-8 w-8 items-center justify-center rounded-r-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
