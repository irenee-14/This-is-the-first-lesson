import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { ReactComponent as LockIcon } from "@/assets/icons/Lock.svg";
import { useBackgroundClickHandler } from "@/hooks/useBackgroundClickHandler";
import BottomSheet from "@/components/ui/BottomSheet";
import { BackgroundUnlockSheet } from "@components/features/BackgroundUnlockSheet";
import type { Flow } from "@/types/story";

export interface CardMediaTopProps {
  flow?: Flow; // string에서 Flow로 변경
  isOpen?: boolean;
  imageUrl?: string;
  name?: string;
  description?: string;
  chips?: string[];
  onClick?: () => void;
  variant?: "vertical" | "horizontal" | "grid";
  className?: string;
}

export default function CardMediaTop({
  flow,
  isOpen = true,
  imageUrl,
  name,
  description,
  chips = [],
  className,
  onClick,
  variant = "grid",
}: CardMediaTopProps) {
  const isHorizontal = variant === "horizontal";
  const { handleClick, lockedFlow, closeSheet } = useBackgroundClickHandler();

  const handleCardClick = () => {
    if (flow) {
      handleClick(flow);
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
        onClick={handleCardClick}
        aria-disabled={!isOpen}
      >
        <div
          className={cn(
            "relative bg-indigo-900 rounded",
            isHorizontal ? "w-40 h-40" : "w-full aspect-square"
          )}
          style={{
            // backgroundImage: `url(${getImageUrl(imageUrl)})`,
            backgroundImage: imageUrl
              ? imageUrl.startsWith("/assets/images/")
                ? `url(${new URL(".." + imageUrl, import.meta.url).href})`
                : `url(${imageUrl})`
              : undefined,
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

      {/* flow가 있을 때만 BottomSheet 표시 */}
      {flow && (
        <BottomSheet open={!!lockedFlow} onClose={closeSheet}>
          <BackgroundUnlockSheet
            name="조선시대" //임시
            onClose={closeSheet}
            onUnlock={() => {
              closeSheet();
            }}
          />
        </BottomSheet>
      )}
    </>
  );
}
