import { useChatList } from "@/hooks/useChatList";
import CardMediaLeft from "@/components/features/card/CardMediaLeft";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";

export default function ChatList() {
  const { chatList, loading, hasMore, loadMore } = useChatList();
  const navigate = useNavigate();

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 pt-16 p-4">
        <h3 className="text-2xl font-bold mb-4">채팅 목록</h3>

        {loading && chatList.length === 0 ? (
          <div className="flex justify-center p-10">
            <p className="text-gray-400">채팅 목록을 불러오는 중...</p>
          </div>
        ) : chatList.length > 0 ? (
          <div className="flex flex-col gap-4">
            {chatList.map((chat) => (
              <CardMediaLeft
                key={chat.chatId}
                imageUrl={
                  chat.characterImg ||
                  "src/assets/images/characters/character_1.png"
                }
                name={chat.storyName}
                description={chat.lastMessage || "채팅 기록이 없습니다"}
                onClick={() => handleChatClick(chat.chatId)}
              />
            ))}

            {hasMore && (
              <button
                onClick={loadMore}
                className="w-full py-3 text-center text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                더 보기
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center p-10">
            <p className="text-gray-400">아직 채팅 기록이 없어요.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </>
  );
}
