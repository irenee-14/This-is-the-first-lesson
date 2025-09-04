/**
 * 스크롤바로 인한 레이아웃 시프트를 방지하기 위한 유틸리티 함수들
 */

/**
 * 스크롤바 너비를 계산하고 CSS 변수에 설정
 */
export function setScrollbarWidth(): void {
  // 임시 div를 생성하여 스크롤바 너비 측정
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar"; // IE용
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);

  // CSS 변수에 스크롤바 너비 설정
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollbarWidth}px`
  );
}

/**
 * 스크롤바가 있는지 확인
 */
export function hasScrollbar(): boolean {
  return (
    document.documentElement.scrollHeight >
    document.documentElement.clientHeight
  );
}

/**
 * 스크롤바 너비를 반환
 */
export function getScrollbarWidth(): number {
  return (
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--scrollbar-width"
      )
    ) || 0
  );
}

/**
 * 페이지 로드 시 스크롤바 너비 설정
 */
export function initializeScrollbarWidth(): void {
  // DOM이 로드된 후 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setScrollbarWidth);
  } else {
    setScrollbarWidth();
  }

  // 윈도우 리사이즈 시에도 다시 계산
  window.addEventListener("resize", setScrollbarWidth);
}
