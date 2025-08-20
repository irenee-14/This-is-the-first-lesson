import React from "react";
import clsx from "clsx";

// btn-s btn-m btn-l btn-primary btn-secondary btn-tertiary

type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "s" | "m" | "l";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type,
  variant = "primary",
  size = "m",
  onClick,
  className,
  disabled = false,
  children,
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
      type={type || "button"}
      className={clsx(
        "btn-base",
        sizeClass,
        variantClass,
        disabled && "cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
