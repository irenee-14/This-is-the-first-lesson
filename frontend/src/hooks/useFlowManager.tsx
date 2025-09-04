import { useState, useEffect, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import type { Flow } from "@/types/story";

interface UseFlowManagerProps {
  writerId?: string;
  characterId?: string;
  autoLoad?: boolean;
}

export function useFlowManager({
  writerId,
  characterId,
  autoLoad = true,
}: UseFlowManagerProps) {
  const [localFlowData, setLocalFlowData] = useState<Flow[]>([]);

  const { data: flowData, get: getFlow } = useApi<{ data: Flow[] }>();

  const reloadFlowData = useCallback(() => {
    if (writerId && characterId) {
      getFlow(
        `/users/flows-with-opened?writerId=${writerId}&characterId=${characterId}`
      );
    }
  }, [writerId, characterId, getFlow]);

  // Flow 데이터가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    if (flowData?.data) {
      setLocalFlowData(flowData.data);
    }
  }, [flowData?.data]);

  // 자동 로드가 활성화된 경우 데이터 로드
  useEffect(() => {
    if (autoLoad) {
      reloadFlowData();
    }
  }, [autoLoad, reloadFlowData]);

  // 특정 Flow만 업데이트하는 함수
  const updateFlowItem = useCallback(
    (flowId: string, updates: Partial<Flow>) => {
      setLocalFlowData((prev) =>
        prev.map((flow) =>
          flow.id === flowId ? { ...flow, ...updates } : flow
        )
      );
    },
    []
  );

  return {
    flows: localFlowData,
    reloadFlowData,
    updateFlowItem,
    setLocalFlowData,
  };
}
