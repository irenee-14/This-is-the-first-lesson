import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import BottomSheet from "@/components/ui/BottomSheet";
import FloatingButton from "@/components/features/FloatingButton";
import Chip from "@/components/ui/Chip";
import { BackgroundUnlockSheet } from "@/components/features/BackgroundUnlockSheet";
import { useBackgroundUnlock } from "@/hooks/useBackgroundUnlock";
import { ReactComponent as LikeIcon } from "@/assets/icons/Like.svg";
import { ReactComponent as ChatIcon } from "@/assets/icons/Chat.svg";
import CharacterDetailTabs from "@/components/features/characterTab/DetailTab";

const mockCharacter = {
  likeCount: 24,
  chatCount: 24,
};

const getImageUrl = (dbPath: string) =>
  new URL(`../assets/images/${dbPath}`, import.meta.url).href;

export default function CharacterDetail() {
  const navigate = useNavigate();
  const { charId } = useParams();
  const { handleClick, lockedFlow, closeSheet, unlockBackground } =
    useBackgroundUnlock();

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

  const reloadFlowData = () => {
    if (charId && characterData?.data?.writerId) {
      const writerId = characterData.data.writerId;
      getFlow(
        `/users/flows-with-opened?writerId=${writerId}&characterId=${charId}`
      );
    }
  };

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

  // Flow 데이터 로딩 - characterData 변경 시 실행
  useEffect(() => {
    reloadFlowData();
  }, [getFlow, charId, characterData]);

  const handleUnlockSuccessCallback = () => {
    unlockBackground(() => {
      reloadFlowData();
    });
  };

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

  // 채팅 데이터에서 실제 채팅 개수 계산
  const chatCount = chatListData?.data?.chats?.length || 0;
  const hasChatHistory = chatCount > 0;

  const handleChatClick = () => {
    if (hasChatHistory) {
      navigate(`/stories?writerId=${character.writerId}&characterId=${charId}`);
    } else {
      const firstStory = flowData?.data?.[0];
      navigate(firstStory ? `/story/${firstStory.id}` : `/characters`);
    }
  };

  const handleStoryClick = (storyId: string) => {
    navigate(`/personas/${storyId}`);
  };

  const handleFlowClick = (flow: import("@/types/story").Flow) => {
    handleClick(flow);
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
          flow={flowData?.data ?? []}
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

      {/* Background Unlock BottomSheet */}
      <BottomSheet open={!!lockedFlow} onClose={closeSheet}>
        {lockedFlow && (
          <BackgroundUnlockSheet
            name={lockedFlow.title || "Unknown Background"}
            backgroundId={lockedFlow.id || ""}
            onClose={closeSheet}
            onUnlockSuccess={handleUnlockSuccessCallback}
          />
        )}
      </BottomSheet>

      <BottomNav />
    </div>
  );
}
