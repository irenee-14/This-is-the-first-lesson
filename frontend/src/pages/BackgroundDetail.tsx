import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import Chip from "@/components/ui/Chip";
import FloatingButton from "@/components/features/FloatingButton";
import { useFlowStore } from "@/stores/useFlowStore";
import { useApi } from "@/hooks/useApi";
import type { BackgroundDetailResponse } from "@/types/background";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BackgroundDetail: React.FC = () => {
  const navigate = useNavigate();
  const { bgId } = useParams();
  const { setBackground } = useFlowStore();
  const {
    data: backgroundData,
    loading,
    error,
    get,
  } = useApi<BackgroundDetailResponse>();

  useEffect(() => {
    if (bgId) {
      get(`/backgrounds/${bgId}`);
    }
  }, [bgId, get]);

  const background = backgroundData?.data;

  const handleChatClick = () => {
    if (background) {
      setBackground(background.backgroundId);
      navigate(`/personas`);
    }
  };

  const handleInputSubmit = (value: string) => {
    // console.log("Message submitted:", value);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header variant="withText" title="배경 정보" />
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
        <Header variant="withText" title="배경 정보" />
        <div className="pt-14 pb-36 flex items-center justify-center">
          <div>오류가 발생했습니다: {error}</div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!background) {
    return (
      <div className="min-h-screen">
        <Header variant="withText" title="배경 정보" />
        <div className="pt-14 pb-36 flex items-center justify-center">
          <div>배경을 찾을 수 없습니다.</div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header variant="withText" title={background.backgroundName} />

      <div className="pt-14 pb-36">
        {/* Background Section */}
        <div className="relative flex flex-col p-4 gap-3">
          {/* Background Image */}
          <div className="relative w-full h-90">
            <div className="w-full h-90 bg-gradient-to-b from-purple-600 via-purple-500 to-indigoGray-black" />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 w-full h-90 bg-gradient-to-t from-indigoGray-black via-transparent to-transparent" />
            <img
              // src={background.backgroundImg || "/image/icon.png"}
              src="/src/assets/images/backgrounds/library.png"
              alt="Background Image"
              className="w-90 h-90 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/image/icon.png";
              }}
            />
          </div>

          {/* Background Info */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-White-Font ">
              {background.backgroundName}
            </h1>
            <div className="flex gap-1 flex-wrap">
              {background.tags.length > 0 ? (
                background.tags.map((tag, index) => (
                  <Chip key={index} size="m">
                    {tag}
                  </Chip>
                ))
              ) : (
                <Chip size="m">배경</Chip>
              )}
            </div>
          </div>
          {/* Background Description */}
          <div>
            <p className="text-sm font-normal leading-tight">
              {background.description}
            </p>
          </div>
        </div>
      </div>

      <FloatingButton
        variant="chat"
        buttonlabel="다음"
        onChatClick={handleChatClick}
        onInputSubmit={handleInputSubmit}
      />
      <BottomNav />
    </div>
  );
};

export default BackgroundDetail;
