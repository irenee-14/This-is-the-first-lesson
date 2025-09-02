import type {
  Message,
  ChatDetail,
  ApiResponse,
  MessageListResponse,
  SendMessageResponse,
} from "@/types/chat";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApi } from "./useApi";

export function useChat(chatId: string) {
  const { get, post, loading: apiLoading } = useApi();

  const [chatDetail, setChatDetail] = useState<ChatDetail | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [nextBefore, setNextBefore] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false); // 👈 추가

  // 채팅 상세 정보 로드
  const loadChatDetail = useCallback(async () => {
    try {
      const response = (await get(
        `/chats/${chatId}`
      )) as ApiResponse<ChatDetail>;
      if (response.success && response.data) {
        setChatDetail(response.data);
      }
    } catch (error) {
      console.error("채팅 상세 정보 로드 실패:", error);
    }
  }, [chatId, get]);

  // 메시지 목록 로드 (무한스크롤용)
  const loadMessages = useCallback(
    async (before?: number) => {
      if (isLoadingMessages || (!hasMore && before !== undefined)) return;

      setIsLoadingMessages(true);

      try {
        const query = before ? `?before=${before}&limit=20` : "?limit=20";
        const response = (await get(
          `/chats/${chatId}/messages${query}`
        )) as ApiResponse<MessageListResponse>;

        if (response.success && response.data) {
          const { messages: newMsgs, nextBefore: nb, hasNext } = response.data;

          // 최상단으로 prepend
          if (before === undefined) setMessages(newMsgs.reverse());
          else setMessages((prev) => [...newMsgs.reverse(), ...prev]);

          setNextBefore(nb);
          setHasMore(Boolean(hasNext));

          // 디버깅용: 실제 응답 기준으로 로깅 (중복호출 혼동 줄이기)
          console.log("메시지 불러오기 params:", {
            chatId,
            beforeUsed: before,
            nextBeforeFromServer: nb,
            hasNext,
          });
        }
      } catch (error) {
        console.error("메시지 불러오기 실패:", error);
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [chatId, get, isLoadingMessages, hasMore]
  );

  // 이전 메시지 더 불러오기 (무한스크롤)
  const loadMoreMessages = useCallback(() => {
    if (nextBefore !== undefined) loadMessages(nextBefore);
    else if (hasMore) loadMessages(); // fallback: before 없는 초기 호출
  }, [loadMessages, nextBefore, hasMore]);

  const didInitRef = useRef(false);
  useEffect(() => {
    if (!chatId) return;
    if (didInitRef.current) return;
    didInitRef.current = true;

    loadChatDetail();
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  // 새 메시지 전송 + 상대방 타이핑 표시
  const sendMessage = useCallback(
    async (content: string) => {
      if (isSending || !content.trim()) return;

      setIsSending(true);

      const tempUserMessage: Message = {
        chatId,
        seq: messages.length,
        backgroundId: chatDetail?.background.backgroundId || "",
        characterId: chatDetail?.character.characterId || "",
        role: "persona",
        contents: content.trim(),
        createdAt: new Date().toISOString(),
      };

      // 사용자 메시지를 즉시 UI에 추가 + AI 타이핑 표시 ON
      setMessages((prev) => [...prev, tempUserMessage]);
      setIsAiTyping(true);

      try {
        const response = (await post(`/chats/${chatId}/messages`, {
          contents: content.trim(),
        })) as ApiResponse<SendMessageResponse>;

        if (response.success && response.data) {
          const { userMessage, aiMessage } = response.data;

          // 임시 유저 메시지를 실제 유저/AI 메시지로 치환
          setMessages((prev) => [
            ...prev.slice(0, -1), // 임시 유저 메시지 제거
            userMessage,
            aiMessage,
          ]);
        }
      } catch (error) {
        console.error("메시지 전송 실패:", error);
        // 실패 시 임시 유저 메시지 제거
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsAiTyping(false);
        setIsSending(false);
      }
    },
    [chatId, post, isSending, messages.length, chatDetail]
  );

  return {
    chatDetail,
    messages,
    hasMore,
    isLoadingMessages,
    loadMoreMessages,
    sendMessage,
    isSending,
    isAiTyping,
    loading: apiLoading,
  };
}
