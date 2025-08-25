import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import Chip from "@/components/ui/Chip";
import FloatingButton from "@/components/features/FloatingButton";
import { useFlowStore } from "@/stores/useFlowStore";
import React from "react";
import { useNavigate } from "react-router-dom";

const mockBackground = {
  id: "1",
  title: "동탄고등학교",
  image: "/image/icon.png",
  tags: ["첫사랑", "짝궁"],
  isLocked: false,
  description:
    "푸른 산 한나절 구름은 가고 고을 너머 뻐꾸기는 우는데 눈에 어려 흘러가는 물결 같은 사람 속 아우성쳐 흘러가는 물결 같은 사람 속에 난 그리노라. 달 가고 밤 가고 눈물도 가고 틔어 올 밝은 하늘 빛난 아침 이르면 향기로운 이슬밭 푸른 언덕을 총총총 달려도 와 줄 볼이 고운 나의 사람. 네 가슴 향기로운 풀밭에 엎드리면 나는 가슴이 울어라.푸른 산 한나절 구름은 가고 고을 너머 뻐꾸기는 우는데 눈에 어려 흘러가는 물결 같은 사람 속 아우성쳐 흘러가는 물결 같은 사람 속에 난 그리노라. 달 가고 밤 가고 눈물도 가고 틔어 올 밝은 하늘 빛난 아침 이르면 향기로운 이슬밭 푸른 언덕을 총총총 달려도 와 줄 볼이 고운 나의 사람. 네 가슴 향기로운 풀밭에 엎드리면 나는 가슴이 울어라.",
};

const BackgroundDetail: React.FC = () => {
  const navigate = useNavigate();
  const { setBackground } = useFlowStore();

  const handleChatClick = () => {
    console.log("Chat with character clicked!");
    setBackground(mockBackground.id);
    navigate(`/personas`);
  };

  const handleInputSubmit = (value: string) => {
    console.log("Message submitted:", value);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header variant="withText" title={mockBackground.title} />

      {/* Main Content */}
      <div className="pt-14 pb-36">
        {/* Character Section */}
        <div className="relative">
          {/* Character Image */}
          <div className="relative w-full h-90">
            <div className="w-full h-90 bg-gradient-to-b from-purple-600 via-purple-500 to-indigoGray-black" />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 w-full h-90 bg-gradient-to-t from-indigoGray-black via-transparent to-transparent" />
            <img
              src={mockBackground.image}
              alt="Background Image"
              className="w-full h-90 object-cover"
            />
          </div>

          {/* Character Info */}
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold text-White-Font mb-3">
              {mockBackground.title}
            </h1>
            <div className="flex gap-2 flex-wrap">
              {mockBackground.tags.map((tag, index) => (
                <Chip key={index} size="m">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          {/* Character Description */}
          <div className="px-4 py-4">
            <p className="text-sm font-normal ">{mockBackground.description}</p>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <FloatingButton
        variant="chat"
        onChatClick={handleChatClick}
        onInputSubmit={handleInputSubmit}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default BackgroundDetail;
