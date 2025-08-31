import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { ReactComponent as ArrowRight } from "@/assets/icons/Arrow-Right.svg";
import { ReactComponent as LockIcon } from "@/assets/icons/Lock.svg";
import { useState } from "react";

interface CardMediaLeftProps {
  imageUrl?: string;
  name?: string;
  description?: string;
  tags?: string[];
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
}

export default function CardMediaLeft({
  imageUrl,
  name = "캐릭터명",
  description,
  tags = [],
  className,
  onClick,
  isOpen = true,
}: CardMediaLeftProps) {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const hasTags = tags.length > 0;
  const hasDescription = description && description.trim().length > 0;
  const showArrowRight = hasDescription && !hasTags; // 설명이 있고 태그가 없을 때만 화살표 표시

  const handleClick = () => {
    if (!isOpen) {
      setShowModal(true);
    } else if (onClick) {
      onClick();
    }
  };

  const getImageUrl = (): string | undefined => {
    if (!imageUrl || imageError) return undefined;
    return imageUrl.startsWith("/assets/images/")
      ? new URL(".." + imageUrl, import.meta.url).href
      : imageUrl;
  };

  return (
    <div className="w-full flex flex-col">
      <div
        className={cn(
          "w-full inline-flex justify-start items-start gap-3",
          onClick && isOpen && "cursor-pointer",
          className
        )}
        onClick={handleClick}
      >
        {/* image */}
        <div className="w-20 h-20 relative bg-indigo-900 rounded overflow-hidden">
          {getImageUrl() && (
            <img
              src={getImageUrl()}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}

          {/* gradient overlay */}
          {!isOpen && (
            <>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/90 via-black/70 to-black/0 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-400/40 rounded-full flex items-center justify-center">
                  <div className="w-3 h-4 bg-Font-White-Font">
                    <LockIcon />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* content */}
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-white text-base font-semibold">{name}</div>
            {showArrowRight && <ArrowRight className="w-5 h-5 text-gray-300" />}
          </div>
          <div className="self-stretch text-white text-sm font-normal leading-tight line-clamp-2">
            {description}
          </div>
        </div>
      </div>

      {/* tags */}
      {hasTags && (
        <div className="w-full flex flex-wrap gap-1 mt-2">
          {tags.slice(0, 2).map((tag, index) => (
            <Chip key={index} size="m" shape="rounded" variantStyle="filled">
              {tag}
            </Chip>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[220px] flex flex-col items-center">
            <div className="text-lg font-bold mb-2">잠긴 캐릭터입니다</div>
            <div className="text-sm text-gray-700 mb-4">
              해당 캐릭터는 잠겨 있어 선택할 수 없습니다.
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
    </div>
  );
}
