import CardMediaLeft from "./CardMediaLeft";
import type { Character } from "@/types/character";
import type { Background } from "@/types/background";
import type { ChatSummary } from "@/types/chat";

interface CharacterChatTabProps {
  character: Character;
  hasChatHistory: boolean;
  chatList: ChatSummary[];
  onBackgroundClick: (backgroundId: string) => void;
}

export default function CharacterChatTab({
  character,
  hasChatHistory,
  chatList,
  onBackgroundClick,
}: CharacterChatTabProps) {
  return (
    <div>
      {hasChatHistory && chatList.length > 0 ? (
        <div className="flex flex-col gap-4">
          {chatList.map((chatList: ChatSummary) => (
            <CardMediaLeft
              key={chatList.id}
              imageUrl="src/assets/images/characters/character_1.png"
              name={chatList.backgroundName}
              description={chatList.lastMessage}
              onClick={() => onBackgroundClick(chatList.id)}
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
