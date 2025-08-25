// src/hooks/useFlowReset.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFlowStore } from "@/stores/useFlowStore";

const FLOW_PATHS = ["/characters", "/backgrounds", "/personas", "/chat"];

export function useFlowReset() {
  const location = useLocation();
  const resetFlow = useFlowStore((s) => s.resetFlow);

  useEffect(() => {
    // 현재 경로가 flow 관련이 아니면 상태 초기화
    const isFlowPath = FLOW_PATHS.some((path) =>
      location.pathname.startsWith(path)
    );

    if (!isFlowPath) {
      resetFlow();
    }
  }, [location.pathname, resetFlow]);
}
