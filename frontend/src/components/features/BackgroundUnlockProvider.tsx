import { ReactNode, createContext, useContext } from "react";
import BottomSheet from "@/components/ui/BottomSheet";
import { BackgroundUnlockSheet } from "@/components/features/BackgroundUnlockSheet";
import { useBackgroundUnlock } from "@/hooks/useBackgroundUnlock";
import type { Flow } from "@/types/story";

interface BackgroundUnlockContextType {
  handleClick: (flow: Flow) => void;
  onUnlockSuccess?: (flowId: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BackgroundUnlockContext =
  createContext<BackgroundUnlockContextType | null>(null);

interface BackgroundUnlockProviderProps {
  children: ReactNode;
  onUnlockSuccess?: (flowId: string) => void;
}

export function BackgroundUnlockProvider({
  children,
  onUnlockSuccess,
}: BackgroundUnlockProviderProps) {
  const { handleClick, lockedFlow, closeSheet, unlockBackground } =
    useBackgroundUnlock();

  const handleUnlockSuccessCallback = () => {
    if (lockedFlow?.id) {
      onUnlockSuccess?.(lockedFlow.id);
    }
  };

  return (
    <BackgroundUnlockContext.Provider value={{ handleClick, onUnlockSuccess }}>
      {children}

      {/* Background Unlock BottomSheet */}
      <BottomSheet open={!!lockedFlow} onClose={closeSheet}>
        {lockedFlow && (
          <BackgroundUnlockSheet
            name={lockedFlow.title || "Unknown Background"}
            backgroundId={lockedFlow.id || ""}
            onClose={closeSheet}
            onUnlockSuccess={() => {
              unlockBackground(handleUnlockSuccessCallback);
            }}
          />
        )}
      </BottomSheet>
    </BackgroundUnlockContext.Provider>
  );
}

// Flow 클릭 핸들러를 제공하는 훅
// eslint-disable-next-line react-refresh/only-export-components
export function useBackgroundUnlockHandler() {
  const context = useContext(BackgroundUnlockContext);
  if (!context) {
    throw new Error(
      "useBackgroundUnlockHandler must be used within BackgroundUnlockProvider"
    );
  }
  return context.handleClick;
}
