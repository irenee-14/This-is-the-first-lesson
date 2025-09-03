import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FloatingButton from "@/components/features/FloatingButton";
import Chip from "@/components/ui/Chip";
import CharacterDetailTabs from "@/components/features/characterTab/CharacterDetailTabs";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import { ReactComponent as ChatIcon } from "@/assets/icons/Chat.svg";

const mockCharacter = {
  likeCount: 24,
  chatCount: 24,
};

const getImageUrl = (dbPath: string) =>
  new URL(`../assets/images/${dbPath}`, import.meta.url).href;

export default function CharacterDetail() {
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
    data: flowData,
    loading: flowLoading,
    error: flowError,
    get: getFlow,
  } = useApi<{ data: import("@/types/story").Flow[] }>();

  const {
    data: chatListData,
    loading: chatListLoading,
    error: chatListError,
    get: getChatList,
  } = useApi<{
    success: boolean;
    data: {
      chats: import("@/types/chat").ChatSummary[];
      total: number;
      page: number;
      limit: number;
    };
  }>();

  // 캐릭터 데이터 로딩
  useEffect(() => {
    if (charId) {
      getCharacter(`/characters/${charId}`);
    }
  }, [charId, getCharacter]);

  // 채팅 목록 로딩
  useEffect(() => {
    if (charId) {
      getChatList(`/chats?characterId=${charId}`);
    }
  }, [charId, getChatList]);

  // Flow 데이터 로딩 - characterData가 로딩된 후에 실행
  useEffect(() => {
    if (charId && characterData?.data?.writerId) {
      const writerId = characterData.data.writerId;
      getFlow(
        `/users/flows-with-opened?writerId=${writerId}&characterId=${charId}`
      );
    }
  }, [charId, characterData, getFlow]);

  if (characterLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div>로딩 중...</div>
        <BottomNav />
      </div>
    );
  }

  if (characterError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div>오류가 발생했습니다: {characterError}</div>
        <BottomNav />
      </div>
    );
  }

  const character = characterData?.data;
  if (!character) {
    return <div>캐릭터 정보를 불러올 수 없습니다.</div>;
  }

  // -------------------------------------------------------
  // 채팅 데이터에서 실제 채팅 개수 계산
  const chatCount = chatListData?.data?.chats?.length || 0;
  const hasChatHistory = chatCount > 0;

  // -------------------------------------------------------

  const handleChatClick = () => {
    if (hasChatHistory && chatCount > 0) {
      navigate(
        `/stories?writerId=${characterData?.data?.writerId}&characterId=${charId}`
      );
    } else {
      const firstStory = flowData?.data?.[0];
      if (firstStory) {
        navigate(`/story/${firstStory.id}`);
      } else {
        navigate(`/characters`);
      }
    }
  };

  const handleStoryClick = (storyId: string) => {
    navigate(`/personas/${storyId}`);
  };
  const handleBeforeChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
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
          flow={flowData?.data ?? []}
          hasChatHistory={hasChatHistory}
          chatList={chatListData?.data?.chats ?? []}
          onStoryClick={handleStoryClick}
          onChatClick={handleBeforeChatClick}
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
