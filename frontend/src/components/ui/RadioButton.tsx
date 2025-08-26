import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ className, label, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <label
        className={cn("flex items-center gap-2 cursor-pointer", className)}
      >
        <div className="relative">
          <input
            type="radio"
            ref={ref}
            checked={checked}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded-full border-4 border-safe transition-colors",
              checked
                ? "border-primary bg-indigoGray-100"
                : "border-indigoGray-200 bg-white"
            )}
          ></div>
        </div>
        <span className="text-White-Font text-sm">{label}</span>
      </label>
    );
  }
);

RadioButton.displayName = "RadioButton";

export default RadioButton;
