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
        className="flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg
    w-full h-12 bg-gray-900"
        style={{
          pointerEvents: "auto",
        }}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-4 h-4">
          <span
            className="text-sm font-medium"
            style={{
              color: "#f5f5fa",
              fontSize: "14px",
              lineHeight: "16.7px",
            }}
          >
            {icon}
          </span>
        </div>

        {/* Message */}
        <span
          className="flex-1 text-sm font-medium text-center"
          style={{
            color: "#f5f5fa",
            fontSize: "14px",
            lineHeight: "16.7px",
            letterSpacing: "-0.28px",
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
