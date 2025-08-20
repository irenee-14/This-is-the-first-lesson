import React from "react";
import clsx from "clsx";

type ChipProps = {
  shape?: "rounded" | "square";
  style?: "filled" | "outlined";
  size?: "s" | "m" | "l";
  className?: string;
  children: React.ReactNode;
};

const Chip: React.FC<ChipProps> = ({
  shape = "rounded",
  style = "filled",
  size = "s",
  className,
  children,
}) => {
  const sizeClass =
    size === "s" ? "chip-s" : size === "m" ? "chip-m" : "chip-l";
  const shapeClass = shape === "rounded" ? "chip-rounded" : "chip-square";
  const styleClass = style === "filled" ? "chip-filled" : "chip-outlined";

  return (
    <div
      className={clsx(
        "chip-base",
        sizeClass,
        shapeClass,
        styleClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
