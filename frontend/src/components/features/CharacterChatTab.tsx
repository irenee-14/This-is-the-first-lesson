import CardMediaLeft from "./CardMediaLeft";
import type { Character } from "@/types/character";
import type { ChatSummary } from "@/types/chat";

interface CharacterChatTabProps {
  character: Character;
  hasChatHistory?: boolean;
  chatList: ChatSummary[];
  onChatClick: (chatId: string) => void;
}

export default function CharacterChatTab({
  character,
  hasChatHistory,
  chatList,
  onChatClick,
}: CharacterChatTabProps) {
  return (
    <div>
      {hasChatHistory || (chatList && chatList.length > 0) ? (
        <div className="flex flex-col gap-4">
          {chatList.map((chat: ChatSummary) => (
            <CardMediaLeft
              key={chat.chatId}
              imageUrl="src/assets/images/characters/character_1.png"
              name={chat.backgroundName}
              description={chat.lastMessage || "채팅 기록이 없습니다"}
              onClick={() => onChatClick(chat.chatId)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center p-10">
          <p className="text-gray-400">
            아직 {character.name}와 채팅하지 않았어요.
          </p>
        </div>
      )}
    </div>
  );
}
