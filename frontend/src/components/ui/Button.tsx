import React from "react";
import clsx from "clsx";

// btn-s btn-m btn-l btn-primary btn-secondary btn-tertiary

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "s" | "m" | "l";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "m",
  disabled = false,
  children,
  className,
}) => {
  const sizeClass = size === "s" ? "btn-s" : size === "m" ? "btn-m" : "btn-l";
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
      ? "btn-secondary"
      : "btn-tertiary";

  return (
    <button
      className={clsx(
        "btn-base",
        sizeClass,
        variantClass,
        disabled && "cursor-not-allowed",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
