import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import "@/styles/components/chip.css";

const chipVariants = cva("chip-base", {
  variants: {
    size: {
      s: "chip-s",
      m: "chip-m",
      l: "chip-l",
    },
    shape: {
      rounded: "rounded-full",
      square: "rounded-lg",
    },
    variantStyle: {
      filled: "chip-filled",
      outlined: "chip-outlined",
    },
  },
  defaultVariants: {
    size: "s",
    shape: "rounded",
    variantStyle: "filled",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, size, shape, variantStyle, ...props }: BadgeProps) {
  return (
    <div
      className={cn(chipVariants({ size, shape, variantStyle }), className)}
      {...props}
    />
  );
}

export default Chip;
