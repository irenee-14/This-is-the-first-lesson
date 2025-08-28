import CardListColumn from "@/components/features/CardListColumn";
import CardMediaLeft from "@/components/features/CardMediaLeft";
import FloatingButton from "@/components/features/FloatingButton";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";

import React from "react";
import { useNavigate } from "react-router-dom";

const mockStory = {
  character: {
    id: "1",
    name: "반지호",
    imageurl: "/image/icon.png",
    tags: ["다정", "능글"],
  },

  background: {
    id: "2",
    name: "동탄고등학교",
    imageUrl: "/image/icon.png",
    tags: ["첫사랑", "짝궁"],
  },

  opening: {
    id: "3",
    name: "동탄고등학교",
    description:
      "푸른 산 한나절 구름은 가고 고을 너머 뻐꾸기는 우는데 눈에 어려 흘러가는 물결 같은 사람 속 아우성쳐 흘러가는 물결 같은 사람 속에 난 그리노라. 달 가고 밤 가고 눈물도 가고 틔어 올 밝은 하늘 빛난 아침 이르면 향기로운 이슬밭 푸른 언덕을 총총총 달려도 와 줄 볼이 고운 나의 사람. 네 가슴 향기로운 풀밭에 엎드리면 나는 가슴이 울어라. 푸른 산 한나절 구름은 가고 고을 너머 뻐꾸기는 우는데 눈에 어려 흘러가는 물결 같은 사람 속 아우성쳐 흘러가는 물결 같은 사람 속에 난 그리노라.푸른 산 한나절 구름은 가고 고을 너머 뻐꾸기는 우는데 눈에 어려 흘러가는 물결 같은 사람 속 아우성쳐 흘러가는 물결 같은 사람 속에 난 그리노라. ",
  },
};

const Backgrounds: React.FC = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    console.log("Chat with character clicked!");

    navigate(`/chat`);
  };

  const handleInputSubmit = (value: string) => {
    console.log("Message submitted:", value);
  };

  function onCardClick(background: {
    id: string;
    name: string;
    imageUrl: string;
    tags: string[];
  }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header
        variant="withText"
        title={`${mockStory.character.name}와 대화하기`}
      />

      {/* Main Content */}
      <div className="pt-14 pb-36">
        {/* Character Section */}
        <div className="relative p-4 flex flex-col gap-4">
          <CardMediaLeft
            key={mockStory.character.id}
            imageUrl={mockStory.character.imageurl}
            name={mockStory.character.name}
            tags={mockStory.character.tags}
          />

          <CardMediaLeft
            key={mockStory.background.id}
            imageUrl={mockStory.background.imageUrl}
            name={mockStory.background.name}
            tags={mockStory.background.tags}
            onClick={
              onCardClick ? () => onCardClick(mockStory.background) : undefined
            }
          />
          <div className="self-stretch justify-start text-sm font-normal">
            {mockStory.opening.description}
          </div>
        </div>
      </div>

      <FloatingButton buttonlabel="채팅 시작" onChatClick={handleChatClick} />
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Backgrounds;
