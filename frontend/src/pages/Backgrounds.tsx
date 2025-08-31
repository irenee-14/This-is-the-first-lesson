import CardListColumn from "@/components/features/CardListColumn";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import { useApi } from "@/hooks/useApi";
import { useFlowStore } from "@/stores/useFlowStore";
import { useUserStore } from "@/stores/useUserStore";
import type { BackgroundListResponse } from "@/types/background";

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
  const { writerId } = useFlowStore();
  const { userId } = useUserStore();

  useEffect(() => {
    if (userId && writerId) {
      get(`/users/${userId}/background-flows-with-opened?writerId=${writerId}`);
    }
  }, [get, userId, writerId]);

  const flows = backgroundsData?.data?.flows || [];
  const steps = flows.length > 0 ? flows[0].steps : [];

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
          {steps.length > 0 ? (
            <CardListColumn
              cards={steps.map((step) => ({
                id: step.backgroundId,
                name: step.backgroundName,
                imageUrl: step.backgroundImg || "/image/icon.png",
                description: step.backgroundDescription || "설명이 없습니다.",
                tags: step.tags && step.tags.length > 0 ? step.tags : ["배경"],
                isOpen: step.isOpened,
              }))}
              onCardClick={(card) => {
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

      <BottomNav />
    </div>
  );
};

export default Backgrounds;
