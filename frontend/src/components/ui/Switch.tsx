import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  trackColor?: string; // 기본 트랙 색상
  checkedColor?: string; // 체크 시 트랙 색상
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      trackColor = "bg-gray-400",
      checkedColor = "peer-checked:bg-purple-600",
      ...props
    },
    ref
  ) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer w-9 h-5">
        <input
          type="checkbox"
          className={cn("sr-only peer", className)}
          ref={ref}
          {...props}
        />
        {/* 트랙 */}
        <div
          className={cn(
            "w-full h-full rounded-full transition-colors duration-200",
            trackColor,
            checkedColor
          )}
        />
        {/* 썸 */}
        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 peer-checked:left-[calc(100%-1rem-2px)]"></div>
      </label>
    );
  }
);

export default Switch;
