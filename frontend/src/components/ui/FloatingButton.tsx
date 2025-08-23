import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import { ReactComponent as QuotationMarksIcon } from "@/assets/icons/QuotationMarks.svg";
import { ReactComponent as PlayIcon } from "@/assets/icons/Play.svg";
import Input from "@/components/ui/Input";

const floatingButtonVariants = cva(
  "fixed bottom-14 left-1/2 -translate-x-1/2 z-50 max-w-sm md:max-w-md lg:max-w-lg",
  {
    variants: {
      variant: {
        chat: "w-full h-20",
        input: "w-full h-18",
      },
    },
    defaultVariants: {
      variant: "chat",
    },
  }
);

export interface FloatingButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingButtonVariants> {
  onChatClick?: () => void;
  onInputSubmit?: (value: string) => void;
  placeholder?: string;
}

const FloatingButton = React.forwardRef<HTMLDivElement, FloatingButtonProps>(
  (
    {
      className,
      variant = "chat",
      onChatClick,
      onInputSubmit,
      placeholder = "Text",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleSubmit = () => {
      if (inputValue.trim() && onInputSubmit) {
        onInputSubmit(inputValue);
        setInputValue("");
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

    if (variant === "chat") {
      return (
        <div
          ref={ref}
          className={cn(
            floatingButtonVariants({ variant }),

            className
          )}
          {...props}
        >
          <div className="w-full h-full flex items-center gap-2 px-4">
            {/* Icon Button */}
            <button
              onClick={onChatClick}
              className="w-12 h-12 rounded-full bg-black bg-opacity-80 border border-gray-500 flex items-center justify-center transition-colors duration-200 hover:bg-opacity-90"
            >
              <LikeIcon className="w-6 h-6 text-white" />
            </button>

            {/* Chat Button */}
            <button
              onClick={onChatClick}
              className="flex-1 h-12 bg-purple-600 rounded-full flex items-center justify-center gap-2 px-4 transition-colors duration-200 hover:bg-purple-700"
            >
              <span className="font-semibold text-base">채팅하기</span>
            </button>
          </div>
        </div>
      );
    }

    if (variant === "input") {
      return (
        <div
          ref={ref}
          className={cn(floatingButtonVariants({ variant }), className)}
          {...props}
        >
          <div className="w-full h-full flex items-center gap-2 p-4">
            {/* Icon Button */}
            <button
              onClick={onChatClick}
              className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-gray-950 flex items-center justify-center transition-colors duration-200 hover:bg-gray-900"
            >
              <QuotationMarksIcon className="h-5 text-white" />
            </button>

            {/* Input Field */}
            <Input
              type="text"
              value={inputValue}
              placeholder={placeholder}
              onChange={(e) => setInputValue(e.target.value)}
              rightIcon={<PlayIcon />}
              onRightIconClick={handleSubmit}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      );
    }

    return null;
  }
);

FloatingButton.displayName = "FloatingButton";

export default FloatingButton;
