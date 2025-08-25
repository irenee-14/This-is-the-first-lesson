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
    inputHeight: {
      md: "",
      lg: "input-textarea",
    },
  },
  defaultVariants: {
    variant: "filled",
    textColor: "gray",
    shape: "rounded",
    inputHeight: "md",
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      className,
      variant,
      textColor,
      shape,
      inputHeight,
      leftIcon,
      rightIcon,
      onRightIconClick,
      ...props
    },
    ref
  ) => {
    const isTextarea = inputHeight === "lg";

    return (
      <div
        className={cn(
          inputVariants({ variant, textColor, shape, inputHeight }),
          className
        )}
      >
        {leftIcon && <div className="input-icon">{leftIcon}</div>}

        {isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className="input-field input-field-textarea"
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            className="input-field"
          />
        )}

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="input-icon input-icon-button"
          >
            {rightIcon}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
