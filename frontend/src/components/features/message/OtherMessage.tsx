import React from "react";
import MessageActions from "@/components/features/message/MessageActions";
import { parseMultipleLines, type ParsedTextSegment } from "@/utils/textParser";

interface OtherMessageProps {
  content: string;
  characterName?: string;
  profileImage?: string;
  isLastMessage?: boolean; // 마지막 메시지인지 여부
  onReset?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  typing?: boolean;
}

const OtherMessage: React.FC<OtherMessageProps> = ({
  content,
  characterName = "캐릭터명",
  profileImage,
  isLastMessage = false,
  onReset,
  onEdit,
  onDelete,
  onShare,
  onBookmark,
  typing,
}) => {
  const renderTextSegment = (
    segment: ParsedTextSegment,
    segmentIndex: number
  ) => {
    const textContent = segment.hasLineBreaks
      ? segment.text.split("\n").map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {line}
            {lineIndex < segment.text.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))
      : segment.text;

    if (segment.isQuoted) {
      return (
        <div key={segmentIndex} className="flex justify-start py-3">
          <div className="inline-block max-w-xs">
            <div className="bg-gray-900 rounded-lg px-3 py-2 rounded-tl-[var(--Radius-s,0.5rem)] rounded-tr-[var(--Radius-s,0.5rem)] rounded-br-[var(--Radius-s,0.5rem)] rounded-bl-none">
              <span className="text-white text-sm leading-5 font-normal tracking-[-0.28px]">
                {textContent}
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={segmentIndex}>
          <span className="text-gray-300 text-sm leading-5 font-normal tracking-[-0.28px]">
            {textContent}
          </span>
        </div>
      );
    }
  };

  const parseContent = (contentArray: string) => {
    const parsedLines = parseMultipleLines(contentArray.split("\n"));

    return parsedLines.map((lineSegments, lineIndex) => (
      <div key={lineIndex} className="flex flex-col items-start gap-1">
        {lineSegments.map((segment, segmentIndex) =>
          renderTextSegment(segment, lineIndex * 1000 + segmentIndex)
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-2 w-full p-4">
      {/* 프로필 섹션 */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gray-700 flex-shrink-0">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <span className="text-white text-sm leading-[14.32px] font-medium tracking-[-0.24px]">
          {characterName}
        </span>
      </div>

      {/* 메시지 내용 */}
      {typing ? (
        <div className="flex items-center gap-1 py-4 px-1">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.1s]" />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
        </div>
      ) : (
        <>
          <div>{parseContent(content)}</div>
          {/* 메시지 액션 */}

          <MessageActions
            key={`${content}-${isLastMessage}`}
            onReset={onReset}
            onEdit={onEdit}
            onDelete={onDelete}
            onShare={onShare}
            onBookmark={onBookmark}
            isLastMessage={isLastMessage}
          />
        </>
      )}
    </div>
  );
};

export default OtherMessage;
