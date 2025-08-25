import React from "react";
import { parseMultipleLines, type ParsedTextSegment } from "@/utils/textParser";

interface MyMessageProps {
  content: string[];
}

const MyMessage: React.FC<MyMessageProps> = ({ content }) => {
  const renderTextSegment = (
    segment: ParsedTextSegment,
    segmentIndex: number
  ) => {
    if (segment.isQuoted) {
      return (
        <span key={segmentIndex} className="inline-block ml-1 mb-1">
          <span
            className="bg-purple-900 rounded-lg px-3 py-2 inline-block
            rounded-tl-[var(--Radius-s,0.5rem)] rounded-tr-[var(--Radius-s,0.5rem)] rounded-bl-[var(--Radius-s,0.5rem)] rounded-br-none"
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
          className="text-gray-300 text-sm leading-5 font-normal tracking-[-0.28px] ml-1"
        >
          {segment.text}
        </span>
      );
    }
  };

  const parseContent = (contentArray: string[]) => {
    const parsedLines = parseMultipleLines(contentArray);

    return parsedLines.map((lineSegments, lineIndex) => (
      <div
        key={lineIndex}
        className="mb-2 flex flex-wrap items-center justify-end"
      >
        {lineSegments.map((segment, segmentIndex) =>
          renderTextSegment(segment, segmentIndex)
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-2 max-w-[360px] ml-auto">
      {/* 메시지 내용 */}
      <div className="flex flex-col">{parseContent(content)}</div>
    </div>
  );
};

export default MyMessage;
