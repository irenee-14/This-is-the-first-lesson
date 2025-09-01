import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  className,
  fullHeight = false,
}) => {
  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto
								fixed inset-0 z-50 flex flex-col justify-end
								pb-14"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      {/* bottom sheet */}
      <div
        className={cn(
          "relative w-full bg-white rounded-t-2xl shadow-lg animate-slide-up",
          fullHeight ? "h-[80vh]" : "max-h-[60vh]",
          className
        )}
      >
        {/* 닫기 버튼 (선택) */}
        <div className="flex justify-center p-2">
          <div className="h-1.5 w-10 bg-gray-300 rounded-full" />
        </div>
        <div className="px-4 pb-6">{children}</div>
      </div>
    </div>
  );
};
