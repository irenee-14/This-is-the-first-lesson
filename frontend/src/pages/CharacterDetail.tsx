import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FloatingButton from "@/components/features/FloatingButton";
import Chip from "@/components/ui/Chip";
import CharacterDetailTabs from "@/components/features/CharacterDetailTabs";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import { ReactComponent as ChatIcon } from "@/assets/icons/Chat.svg";
import { useFlowStore } from "@/stores/useFlowStore";

const mockCharacter = {
  likeCount: 24,
  chatCount: 24,
};

const getImageUrl = (dbPath: string) =>
  new URL(`../assets/images/${dbPath}`, import.meta.url).href;

export default function CharacterDetailPage() {
  const { setCharacter, setWriter } = useFlowStore();
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
  } = useApi<import("@/types/background").BackgroundListResponse>();

  const {
    data: chatListData,
    loading: chatListLoading,
    error: chatListError,
    get: getChatList,
  } = useApi<{
    success: boolean;
    data: import("@/types/chat").ChatSummary[];
  }>();

  useEffect(() => {
    getBackground("/backgrounds");
  }, [getBackground]);

  useEffect(() => {
    if (charId) {
      getCharacter(`/characters/${charId}`);
    }
  }, [charId, getCharacter]);

  useEffect(() => {
    if (charId) {
      getChatList(`/chats?characterId=${charId}`);

      console.log("chatListData:", chatListData);
    }
  }, [charId, getChatList]);

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

  // -------------------------------------------------------
  const chatCount = Array.isArray(chatListData?.data)
    ? chatListData.data.length
    : 0;
  const hasChatHistory = chatCount > 0;

  // -------------------------------------------------------
  const handleChatClick = () => {
    setCharacter(character.characterId);
    setWriter(character.writerId);
    navigate(`/backgrounds`);
  };

  const handleBackgroundClick = (backgroundId: string) => {
    navigate(`/backgrounds/${backgroundId}`);
  };

  function onLikeClick(): void {
    console.log("Like button clicked!");
  }

  return (
    <div className="min-h-screen">
      <Header variant="withText" title={character.name} />
      <div className="pt-14 pb-20">
        <div className="relative">
          <div className="relative w-full h-90 aspect-square">
            <div className="w-full h-90 bg-gradient-to-b from-purple-600 via-purple-500 to-indigoGray-black" />
            <div className="absolute inset-0 w-full h-90 bg-gradient-to-t from-indigoGray-black via-transparent to-transparent" />
            <img
              src={getImageUrl(character.characterImg) || "/image/icon.png"}
              alt="Character Image"
              className="w-full h-90 object-cover aspect-square"
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

        {/* Character Detail Tabs */}
        <CharacterDetailTabs
          character={character}
          backgrounds={backgrounds}
          hasChatHistory={hasChatHistory}
          chatList={chatListData?.data ?? []}
          onBackgroundClick={handleBackgroundClick}
        />
      </div>
      <FloatingButton
        like={true}
        onLikeClick={onLikeClick}
        onClick={handleChatClick}
      />
      <BottomNav />
    </div>
  );
}
