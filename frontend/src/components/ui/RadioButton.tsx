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
              "w-5 h-5 rounded-full border-2 transition-colors",
              checked
                ? "border-primary bg-indigoGray-light"
                : "border-gray-500 bg-indigoGray-medium"
            )}
          >
            {checked && (
              <div className="w-2 h-2 rounded-full bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>
        <span className="text-White-Font text-sm">{label}</span>
      </label>
    );
  }
);

RadioButton.displayName = "RadioButton";

export default RadioButton;

