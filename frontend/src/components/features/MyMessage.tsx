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
        <div key={segmentIndex} className="flex justify-end">
          <div className="inline-block max-w-xs">
            <div className="bg-purple-900 rounded-lg px-3 py-2 rounded-tl-[var(--Radius-s,0.5rem)] rounded-tr-[var(--Radius-s,0.5rem)] rounded-bl-[var(--Radius-s,0.5rem)] rounded-br-none">
              <span className="text-white text-sm leading-5 font-normal tracking-[-0.28px]">
                {textContent}
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={segmentIndex} className="text-left">
          <span className="text-gray-300 text-sm leading-5 font-normal tracking-[-0.28px]">
            {textContent}
          </span>
        </div>
      );
    }
  };

  const parseContent = (contentArray: string[]) => {
    const parsedLines = parseMultipleLines(contentArray);

    return parsedLines.map((lineSegments, lineIndex) => (
      <div key={lineIndex} className="flex flex-col items-end gap-3">
        {lineSegments.map((segment, segmentIndex) =>
          renderTextSegment(segment, lineIndex * 1000 + segmentIndex)
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full ml-auto">
      {/* 메시지 내용 */}
      <div>{parseContent(content)}</div>
    </div>
  );
};

export default MyMessage;
