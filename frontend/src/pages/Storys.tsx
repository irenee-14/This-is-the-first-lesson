import CardMediaLeft from "@/components/features/card/CardMediaLeft";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import BottomSheet from "@/components/ui/BottomSheet";
import { useApi } from "@/hooks/useApi";
import { useBackgroundClickHandler } from "@/hooks/useBackgroundClickHandler";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BackgroundUnlockSheet } from "@/components/features/BackgroundUnlockSheet";
import type { Flow } from "@/types/story";

export interface BackgroundUnlockSheetProps {
  flow: Flow | null;
  onClose: () => void;
  onUnlock: () => void;
}

export default function Stories() {
  const {
    data: flowData,
    loading,
    error,
    get,
  } = useApi<{ data: import("@/types/story").Flow[] }>();

  const { handleClick, lockedFlow, closeSheet } = useBackgroundClickHandler();
  const [searchParams] = useSearchParams();

  const writerId = searchParams.get("writerId");
  const characterId = searchParams.get("characterId");

  console.log("params", { writerId, characterId });
  console.log("flowData", flowData);

  useEffect(() => {
    if (writerId && characterId) {
      get(
        `/users/flows-with-opened?writerId=${writerId}&characterId=${characterId}`
      );
    }
  }, [get, characterId, writerId]);

  const flows = flowData?.data || [];
  // steps 변수 제거 - flows가 직접 steps 역할

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header variant="withText" title="배경 선택하기" />
        <div className="pt-14 pb-36 flex items-center justify-center">
          <div>로딩 중...</div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header variant="withText" title="배경 선택하기" />
        <div className="pt-14 pb-36 flex items-center justify-center">
          <div>오류가 발생했습니다: {error}</div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header variant="withText" title="배경 선택하기" />

      {/* Main Content */}
      <div className="pt-14 pb-36">
        {/* Character Section */}
        <div className="relative p-4 flex flex-col gap-5">
          {/* notification */}
          <div className="rounded inline-flex flex-col justify-center items-start gap-1">
            <div className="justify-start text-Font-White-Font text-base font-semibold font-['Pretendard']">
              보고싶은 배경을 선택해 주세요
            </div>
            <div className="justify-start text-Gray-300 text-sm font-normal font-['Pretendard'] leading-tight">
              캐릭터와 채팅이 쌓이면 잠금된 배경을 볼 수 있어요
            </div>
          </div>

          {/* Background List */}
          {flows.length > 0 ? (
            <>
              <div
                className={
                  "self-stretch inline-flex flex-col justify-start items-start gap-4 scrollbar-hide"
                }
              >
                {flows.map((flow, index) => (
                  <CardMediaLeft
                    key={flow.id || index}
                    isOpen={flow.isOpen}
                    imageUrl={flow.imageUrl}
                    name={flow.name}
                    description={flow.description}
                    tags={flow.tags}
                    onClick={() => handleClick(flow)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-400">
              배경 정보를 불러오는 중입니다...
            </div>
          )}
        </div>
      </div>
      {/* Pay BottomSheet */}
      <BottomSheet open={!!lockedFlow} onClose={closeSheet}>
        <BackgroundUnlockSheet
          name={lockedFlow?.title || "Unknown Background"}
          onClose={closeSheet}
          onUnlock={() => {
            closeSheet();
          }}
        />
      </BottomSheet>

      <BottomNav />
    </div>
  );
}
