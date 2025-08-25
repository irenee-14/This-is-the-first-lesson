import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/styles/components/button.css";

const buttonVariants = cva("btn-base", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      tertiary: "btn-tertiary",
    },
    size: {
      s: "btn-s",
      m: "btn-m",
      l: "btn-l",
    },
    width: {
      auto: "btn-width-auto",
      full: "btn-width-full",
      fit: "btn-width-fit",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "m",
    width: "auto",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = (asChild ? Slot : "button") as React.ElementType;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, width }), className)}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
        <span className="btn-content">{children}</span>
        {rightIcon && (
          <span className="btn-icon btn-icon-right">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
