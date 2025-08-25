import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FloatingButton from "@/components/features/FloatingButton";
import Chip from "@/components/ui/Chip";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import { ReactComponent as ChatIcon } from "@/assets/icons/Chat.svg";
import { ReactComponent as LockIcon } from "@/assets/icons/Lock.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/Pen.svg";
import CardMediaTop from "@/components/features/CardMediaTop";
import { useFlowStore } from "@/stores/useFlowStore";
import { useNavigate } from "react-router-dom";

interface BackgroundCard {
  id: string;
  title: string;
  image: string;
  tags: string[];
  isLocked: boolean;
}

const mockCharacter = {
  id: "1",
  name: "반지호",
  image: "/image/icon.png", // No image for now, will use gradient background
  personality: ["다정", "능글", "고수위"],
  likeCount: 24,
  chatCount: 24,
  description: {
    appearance:
      "푸른 산 한나절 구름은 가고 고을 너머 뻐꾸기는 우는데 눈에 어려 흘러가는 물결 같은 사람 속 아우성쳐 흘러가는 물결 같은 사람 속에 난 그리노라. 달 가고 밤 가고 눈물도 가고 틔어 올 밝은 하늘 빛난 아침 이르면 향기로운 이슬밭 푸른 언덕을 총총총 달려도 와 줄 볼이 고운 나의 사람. 네 가슴 향기로운 풀밭에 엎드리면 나는 가슴이 울어라.",
    characteristics:
      "개울가에 다다르기 전에, 가을 하늘은 언제 그랬는가 싶게 구름 한 점 없이 쪽빛으로 개어 있었다. 개울가에 이르니, 며칠째 보이지 않던 소녀가 건너편 가에 앉아 물장난을 하고 있었다. 개울가에 다다르기 전에, 가을 하늘은 언제 그랬는가 싶게 구름 한 점 없이 쪽빛으로 개어 있었다. 여기서 소녀는 아래편으로 한 삼 마장쯤, 소년은 우대로 한 십 리 가까운 길을 가야 한다.",
    speech:
      "우리 아가씨가 노새 등에 실린 버들고리 사이에 의젓이 올라타고 몸소 나타난 것입니다. 갑자기 사립문이 삐꺽 열리면서 아름다운 스테파네트가 나타났습니다. 오, 고 귀여운 모습. 아무리 바라보아도 내 눈은 지칠 줄을 몰랐습니다. 흐르는 골짜기 스며드는 물소리에 내사 줄줄줄 가슴이 울어라. 달 가고 밤 가고 눈물도 가고 틔어 올 밝은 하늘 빛난 아침 이르면 향기로운 이슬밭 푸른 언덕을 총총총 달려도 와 줄 볼이 고운 나의 사람. 흐르는 골짜기 스며드는 물소리에 내사 줄줄줄 가슴이 울어라.",
  },
  comment: {
    author: "Srrrrrr",
    content:
      "우리 지호 많이 사랑해 주세요 흑흑\n보고 싶다 반지호 !!!!!!!!!!!!!!!!!!!1",
  },
};

const mockBackgrounds: BackgroundCard[] = [
  {
    id: "1",
    title: "동탄고등학교",
    image: "",
    tags: ["첫사랑", "짝궁"],
    isLocked: false,
  },
  {
    id: "2",
    title: "조선시대",
    image: "",
    tags: ["시대물", "임금", "로맨스"],
    isLocked: true,
  },
  {
    id: "3",
    title: "하숙집",
    image: "",
    tags: ["현대물", "혐관"],
    isLocked: true,
  },
  {
    id: "4",
    title: "GH컴퍼니",
    image: "",
    tags: ["회사", "상사", "짝사랑"],
    isLocked: true,
  },
  {
    id: "5",
    title: "백스테이지",
    image: "",
    tags: ["배우", "집착"],
    isLocked: true,
  },
];

