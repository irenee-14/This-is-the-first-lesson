import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import FloatingButton from "@/components/features/FloatingButton";

import { useApi } from "@/hooks/useApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { StoryResponse } from "@/types/story";
import CharacterInfoSection from "@/components/features/characterTab/CharacterInfoSection";
import { getImageUrl } from "@/utils/imageUtils";

export default function StoryDetail() {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { data: storyData, loading, error, get } = useApi<StoryResponse>();

  useEffect(() => {
    if (storyId) {
      get(`/stories/${storyId}`);
    }
  }, [storyId, get]);

  const story = storyData?.data;

  const handleChatClick = () => {
    if (story) {
      navigate(`/personas/${storyId}`);
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

  if (!story) {
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
      <Header variant="withText" title="작품 확인" />

      <div className="pt-14 pb-36">
        <div className="relative flex flex-col p-4 gap-3">
          <div className="relative w-full aspect-square">
            {/* Fallback gradient  */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-purple-600 via-purple-500 to-indigoGray-black" />

            {/*  Image */}
            <img
              src={
                !Array.isArray(story) && "img" in story
                  ? getImageUrl(story.img)
                  : "/image/banner.png"
              }
              alt="Background Image"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/image/icon.png";
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-indigoGray-black via-transparent to-transparent" />
          </div>
          {/*  Info */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold text-White-Font ">
              {Array.isArray(story)
                ? "잘못된 데이터 형식입니다."
                : `${story.characterName}와 ${story.backgroundName}에서 대화하기`}
            </h1>
          </div>
          {/*  Description */}
          <div className="flex flex-col gap-4">
            <CharacterInfoSection
              content={
                !Array.isArray(story) && "opening" in story
                  ? story.characterPrompt
                  : "잘못된 데이터 형식입니다."
              }
            />
            <CharacterInfoSection
              title="도입부"
              content={
                !Array.isArray(story) && "opening" in story
                  ? story.opening
                  : "잘못된 데이터 형식입니다."
              }
            />
          </div>
        </div>
      </div>

      <FloatingButton buttonlabel="채팅 시작" onClick={handleChatClick} />
      <BottomNav />
    </div>
  );
}
