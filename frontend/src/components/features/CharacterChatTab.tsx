import CardMediaLeft from "./CardMediaLeft";
import type { Character } from "@/types/character";
import type { Background } from "@/types/background";

interface CharacterChatTabProps {
  character: Character;
  backgrounds: Background[];
  hasChatHistory: boolean;
  onBackgroundClick: (backgroundId: string) => void;
}

export default function CharacterChatTab({
  character,
  backgrounds,
  hasChatHistory,
  onBackgroundClick,
}: CharacterChatTabProps) {
  return (
    <div>
      {hasChatHistory ? (
        <div className="flex flex-col gap-4">
          {backgrounds.map((background: Background) => (
            <CardMediaLeft
              key={background.backgroundId}
              imageUrl="src/assets/images/characters/character_1.png"
              name={background.backgroundName}
              description={background.description}
              onClick={() => onBackgroundClick(background.backgroundId)}
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