export default function CharacterDetailPage() {
  const [activeTab, setActiveTab] = useState<"description" | "chat">(
    "description"
  );
  const { setCharacter } = useFlowStore();
  const navigate = useNavigate();

  const handleChatClick = () => {
    console.log("Chat with character clicked!");
    setCharacter(mockCharacter.id);
    navigate(`/backgrounds/${mockCharacter.id}`);
  };

  const handleInputSubmit = (value: string) => {
    console.log("Message submitted:", value);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header variant="withText" title={mockCharacter.name} />

      {/* Main Content */}
      <div className="pt-14 pb-20">
        {/* Character Section */}
        <div className="relative">
          {/* Character Image */}
          <div className="relative w-full h-90">
            <div className="w-full h-90 bg-gradient-to-b from-purple-600 via-purple-500 to-indigoGray-black" />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 w-full h-90 bg-gradient-to-t from-indigoGray-black via-transparent to-transparent" />
            <img
              src={mockCharacter.image}
              alt="Character Image"
              className="w-full h-90 object-cover"
            />
            {/* Stats Chips */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Chip size="l" leftIcon={<LikeIcon />}>
                {mockCharacter.likeCount}
              </Chip>
              <Chip size="l" leftIcon={<ChatIcon />}>
                {mockCharacter.chatCount}
              </Chip>
            </div>
          </div>

          {/* Character Info */}
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold text-White-Font mb-3">
              {mockCharacter.name}
            </h1>
            <div className="flex gap-2 flex-wrap">
              {mockCharacter.personality.map((trait, index) => (
                <Chip key={index} size="m">
                  {trait}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "description"
                  ? "text-White-Font border-b-2 border-primary"
                  : "text-gray-400"
              }`}
            >
              캐릭터 설명
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "chat"
                  ? "text-White-Font border-b-2 border-primary"
                  : "text-gray-400"
              }`}
            >
              이전 채팅
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-4">
          {activeTab === "description" ? (
            <div className="space-y-6">
              {/* 외모 및 성격 */}
              <div>
                <h3 className="text-base font-medium text-White-Font mb-3">
                  외모 및 성격
                </h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-White-Font leading-relaxed">
                    {mockCharacter.description.appearance}
                  </p>
                </div>
              </div>

              {/* 특징 */}
              <div>
                <h3 className="text-base font-medium text-White-Font mb-3">
                  특징
                </h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-White-Font leading-relaxed">
                    {mockCharacter.description.characteristics}
                  </p>
                </div>
              </div>

              {/* 말투 */}
              <div>
                <h3 className="text-base font-medium text-White-Font mb-3">
                  말투
                </h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-White-Font leading-relaxed">
                    {mockCharacter.description.speech}
                  </p>
                </div>
              </div>

              {/* Comment Area */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Chip
                    size="l"
                    variantStyle="outlined"
                    shape="square"
                    rightIcon={<PenIcon />}
                  >
                    {mockCharacter.comment.author}
                  </Chip>
                </div>
                <p className="text-sm text-White-Font whitespace-pre-line">
                  {mockCharacter.comment.content}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">이전 채팅 내역이 없습니다.</p>
            </div>
          )}
        </div>

        <div className="px-4 py-6 mb-10 gap-3 flex flex-col">
          <h2 className="text-lg font-semibold">볼 수 있는 배경</h2>
          <div className="overflow-x-auto flex gap-4 scrollbar-hide">
            {/* {background.isLocked && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <LockIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    )} */}
            {mockBackgrounds.map((background) => (
              <CardMediaTop
                key={background.id}
                imageUrl={background.image}
                name={background.title}
                chips={background.tags}
                onClick={() => handleBackgroundClick(background.id)}
                variant="horizontal"
              />
            ))}
          </div>
        </div>

        {/* Backgrounds Section */}
      </div>

      {/* Floating Button */}
      <FloatingButton
        variant="chat"
        like={true}
        onChatClick={handleChatClick}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
