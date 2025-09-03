import Chip from "@/components/ui/Chip";
import CharacterInfoSection from "./CharacterInfoSection";
import CardMediaTop from "./CardMediaTop";
import { ReactComponent as PenIcon } from "@/assets/icons/Pen.svg";
import type { Character } from "@/types/character";
import type { Background } from "@/types/background";

interface CharacterDescriptionTabProps {
  character: Character;
  backgrounds: Background[];
  hasChatHistory: boolean;
  onBackgroundClick: (backgroundId: string) => void;
}

export default function CharacterDescriptionTab({
  character,
  backgrounds,
  hasChatHistory,
  onBackgroundClick,
}: CharacterDescriptionTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <CharacterInfoSection
          title="외모 및 성격"
          content={character.personality}
        />
        <CharacterInfoSection title="특징" content={character.traits} />
        <CharacterInfoSection title="말투" content={character.dialogueStyle} />
      </div>

      {/* Comment Area */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <Chip
            size="l"
            variantStyle="outlined"
            shape="square"
            rightIcon={<PenIcon className="text-safe" />}
            className="bg-gray-900"
          >
            {character.writerName}
          </Chip>
        </div>
        <p className="text-sm text-normal text-White-Font whitespace-pre-line">
          {character.writerNote}
        </p>
      </div>

      {/* Background Area */}
      <div className="gap-6 flex flex-col">
        {!hasChatHistory ? (
          <CharacterInfoSection
            title="배경 설명"
            content={backgrounds[0].description} // 기본 배경
          />
        ) : (
          <></>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold">또 다른 배경 보기</h2>
            <p className="text-sm text-gray-500">
              🔒 캐릭터와 채팅이 쌓이면 잠금된 배경을 볼 수 있어요.
            </p>
          </div>
          <div className="overflow-x-auto flex gap-4 scrollbar-hide">
            {backgrounds.map((background: Background) => {
              return (
                <CardMediaTop
                  key={background.backgroundId}
                  imageUrl="src/assets/images/backgrounds/library.png"
                  name={background.backgroundName}
                  chips={background.tags}
                  onClick={() => onBackgroundClick(background.backgroundId)}
                  variant="horizontal"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
