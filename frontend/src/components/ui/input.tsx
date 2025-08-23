import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/styles/components/input.css";

const inputVariants = cva("input-base", {
  variants: {
    variant: {
      filled: "input-filled",
      outlinedGray500: "input-outlined-gray500",
      outlinedGray200: "input-outlined-gray200",
    },
    textColor: {
      gray: "input-text-gray",
      white: "input-text-white",
    },
    shape: {
      rounded: "input-rounded",
      square: "input-square",
    },
  },
  defaultVariants: {
    variant: "filled",
    textColor: "gray",
    shape: "rounded",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, textColor, shape, leftIcon, rightIcon, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(inputVariants({ variant, textColor, shape, className }))}
      >
        {leftIcon && (
          <div className="w-5 h-5 flex items-center input-icon">{leftIcon}</div>
        )}
        <input
          ref={ref}
          {...props}
          className="flex-1 bg-transparent focus:outline-none"
        />
        {rightIcon && (
          <div className="w-5 h-5 flex items-center input-icon">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
