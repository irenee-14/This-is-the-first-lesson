import * as React from "react";
import { cn } from "@/lib/utils";
import RadioButton from "./RadioButton";

export interface RadioGroupOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  label?: string;
  required?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { options, value, onValueChange, className, label, required, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {label && (
          <label className="text-White-Font text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="flex gap-4 flex-wrap">
          {options.map((option) => (
            <RadioButton
              key={option.value}
              name="radio-group"
              value={option.value}
              label={option.label}
              checked={value === option.value}
              onCheckedChange={() => onValueChange?.(option.value)}
            />
          ))}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;

