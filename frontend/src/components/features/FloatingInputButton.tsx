import * as React from "react";
import { cn } from "@/lib/utils";
import { ReactComponent as QuotationMarksIcon } from "@/assets/icons/QuotationMarks.svg";
import { ReactComponent as PlayIcon } from "@/assets/icons/Play.svg";
import { useState, useRef, useEffect } from "react";

interface FloatingInputButtonProps {
  onInputSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const FloatingInputButton: React.FC<FloatingInputButtonProps> = ({
  onInputSubmit,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (inputValue.trim() && onInputSubmit) {
      onInputSubmit(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSubmit();
    }
  };

  const handleQuoteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const quotedText = `""`;
    const prevValue = inputValue;

    setInputValue(prevValue + quotedText);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          prevValue.length + 1,
          prevValue.length + 1
        );
      }
    }, 0);
  };

  // textarea 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div
      className={cn(
        "fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm md:max-w-md lg:max-w-lg",
        className
      )}
    >
      <div className="w-full flex gap-2 p-3 items-end">
        {/* Quote button */}
        <button
          className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
          tabIndex={-1}
          onClick={handleQuoteClick}
        >
          <QuotationMarksIcon className="h-5 text-white" />
        </button>

        {/* input */}
        <div className="relative flex-1 flex items-end text-sm h-10">
          <textarea
            ref={textareaRef}
            value={inputValue}
            placeholder='"" 사이에 대사를 입력해보세요.'
            maxLength={350}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-10 max-h-40  rounded-2xl bg-gray-900 text-white px-3 py-2.5 pr-12 resize-none overflow-hidden focus:outline-none"
            rows={1}
          />

          {/* send button */}
          {inputValue.trim() ? (
            <button
              onClick={handleSubmit}
              className="absolute right-2 bottom-1.5 px-2 py-1 text-sm rounded-full bg-gray-600 text-white hover:bg-gray-500"
            >
              →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="absolute right-2 bottom-2 p-1 rounded-full"
            >
              <PlayIcon className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingInputButton;
