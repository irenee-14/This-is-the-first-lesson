import CardMediaLeft from "@/components/features/CardMediaLeft";
import FloatingButton from "@/components/features/FloatingButton";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";
import { useFlowStore } from "@/stores/useFlowStore";
import { useApi } from "@/hooks/useApi";
import React, { useEffect } from "react";
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
const getImageUrl = (dbPath: string) =>
  new URL(`../assets/images/${dbPath}`, import.meta.url).href;

const Story: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCharacterId, selectedBackgroundId } = useFlowStore();
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
    data: backgroundData,
    loading: backgroundLoading,
    error: backgroundError,
    get: getBackground,
  } = useApi<{
    success: boolean;
    data: import("@/types/background").Background;
  }>();

  useEffect(() => {
    if (selectedCharacterId) {
      getCharacter(`/characters/${selectedCharacterId}`);
    }
    if (selectedBackgroundId) {
      getBackground(`/backgrounds/${selectedBackgroundId}`);
    }
  }, [selectedCharacterId, selectedBackgroundId, getCharacter, getBackground]);

  const handleChatClick = () => {
    navigate(`/chat`, { state: { character } });
  };

  if (characterLoading || backgroundLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );
  }
  if (characterError || backgroundError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        오류가 발생했습니다.
      </div>
    );
  }

  const character = characterData?.data;
  const background = backgroundData?.data;

  return (
    <div className="min-h-screen">
      <Header
        variant="withText"
        title={character ? `${character.name}와 대화하기` : "캐릭터와 대화하기"}
      />
      <div className="pt-14 pb-36">
        <div className="relative p-4 flex flex-col gap-4">
          {character && (
            <CardMediaLeft
              key={character.characterId}
              imageUrl={getImageUrl(character.characterImg)}
              name={character.name}
              tags={character.tags}
            />
          )}
          {background && (
            <CardMediaLeft
              key={background.backgroundId}
              imageUrl="src/assets/images/backgrounds/library.png"
              name={background.backgroundName}
              tags={background.tags}
            />
          )}
          <div className="self-stretch justify-start text-sm font-normal leading-tight">
            {mockStory.opening.description}
          </div>
        </div>
      </div>
      <FloatingButton buttonlabel="채팅 시작" onChatClick={handleChatClick} />
      <BottomNav />
    </div>
  );
};

export default Story;
