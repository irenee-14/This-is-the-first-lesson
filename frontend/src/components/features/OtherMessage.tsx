import React from "react";
import MessageActions from "@/components/features/MessageActions";
import { parseMultipleLines, type ParsedTextSegment } from "@/utils/textParser";

interface OtherMessageProps {
  content: string[];
  characterName?: string;
  profileImage?: string;
  onReset?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const OtherMessage: React.FC<OtherMessageProps> = ({
  content,
  characterName = "캐릭터명",
  profileImage,
  onReset,
  onEdit,
  onDelete,
  onShare,
  onBookmark,
}) => {
  const renderTextSegment = (
    segment: ParsedTextSegment,
    segmentIndex: number
  ) => {
    if (segment.isQuoted) {
      return (
        <span key={segmentIndex} className="inline-block mr-1 mb-1">
          <span
            className="bg-gray-900 rounded-lg px-3 py-2 inline-block
          rounded-tl-[var(--Radius-s,0.5rem)] rounded-tr-[var(--Radius-s,0.5rem)] rounded-br-[var(--Radius-s,0.5rem)] rounded-bl-none"
          >
            <span className="text-white text-sm leading-5 font-normal tracking-[-0.28px]">
              {segment.text}
            </span>
          </span>
        </span>
      );
    } else {
      return (
        <span
          key={segmentIndex}
          className="text-gray-300 text-sm leading-5 font-normal tracking-[-0.28px] mr-1"
        >
          {segment.text}
        </span>
      );
    }
  };

  const parseContent = (contentArray: string[]) => {
    const parsedLines = parseMultipleLines(contentArray);

    return parsedLines.map((lineSegments, lineIndex) => (
      <div key={lineIndex} className="mb-2 flex flex-wrap items-center gap-3">
        {lineSegments.map((segment, segmentIndex) =>
          renderTextSegment(segment, segmentIndex)
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-3 max-w-[360px]">
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
        <span className="text-white text-xs leading-[14.32px] font-medium tracking-[-0.24px]">
          {characterName}
        </span>
      </div>

      {/* 메시지 내용 */}
      <div className="flex flex-col">{parseContent(content)}</div>

      {/* 메시지 액션 */}
      <MessageActions
        onReset={onReset}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
        onBookmark={onBookmark}
        className="mt-2"
      />
    </div>
  );
};

export default OtherMessage;
