// components/features/BackgroundUnlockSheet.tsx
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import keyIcon from "/src/assets/icons/key.png";

interface BackgroundUnlockSheetProps {
  background: { backgroundName: string } | null;
  onClose: () => void;
  onUnlock: () => void;
}

export function BackgroundUnlockSheet({
  background,
  onClose,
  onUnlock,
}: BackgroundUnlockSheetProps) {
  if (!background) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">
          위프를 사용해서 [{background.backgroundName}]을(를) 오픈할까요?
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
        <Button variant="tertiary" size="l" onClick={onClose}>
          닫기
        </Button>
        <Button variant="primary" size="l" width="full" onClick={onUnlock}>
          오픈하기
        </Button>
      </div>
    </div>
  );
}
