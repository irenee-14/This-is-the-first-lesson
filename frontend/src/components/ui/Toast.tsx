import React from "react";

interface ToastProps {
  message: string;
  icon?: string;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  icon = "🔑",
  isVisible,
  onClose,
  duration = 3000,
}) => {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute bottom-[120px] z-50 flex justify-center w-full px-4 animate-slide-up"
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        className="items-center min-w-24 gap-3 px-6 py-3 rounded-lg shadow-lg
         inline-flex justify-start w-full h-12 bg-indigoGray-900"
        style={{
          pointerEvents: "auto",
        }}
      >
        <div className="w-4 h-4 relative">
          <div className="w-4 h-4 left-0 top-0 absolute"></div>
          <div className="left-[1px] top-[1px] absolute text-center justify-start text-white text-sm font-medium">
            🔑
          </div>
        </div>
        <div className="text-center justify-start">
          <span className="text-white text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
