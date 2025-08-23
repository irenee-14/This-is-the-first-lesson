import { useState } from "react";
import { cn } from "@/lib/utils";
import Switch from "./Switch";

import { ReactComponent as SafeIcon } from "@/assets/icons/Safe.svg";

interface SwitchSafeProps {
  initialMode?: "safe" | "unsafe";
}

export default function SwitchSafe({ initialMode = "safe" }: SwitchSafeProps) {
  const [mode, setMode] = useState<"safe" | "unsafe">(initialMode);

  const checked = mode === "safe";

  const textColor = checked ? "text-safe-font" : "text-unsafe";
  const bgColor = checked ? "bg-safe-opacity-25" : "bg-unsafe-opacity-25";
  const labelText = checked ? "세이프" : "언세이프";

  return (
    <div
      className={cn(
        "px-4 py-3 inline-flex items-center gap-1 rounded-2xl transition-colors",
        bgColor
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium transition-colors",
          textColor
        )}
      >
        <SafeIcon className="w-auto h-5 stroke-current" />
        {labelText}
      </span>

      <Switch
        checked={checked}
        onChange={() => setMode(checked ? "unsafe" : "safe")}
        trackColor="bg-unsafe-opacity-25"
        checkedColor="peer-checked:bg-safe"
      />
    </div>
  );
}
