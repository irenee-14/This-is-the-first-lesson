import * as React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/ui/Input";
import type { InputProps } from "@/components/ui/Input";

export interface TextFieldProps extends Omit<InputProps, "className"> {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  maxLength?: number;
  className?: string;
  isLength?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      required,
      helperText,
      errorText,
      maxLength,
      className,
      isLength = false,
      value = "",
      ...props
    },
    ref
  ) => {
    const currentLength = String(value).length;

    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {label && (
          <label className="text-White-Font text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="flex flex-col gap-1">
          <Input
            ref={ref}
            value={value}
            variant="outlinedGray500"
            shape="square"
            textColor="white"
            maxLength={maxLength}
            {...props}
          />

          {isLength && (
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">
                {errorText || helperText || ""}
              </span>
              {maxLength && (
                <span className="text-gray-500 text-xs">
                  {currentLength}/{maxLength}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
