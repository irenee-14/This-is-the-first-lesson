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

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

function Chip({
  className,
  size,
  shape,
  variantStyle,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(chipVariants({ size, shape, variantStyle }), className)}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </div>
  );
}

export default Chip;
