// hooks/useTopSentinelObserver.ts
import { useEffect } from "react";

export function useTopSentinelObserver({
  containerRef,
  topSentinelRef,
  handleLoadMore,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  topSentinelRef: React.RefObject<HTMLDivElement>;
  handleLoadMore: () => void;
}) {
  useEffect(() => {
    const container = containerRef.current;
    const sentinel = topSentinelRef.current;
    if (!sentinel) return;

    let root: Element | null = null;
    if (container) {
      const style = getComputedStyle(container);
      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        root = container;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          handleLoadMore();
        }
      },
      { root, threshold: 0 } // 0이면 살짝만 보여도 실행
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [containerRef, topSentinelRef, handleLoadMore]);
}
