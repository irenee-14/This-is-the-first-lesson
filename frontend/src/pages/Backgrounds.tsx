import CardListColumn from "@/components/features/CardListColumn";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import { useApi } from "@/hooks/useApi";
import type { BackgroundListResponse, Background } from "@/types/background";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Backgrounds: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: backgroundsData,
    loading,
    error,
    get,
  } = useApi<BackgroundListResponse>();

  useEffect(() => {
    get("/backgrounds");
  }, [get]);

  // API에서 받아온 배경 데이터를 CardListColumn에 맞는 형태로 변환
  const transformBackgroundData = (background: Background) => ({
    id: background.backgroundId,
    name: background.backgroundName,
    imageUrl: background.backgroundImg || "/image/icon.png",
    description: background.description,
    tags:
      background.tags && background.tags.length > 0
        ? background.tags
        : ["배경"],
  });

  const backgrounds = backgroundsData?.data?.backgrounds || [];
  // 로딩 중이거나 에러가 있을 때 처리
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
      {/* Header */}
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
          {backgrounds.length > 0 ? (
            <CardListColumn
              cards={backgrounds.map((bg, idx) => ({
                ...transformBackgroundData(bg),
                isOpen: idx < 2,
              }))}
              onCardClick={(card, index) => {
                console.log(
                  `CardListRow clicked: ${card.name} at index ${index}`
                );
                navigate(`/backgrounds/${card.id}`);
              }}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              배경이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Backgrounds;
