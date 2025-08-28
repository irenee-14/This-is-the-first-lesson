import CardListColumn from "@/components/features/CardListColumn";
import FloatingButton from "@/components/features/FloatingButton";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";

import React from "react";
import { useNavigate } from "react-router-dom";
import type { getNameOfDeclaration } from "typescript";

const mockBackgrounds = [
  {
    id: "1",
    name: "동탄고등학교",
    imageurl: "/image/icon.png",
    tags: ["첫사랑", "짝궁"],
  },
  {
    id: "2",
    getNameOfDeclaration: "동탄고등학교",
    imageurl: "/image/icon.png",
    tags: ["첫사랑", "짝궁"],
  },
];

const Backgrounds: React.FC = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    console.log("Chat with character clicked!");

    navigate(`/personas`);
  };

  const handleInputSubmit = (value: string) => {
    console.log("Message submitted:", value);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header variant="withText" title="배경 선택하기" />

      {/* Main Content */}
      <div className="pt-14 pb-36">
        {/* Character Section */}
        <div className="relative p-4 flex flex-col gap-4">
          {/* notification */}
          <div className="w-full bg-gray-900 self-stretch px-3 py-1.5 rounded inline-flex items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-sm font-medium">🔒</span>
            </div>
            <div className="text-gray-200 text-sm font-normal leading-tight">
              호감도를 쌓으면 새로운 배경을 볼 수 있어요
            </div>
          </div>

          {/* Background List */}
          {mockBackgrounds && (
            <CardListColumn
              cards={mockBackgrounds}
              onCardClick={(card, index) => {
                console.log(
                  `CardListRow clicked: ${card.name} at index ${index}`
                );
                navigate(`/backgrounds/${card.id}`);
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Backgrounds;
