import React from "react";
import { useToastContext } from "./ToastProvider";

export const ToastExample: React.FC = () => {
  const { showToast, showBackgroundUnlockToast } = useToastContext();

  const handleBasicToast = () => {
    showToast("기본 토스트 메시지입니다!");
  };

  const handleCustomIconToast = () => {
    showToast("커스텀 아이콘 토스트!", { icon: "🎉" });
  };

  const handleBackgroundUnlockToast = () => {
    showBackgroundUnlockToast("조선시대");
  };

  const handleLongDurationToast = () => {
    showToast("5초간 표시되는 토스트입니다!", { duration: 5000 });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Toast 예시</h2>

      <div className="space-y-2">
        <button
          onClick={handleBasicToast}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          기본 토스트 보기
        </button>

        <button
          onClick={handleCustomIconToast}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          커스텀 아이콘 토스트 보기
        </button>

        <button
          onClick={handleBackgroundUnlockToast}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          배경 언락 토스트 보기
        </button>

        <button
          onClick={handleLongDurationToast}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          긴 지속시간 토스트 보기 (5초)
        </button>
      </div>
    </div>
  );
};

export default ToastExample;
