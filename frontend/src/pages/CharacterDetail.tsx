import { useEffect, useMemo, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FloatingButton from "@/components/features/FloatingButton";
import Chip from "@/components/ui/Chip";
import {
  BackgroundUnlockProvider,
  useBackgroundUnlockHandler,
} from "@/components/features/BackgroundUnlockProvider";
import { useFlowManager } from "@/hooks/useFlowManager";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import { ReactComponent as ChatIcon } from "@/assets/icons/Chat.svg";
import CharacterDetailTabs from "@/components/features/characterTab/DetailTab";
import type { Flow } from "@/types/story";

const mockCharacter = {
  likeCount: 24,
  chatCount: 24,
};

const getImageUrl = (dbPath: string) =>
  new URL(`../assets/images/${dbPath}`, import.meta.url).href;

function CharacterDetailContent() {
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

  const { data: chatListData, get: getChatList } = useApi<{
    success: boolean;
    data: {
      chats: import("@/types/chat").ChatSummary[];
      total: number;
      page: number;
      limit: number;
    };
  }>();

  const { flows } = useFlowManager({
    writerId: characterData?.data?.writerId,
    characterId: charId,
    autoLoad: !!characterData?.data?.writerId && !!charId,
  });

  const handleClick = useBackgroundUnlockHandler();

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

  // 채팅 데이터에서 실제 채팅 개수 계산
  const chatCount = useMemo(
    () => chatListData?.data?.chats?.length || 0,
    [chatListData?.data?.chats?.length]
  );
  const hasChatHistory = chatCount > 0;

  const character = characterData?.data;

  const handleChatClick = useCallback(() => {
    if (hasChatHistory && character) {
      navigate(`/stories?writerId=${character.writerId}&characterId=${charId}`);
    } else {
      const firstStory = flows[0];
      navigate(firstStory ? `/story/${firstStory.id}` : `/characters`);
    }
  }, [hasChatHistory, character?.writerId, charId, flows, navigate]);

  const handleStoryClick = useCallback(
    (storyId: string) => {
      navigate(`/personas/${storyId}`);
    },
    [navigate]
  );

  const handleFlowClick = useCallback(
    (flow: Flow) => {
      handleClick(flow);
    },
    [handleClick]
  );

  const handleBeforeChatClick = useCallback(
    (chatId: string) => {
      navigate(`/chat/${chatId}`);
    },
    [navigate]
  );

  const onLikeClick = useCallback((): void => {
    console.log("Like button clicked!");
  }, []);

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

  if (!character) {
    return <div>캐릭터 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen">
      <Header variant="withText" title={character.name} />
      <div className="pt-14 pb-20">
        {/* 캐릭터 이미지 */}
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

          {/* 캐릭터 정보 */}
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

        {/* 캐릭터 상세 탭 */}
        <CharacterDetailTabs
          character={character}
          flow={flows}
          hasChatHistory={hasChatHistory}
          chatList={chatListData?.data?.chats ?? []}
          onStoryClick={handleStoryClick}
          onChatClick={handleBeforeChatClick}
          onFlowClick={handleFlowClick}
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

export default function CharacterDetail() {
  const { charId } = useParams();
  const { data: characterData } = useApi<{
    success: boolean;
    data: import("@/types/character").Character;
  }>();

  const { updateFlowItem } = useFlowManager({
    writerId: characterData?.data?.writerId,
    characterId: charId,
    autoLoad: false, // Provider에서 처리하므로 자동 로드 비활성화
  });

  const handleUnlockSuccess = (flowId: string) => {
    updateFlowItem(flowId, { isOpen: true });
  };

  return (
    <BackgroundUnlockProvider onUnlockSuccess={handleUnlockSuccess}>
      <CharacterDetailContent />
    </BackgroundUnlockProvider>
  );
}
