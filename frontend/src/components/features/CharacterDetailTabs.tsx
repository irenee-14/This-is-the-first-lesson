import { useState } from "react";
import CharacterDescriptionTab from "./CharacterDescriptionTab";
import CharacterChatTab from "./CharacterChatTab";
import type { Character } from "@/types/character";
import type { Background } from "@/types/background";

interface CharacterDetailTabsProps {
  character: Character;
  backgrounds: Background[];
  hasChatHistory: boolean;
  onBackgroundClick: (backgroundId: string) => void;
}

export default function CharacterDetailTabs({
  character,
  backgrounds,
  hasChatHistory,
  onBackgroundClick,
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
            backgrounds={backgrounds}
            hasChatHistory={hasChatHistory}
            onBackgroundClick={onBackgroundClick}
          />
        ) : (
          <CharacterChatTab
            character={character}
            backgrounds={backgrounds}
            hasChatHistory={hasChatHistory}
            onBackgroundClick={onBackgroundClick}
          />
        )}
      </div>
    </>
  );
}
