import { useState } from "react";
import type { Flow } from "@/types/story";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";

export function useBackgroundUnlock() {
  const [lockedFlow, setLockedFlow] = useState<Flow | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const navigate = useNavigate();
  const { patch } = useApi();

  const handleClick = (flow?: Flow) => {
    if (!flow) return;

    if (flow.isOpen) {
      navigate(`/story/${flow.id}`);
    } else {
      setLockedFlow(flow);
    }
  };

  const closeSheet = () => setLockedFlow(null);

  const unlockBackground = async (refetchFlow?: () => void) => {
    try {
      setIsUnlocking(true);
      if (lockedFlow?.id) {
        await patch("/users/unlocked-backgrounds", {
          backgroundId: lockedFlow.id,
        });
        closeSheet();
        // Flow 데이터 다시 불러오기
        if (refetchFlow) {
          refetchFlow();
        }
      } else {
        console.error("No lockedFlow or lockedFlow.id is missing");
      }
    } catch (error) {
      console.error("Failed to unlock background:", error);
      // TODO: 에러 처리 (토스트 메시지 등)
    } finally {
      setIsUnlocking(false);
    }
  };

  return {
    handleClick,
    lockedFlow,
    closeSheet,
    unlockBackground,
    isUnlocking,
  };
}
