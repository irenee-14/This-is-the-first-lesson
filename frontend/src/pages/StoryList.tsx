import CardMediaLeft from "@/components/features/card/CardMediaLeft";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import { useSearchParams } from "react-router-dom";
import {
  BackgroundUnlockProvider,
  useBackgroundUnlockHandler,
} from "@/components/features/BackgroundUnlockProvider";

import { useFlowManager } from "@/hooks/useFlowManager";
import { useMemo } from "react";

function StoryListContent() {
  const [searchParams] = useSearchParams();
  const writerId = searchParams.get("writerId");
  const characterId = searchParams.get("characterId");

  const { flows, updateFlowItem } = useFlowManager({
    writerId: writerId || undefined,
    characterId: characterId || undefined,
    autoLoad: true,
  });

  const handleClick = useBackgroundUnlockHandler();

  const flowsMemo = useMemo(() => flows, [flows]);

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
          {flowsMemo.length > 0 ? (
            <>
              <div
                className={
                  "self-stretch inline-flex flex-col justify-start items-start gap-4 scrollbar-hide"
                }
              >
                {flowsMemo.map((flow, index) => (
                  <CardMediaLeft
                    key={flow.id || index}
                    isOpen={flow.isOpen}
                    imageUrl={
                      flow.imgUrl || "src/assets/images/backgrounds/library.png"
                    }
                    name={flow.title || "Unknown Background"}
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

      <BottomNav />
    </div>
  );
}

export default function Stories() {
  const [searchParams] = useSearchParams();
  const writerId = searchParams.get("writerId");
  const characterId = searchParams.get("characterId");

  const { updateFlowItem } = useFlowManager({
    writerId: writerId || undefined,
    characterId: characterId || undefined,
    autoLoad: false, // Provider에서 처리하므로 자동 로드 비활성화
  });

  const handleUnlockSuccess = (flowId: string) => {
    updateFlowItem(flowId, { isOpen: true });
  };

  return (
    <BackgroundUnlockProvider onUnlockSuccess={handleUnlockSuccess}>
      <StoryListContent />
    </BackgroundUnlockProvider>
  );
}
