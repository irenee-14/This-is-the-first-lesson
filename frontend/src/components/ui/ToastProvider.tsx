import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Toast } from "./Toast";

interface ToastState {
  message: string;
  icon?: string;
  isVisible: boolean;
  duration?: number;
}

interface ToastContextType {
  showToast: (
    message: string,
    options?: { icon?: string; duration?: number }
  ) => void;
  hideToast: () => void;
  showBackgroundUnlockToast: (backgroundName: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
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
        duration: 5000,
      });
    },
    [showToast]
  );

  const contextValue: ToastContextType = {
    showToast,
    hideToast,
    showBackgroundUnlockToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        message={toast.message}
        icon={toast.icon}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={toast.duration}
      />
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
