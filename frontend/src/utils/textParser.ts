export interface ParsedTextSegment {
  text: string;
  isQuoted: boolean;
  hasLineBreaks?: boolean; // 개행 문자 포함 여부
}

/**
 * 텍스트에서 따옴표로 감싸진 부분과 일반 텍스트를 구분하여 파싱합니다.
 * @param text - 파싱할 텍스트
 * @returns ParsedTextSegment 배열
 */
export function parseTextWithQuotes(text: string): ParsedTextSegment[] {
  const segments: ParsedTextSegment[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    // 다음 따옴표 찾기
    const quoteStart = text.indexOf('"', currentIndex);

    if (quoteStart === -1) {
      // 더 이상 따옴표가 없으면 나머지 텍스트를 일반 텍스트로 처리
      const remainingText = text.substring(currentIndex).trim();
      if (remainingText) {
        segments.push({
          text: remainingText,
          isQuoted: false,
          hasLineBreaks: remainingText.includes("\n"),
        });
      }
      break;
    }

    // 따옴표 이전의 텍스트가 있으면 일반 텍스트로 추가
    if (quoteStart > currentIndex) {
      const beforeQuote = text.substring(currentIndex, quoteStart).trim();
      if (beforeQuote) {
        segments.push({
          text: beforeQuote,
          isQuoted: false,
          hasLineBreaks: beforeQuote.includes("\n"),
        });
      }
    }

    // 닫는 따옴표 찾기
    const quoteEnd = text.indexOf('"', quoteStart + 1);

    if (quoteEnd === -1) {
      // 닫는 따옴표가 없으면 나머지를 일반 텍스트로 처리
      const remainingText = text.substring(quoteStart).trim();
      if (remainingText) {
        segments.push({
          text: remainingText,
          isQuoted: false,
          hasLineBreaks: remainingText.includes("\n"),
        });
      }
      break;
    }

    // 따옴표 안의 텍스트 추출 (따옴표 제외)
    const quotedText = text.substring(quoteStart + 1, quoteEnd).trim();
    if (quotedText) {
      segments.push({
        text: quotedText,
        isQuoted: true,
        hasLineBreaks: quotedText.includes("\n"),
      });
    }

    currentIndex = quoteEnd + 1;
  }

  return segments;
}

/**
 * 여러 줄의 텍스트를 파싱합니다.
 * @param lines - 파싱할 텍스트 배열
 * @returns 각 줄별로 파싱된 결과
 */
export function parseMultipleLines(lines: string[]): ParsedTextSegment[][] {
  return lines.map((line) => parseTextWithQuotes(line));
}
