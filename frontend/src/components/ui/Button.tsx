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
  },
  defaultVariants: {
    variant: "primary",
    size: "m",
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
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
