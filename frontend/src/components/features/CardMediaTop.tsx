import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { ReactComponent as LockIcon } from "@/assets/icons/Lock.svg";
import { useState } from "react";

export interface CardMediaTopProps {
  isOpen?: boolean;
  imageUrl?: string;
  name?: string;
  description?: string;
  chips?: string[];
  className?: string;
  onClick?: () => void;
  variant?: "horizontal" | "grid";
}

export default function CardMediaTop({
  isOpen = true,
  imageUrl,
  name,
  description,
  chips,
  className,
  onClick,
  variant = "grid",
}: CardMediaTopProps) {
  const isHorizontal = variant === "horizontal";
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setShowModal(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <div
        className={cn(
          "inline-flex flex-col justify-start items-start gap-2",
          isHorizontal ? "w-40 flex-shrink-0" : "w-full",
          onClick && isOpen && "cursor-pointer",
          className
        )}
        onClick={handleClick}
        aria-disabled={!isOpen}
      >
        <div
          className={cn(
            "relative bg-indigo-900 rounded",
            isHorizontal ? "w-40 h-40" : "w-full aspect-square"
          )}
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!isOpen && (
            <>
              {/* gradient overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/90 via-black/70 to-black/0 pointer-events-none" />
              {/* 중앙 아이콘 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-10 h-10 bg-gray-400/40 rounded-full flex items-center justify-center">
                  <div className="w-4 h-6 bg-Font-White-Font">
                    <LockIcon />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="self-stretch text-white text-base font-semibold">
          {name}
        </div>
        {description && (
          <div className="self-stretch text-white text-sm font-normal leading-tight line-clamp-2">
            {description}
          </div>
        )}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {chips.slice(0, 2).map((chip, index) => (
              <Chip key={index} size="m" shape="rounded" variantStyle="filled">
                {chip}
              </Chip>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 min-w-[220px] flex flex-col items-center">
            <div className="text-lg font-bold mb-2 text-gray-950">
              잠긴 배경입니다
            </div>
            <div className="text-sm text-gray-700 mb-4">
              해당 배경은 잠겨 있어 선택할 수 없습니다.
            </div>
            <button
              className="px-4 py-2 bg-primary text-white rounded"
              onClick={() => setShowModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
