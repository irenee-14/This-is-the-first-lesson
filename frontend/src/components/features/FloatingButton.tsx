import * as React from "react";
import { cn } from "@/lib/utils";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import Button from "@/components/ui/Button";

interface FloatingButtonProps {
  onChatClick?: () => void;
  buttonlabel?: string;
  like?: boolean;
  disabled?: boolean;
  className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onChatClick,
  buttonlabel = "채팅하기",
  like = false,
  disabled = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm md:max-w-md lg:max-w-lg h-20",
        className
      )}
    >
      <div className="w-full h-full flex items-center gap-2 px-4">
        {like && (
          <button
            onClick={onChatClick}
            className="w-12 h-12 rounded-full bg-black bg-opacity-80 border border-gray-500 flex items-center justify-center transition-colors duration-200 hover:bg-opacity-90"
            type="button"
            tabIndex={-1}
            disabled={disabled}
          >
            <LikeIcon className="w-6 h-6 text-white" />
          </button>
        )}
        <Button
          onClick={onChatClick}
          disabled={disabled}
          variant="primary"
          size="l"
          width="full"
          className="h-12 rounded-full font-semibold text-base"
        >
          {buttonlabel}
        </Button>
      </div>
    </div>
  );
};

export default FloatingButton;
