import { useCallback, useEffect, useState } from "react";
import { useApi } from "./useApi";
import type { ChatSummary } from "@/types/chat";

export function useChatList() {
  const { get, loading: apiLoading } = useApi();
  const [chatList, setChatList] = useState<ChatSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const loadChatList = useCallback(
    async (pageNum: number = 1) => {
      try {
        const response = (await get(
          `/chats?page=${pageNum}&limit=${limit}`
        )) as {
          success: boolean;
          data?: {
            chats: ChatSummary[];
            total: number;
            page: number;
          };
        };

        if (response.success && response.data) {
          const { chats, total: totalCount, page: currentPage } = response.data;

          if (pageNum === 1) {
            setChatList(chats);
          } else {
            setChatList((prev) => [...prev, ...chats]);
          }

          setTotal(totalCount);
          setPage(currentPage);
          setHasMore(chats.length === limit);
        }
      } catch (error) {
        console.error("채팅 목록 로드 실패:", error);
      }
    },
    [get, limit]
  );

  const loadMore = useCallback(() => {
    if (hasMore && !apiLoading) {
      loadChatList(page + 1);
    }
  }, [hasMore, apiLoading, loadChatList, page]);

  useEffect(() => {
    loadChatList(1);
  }, [loadChatList]);

  return {
    chatList,
    total,
    page,
    hasMore,
    loading: apiLoading,
    loadMore,
    refresh: () => loadChatList(1),
  };
}
