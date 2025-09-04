import { useState, useCallback } from "react";

interface ToastState {
  message: string;
  icon?: string;
  isVisible: boolean;
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    icon: "🔑",
    isVisible: false,
    duration: 3000,
  });

  const showToast = useCallback(
    (
      message: string,
      options?: {
        icon?: string;
        duration?: number;
      }
    ) => {
      setToast({
        message,
        icon: options?.icon || "🔑",
        isVisible: true,
        duration: options?.duration || 3000,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const showBackgroundUnlockToast = useCallback(
    (backgroundName: string) => {
      showToast(`채팅이 쌓여 [${backgroundName}] 배경이 열렸어요 !`, {
        icon: "🔑",
        duration: 3000,
      });
    },
    [showToast]
  );

  return {
    toast,
    showToast,
    hideToast,
    showBackgroundUnlockToast,
  };
};
