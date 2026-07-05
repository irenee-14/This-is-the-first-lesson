import { describe, it, expect } from "vitest";
import { parseTextWithQuotes, parseMultipleLines } from "./textParser";

describe("parseTextWithQuotes", () => {
  it("서술과 대사가 섞인 텍스트를 분리한다", () => {
    const result = parseTextWithQuotes('미소를 지으며 다가간다. "안녕하세요."');

    expect(result).toEqual([
      { text: "미소를 지으며 다가간다.", isQuoted: false, hasLineBreaks: false },
      { text: "안녕하세요.", isQuoted: true, hasLineBreaks: false },
    ]);
  });

  it("대사 뒤에 이어지는 서술도 분리한다", () => {
    const result = parseTextWithQuotes('"오늘 날씨 좋네요." 하늘을 올려다본다.');

    expect(result).toEqual([
      { text: "오늘 날씨 좋네요.", isQuoted: true, hasLineBreaks: false },
      { text: "하늘을 올려다본다.", isQuoted: false, hasLineBreaks: false },
    ]);
  });

  it("대사가 여러 개인 텍스트를 순서대로 파싱한다", () => {
    const result = parseTextWithQuotes('"첫마디." 잠시 머뭇거린다. "두번째 마디."');

    expect(result.map((s) => s.isQuoted)).toEqual([true, false, true]);
    expect(result[1].text).toBe("잠시 머뭇거린다.");
  });

  it("따옴표가 없으면 전체를 서술로 처리한다", () => {
    const result = parseTextWithQuotes("조용히 창밖을 바라본다.");

    expect(result).toEqual([
      { text: "조용히 창밖을 바라본다.", isQuoted: false, hasLineBreaks: false },
    ]);
  });

  it("닫는 따옴표가 없으면 나머지를 서술로 처리한다 (LLM 출력 방어)", () => {
    const result = parseTextWithQuotes('고개를 끄덕인다. "그러니까 내 말은');

    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({
      text: '"그러니까 내 말은',
      isQuoted: false,
      hasLineBreaks: false,
    });
  });

  it("빈 따옴표는 무시한다", () => {
    const result = parseTextWithQuotes('말없이 웃는다. ""');

    expect(result).toEqual([
      { text: "말없이 웃는다.", isQuoted: false, hasLineBreaks: false },
    ]);
  });

  it("개행이 포함된 세그먼트에 hasLineBreaks를 표시한다", () => {
    const result = parseTextWithQuotes("첫 줄.\n둘째 줄.");

    expect(result[0].hasLineBreaks).toBe(true);
  });

  it("빈 문자열은 빈 배열을 반환한다", () => {
    expect(parseTextWithQuotes("")).toEqual([]);
  });
});

describe("parseMultipleLines", () => {
  it("각 줄을 독립적으로 파싱한다", () => {
    const result = parseMultipleLines(['서술만 있는 줄', '"대사만 있는 줄"']);

    expect(result).toHaveLength(2);
    expect(result[0][0].isQuoted).toBe(false);
    expect(result[1][0].isQuoted).toBe(true);
  });
});
