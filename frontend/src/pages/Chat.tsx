import React, { useCallback, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import OtherMessage from "@/components/features/message/OtherMessage";
import MyMessage from "@/components/features/message/MyMessage";
import FloatingInputButton from "@/components/features/FloatingInputButton";
import { useParams } from "react-router-dom";
import { useChat } from "@/hooks/useChat";
import { useTopSentinelObserver } from "@/hooks/useTopSentinelObserver";
import { getImageUrl } from "@/utils/imageUtils";

const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const {
    chatDetail,
    messages,
    hasMore,
    isLoadingMessages,
    loadMoreMessages,
    sendMessage,
    isSending,
    isAiTyping,
  } = useChat(chatId || "");

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // DOM 렌더가 끝난 다음 프레임에 실행
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // messages가 바뀔 때 실행

  // 상단 도달 시 이전 메시지 불러오기 (IntersectionObserver가 더 안정적)
  const handleLoadMore = useCallback(async () => {
    if (!isLoadingMessages && hasMore && containerRef.current) {
      const container = containerRef.current;
      const prevScrollTop = container.scrollTop;
      const prevScrollHeight = container.scrollHeight;

      await loadMoreMessages();

      // 이전 메시지 prepend 후 스크롤 위치 유지
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const now = containerRef.current;
        const newScrollHeight = now.scrollHeight;
        now.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop;
      });
    }
  }, [isLoadingMessages, hasMore, loadMoreMessages]);

  useTopSentinelObserver({
    containerRef,
    topSentinelRef,
    handleLoadMore,
  });

  // 메시지/타이핑 상태 변경 시 하단으로 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isAiTyping]);

  const handleInputSubmit = (value: string) => {
    if (!value.trim() || isSending) return;
    sendMessage(value);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (container.scrollTop < 50) {
        handleLoadMore();
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [handleLoadMore]);

  if (!chatId) return <div>잘못된 접근입니다.</div>;

  return (
    <div className="h-svh bg-[#12121d] text-white flex flex-col min-h-0">
      <Header variant="withText" title={chatDetail?.character.name || "채팅"} />

      {/* 스크롤 영역은 반드시 min-h-0 부모 안에서 overflow-y-auto */}
      <div className="flex-1 min-h-0 pb-6">
        <div
          className="h-full overflow-y-auto px-4 pt-14 pb-24 scrollbar-hide"
          data-chat-container
          ref={containerRef}
        >
          {/* 상단 감지용 센티넬 */}
          <div ref={topSentinelRef} className="h-1" />

          {isLoadingMessages && (
            <div className="flex justify-center py-4 text-gray-400">
              채팅을 불러오는 중...
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message, index) => {
              const key = `temp-${message.chatId}-${
                message.seq
              }-${Date.now()}-${Math.random()}`;
              const isLastMessage =
                index === messages.length - 1 && message.role === "character";

              return message.role === "character" ? (
                <div key={key} className="flex justify-start">
                  <OtherMessage
                    content={message.contents}
                    characterName={chatDetail?.character.name || "캐릭터"}
                    profileImage={getImageUrl(
                      chatDetail?.character.characterImg || ""
                    )}
                    isLastMessage={isLastMessage}
                  />
                </div>
              ) : (
                <div key={key} className="flex justify-end">
                  <MyMessage content={message.contents} />
                </div>
              );
            })}

            {/* 상대방 타이핑 표시 (임시 버블) */}
            {isAiTyping && (
              <div className="flex justify-start">
                <OtherMessage
                  typing
                  content=""
                  characterName={chatDetail?.character.name || "캐릭터"}
                  profileImage={getImageUrl(
                    chatDetail?.character.characterImg || ""
                  )}
                  isLastMessage={false}
                />
              </div>
            )}
          </div>

          <div ref={messagesEndRef} />
        </div>
      </div>

      <FloatingInputButton onInputSubmit={handleInputSubmit} />
      <BottomNav />
    </div>
  );
};

export default Chat;
