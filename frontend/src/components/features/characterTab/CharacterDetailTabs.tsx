import { useState } from "react";
import CharacterDescriptionTab from "@/components/features/characterTab/CharacterDescriptionTab";
import CharacterChatTab from "@/components/features/characterTab/CharacterChatTab";
import type { Character } from "@/types/character";
import type { ChatSummary } from "@/types/chat";
import type { Flow } from "@/types/story";

interface CharacterDetailTabsProps {
  character: Character;
  flow: Flow[];
  hasChatHistory: boolean;
  chatList: ChatSummary[];
  onStoryClick: (storyId: string) => void;
  onChatClick: (chatId: string) => void;
}

export default function CharacterDetailTabs({
  character,
  flow,
  hasChatHistory,
  chatList,
  onStoryClick,
  onChatClick,
}: CharacterDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "chat">(
    "description"
  );

  return (
    <>
      {/* Tabs */}
      <div className="px-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "description"
                ? "text-White-Font border-b-2 border-primary"
                : "text-gray-400"
            }`}
          >
            캐릭터 설명
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-3 text-sm font-normal transition-colors ${
              activeTab === "chat"
                ? "text-White-Font border-b-2 border-primary"
                : "text-gray-400"
            }`}
          >
            이전 채팅
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-4 mb-16">
        {activeTab === "description" ? (
          <CharacterDescriptionTab
            character={character}
            flow={flow}
            hasChatHistory={hasChatHistory}
            onStoryClick={onStoryClick}
          />
        ) : (
          <CharacterChatTab
            character={character}
            hasChatHistory={hasChatHistory}
            chatList={chatList}
            onChatClick={onChatClick}
          />
        )}
      </div>
    </>
  );
}
