// components/features/BackgroundUnlockSheet.tsx
import { useState } from "react";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import keyIcon from "/src/assets/icons/key.png";
import { useApi } from "@/hooks/useApi";

interface BackgroundUnlockSheetProps {
  name: string | null;
  backgroundId: string;
  onClose: () => void;
  onUnlockSuccess: () => void;
}

export function BackgroundUnlockSheet({
  name,
  backgroundId,
  onClose,
  onUnlockSuccess,
}: BackgroundUnlockSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { patch } = useApi();
  const handleUnlock = async () => {
    try {
      setIsLoading(true);

      if (!backgroundId || backgroundId.trim() === "") {
        console.error("Background ID validation failed:", { backgroundId });
        throw new Error("Background ID is missing or empty");
      }

      await patch("/users/unlocked-backgrounds", { backgroundId });

      onUnlockSuccess?.();
    } catch (error) {
      console.error("Failed to unlock background:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!name) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">
          위프를 사용해서 [{name}]을(를) 오픈할까요?
        </h2>

        <div className="flex w-full rounded-md bg-gray-700 items-center gap-3 p-3 ">
          <IconButton icon={keyIcon} />
          <div>
            <p className="text-md text-semibold text-white">
              1,024 위프 사용하기
            </p>
            <p className="text-xs text-medium text-gray-400">보유 위프 2,048</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button
          variant="tertiary"
          size="m"
          onClick={onClose}
          disabled={isLoading}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="m"
          width="full"
          onClick={handleUnlock}
          disabled={isLoading}
        >
          {isLoading ? "오픈 중..." : "오픈하기"}
        </Button>
      </div>
    </div>
  );
}
