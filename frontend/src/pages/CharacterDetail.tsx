import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FloatingButton from "@/components/features/FloatingButton";
import Chip from "@/components/ui/Chip";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import { ReactComponent as ChatIcon } from "@/assets/icons/Chat.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/Pen.svg";
import CardMediaTop from "@/components/features/CardMediaTop";
import CharacterInfoSection from "@/components/features/CharacterInfoSection";
import { useFlowStore } from "@/stores/useFlowStore";
import type { Background } from "@/types/background";

const mockCharacter = {
  likeCount: 24,
  chatCount: 24,
};

const getImageUrl = (dbPath: string) =>
  new URL(`../assets/images/${dbPath}`, import.meta.url).href;

export default function CharacterDetailPage() {
  const [activeTab, setActiveTab] = useState<"description" | "chat">(
    "description"
  );
  const { setCharacter } = useFlowStore();
  const navigate = useNavigate();
  const { charId } = useParams();
  const {
    data: characterData,
    loading: characterLoading,
    error: characterError,
    get: getCharacter,
  } = useApi<{
    success: boolean;
    data: import("@/types/character").Character;
  }>();

  const {
    data: backgroundsData,
    loading: backgroundLoading,
    error: backgroundError,
    get: getBackground,
  } = useApi<{
    success: boolean;
    data: import("@/types/background").Background;
  }>();

  useEffect(() => {
    getBackground("/backgrounds");
  }, [getBackground]);

  useEffect(() => {
    if (charId) {
      getCharacter(`/characters/${charId}`);
    }
  }, [charId, getCharacter]);

  if (characterLoading || backgroundLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div>로딩 중...</div>
        <BottomNav />
      </div>
    );
  }

  if (characterError || backgroundError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div>오류가 발생했습니다: {characterError || backgroundError}</div>
        <BottomNav />
      </div>
    );
  }

  const character = characterData?.data;
  const backgrounds = backgroundsData?.data?.backgrounds || [];

  if (!character) {
    return <div>캐릭터 정보를 불러올 수 없습니다.</div>;
  }
  if (!backgrounds) {
    return <div>배경 정보를 불러올 수 없습니다.</div>;
  }

  const handleChatClick = () => {
    setCharacter(character.characterId);
    navigate(`/backgrounds`);
  };

  const handleBackgroundClick = (backgroundId: string) => {
    navigate(`/backgrounds/${backgroundId}`);
  };

  return (
    <div className="min-h-screen">
      <Header variant="withText" title={character.name} />
      <div className="pt-14 pb-20">
        <div className="relative">
          <div className="relative w-full h-90">
            <div className="w-full h-90 bg-gradient-to-b from-purple-600 via-purple-500 to-indigoGray-black" />
            <div className="absolute inset-0 w-full h-90 bg-gradient-to-t from-indigoGray-black via-transparent to-transparent" />
            <img
              src={getImageUrl(character.characterImg) || "/image/icon.png"}
              alt="Character Image"
              className="w-full h-90 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/image/icon.png";
              }}
            />
            <div className="absolute bottom-4 left-4 flex gap-1">
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
              {character.name}
            </h1>
            <div className="flex gap-1 flex-wrap">
              {character.tags.map((tag) => (
                <Chip key={tag} size="m">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <div className="flex">
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
              className={`flex-1 py-3 text-sm font-normal transition-colors ${
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
        <div className="px-4 py-4 mb-16">
          {activeTab === "description" ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <CharacterInfoSection
                  title="외모 및 성격"
                  content={character.personality}
                />
                <CharacterInfoSection title="특징" content={character.traits} />
                <CharacterInfoSection
                  title="말투"
                  content={character.dialogueStyle}
                />
              </div>
              {/* -------------------------- */}

              {/* Comment Area */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Chip
                    size="l"
                    variantStyle="outlined"
                    shape="square"
                    rightIcon={<PenIcon className="text-safe" />}
                    className="bg-gray-900"
                  >
                    {character.writerName}
                  </Chip>
                </div>
                <p className="text-sm text-normal text-White-Font whitespace-pre-line">
                  {character.writerNote}
                </p>
              </div>

              {/* Background Area */}
              <div className="gap-3 flex flex-col">
                <h2 className="text-lg font-semibold">볼 수 있는 배경</h2>
                <div className="overflow-x-auto flex gap-4 scrollbar-hide">
                  {/* {background.isLocked && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <LockIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    )} */}
                  {/* cards={backgrounds.map(transformBackgroundData)} */}
                  {backgrounds.map((background: Background, idx: number) => {
                    return (
                      <CardMediaTop
                        key={background.backgroundId}
                        imageUrl="src/assets/images/backgrounds/library.png"
                        name={background.backgroundName}
                        chips={background.tags}
                        isOpen={idx < 2}
                        onClick={() =>
                          handleBackgroundClick(background.backgroundId)
                        }
                        variant="horizontal"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">
                아직 {character.name}와 채팅하지 않았어요.
              </p>
            </div>
          )}
        </div>
      </div>
      <FloatingButton
        variant="chat"
        like={true}
        onChatClick={handleChatClick}
      />
      <BottomNav />
    </div>
  );
}
