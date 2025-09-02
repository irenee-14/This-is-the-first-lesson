import React from "react";
import type { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode | string;
  onClick?: () => void;
  variant?: "default" | "active" | "unfilled";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
  ariaLabel,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full transition-all duration-200 ";

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const variantClasses = {
    default: "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white",
    unfilled: "",
    active: "bg-purple-600 hover:bg-purple-700 text-white",
  };

  const disabledClasses =
    "opacity-50 cursor-not-allowed hover:bg-gray-800 hover:text-gray-300";

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : variantClasses[variant]}
    ${className}
  `.trim();

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className={combinedClasses}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {typeof icon === "string" ? (
        <img
          src={icon}
          alt={ariaLabel || "icon"}
          className="w-full h-full object-contain"
        />
      ) : (
        icon
      )}
    </button>
  );
};

export default IconButton;
