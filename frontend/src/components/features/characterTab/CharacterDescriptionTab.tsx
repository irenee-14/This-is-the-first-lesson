import Chip from "@/components/ui/Chip";
import CharacterInfoSection from "@/components/features/characterTab/CharacterInfoSection";
import CardMediaTop from "@/components/features/card/CardMediaTop";
import { ReactComponent as PenIcon } from "@/assets/icons/Pen.svg";
import type { Character } from "@/types/character";
import type { Flow } from "@/types/story";

interface CharacterDescriptionTabProps {
  character: Character;
  flow: Flow[];
  hasChatHistory: boolean;
  onStoryClick: (storyId: string) => void;
  onFlowClick: (flow: Flow) => void;
}

export default function CharacterDescriptionTab({
  character,
  flow,
  hasChatHistory,
  onStoryClick,
  onFlowClick,
}: CharacterDescriptionTabProps) {
  // flow가 undefined이거나 빈 배열인 경우 처리
  if (!flow || flow.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <CharacterInfoSection
            title="외모 및 성격"
            content={character.personality}
          />
          <CharacterInfoSection title="특징" content={character.traits} />
          <CharacterInfoSection
            title="말투"
            content={character.dialogueStyle}
          />
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

        {/* Flow 데이터가 없을 때 표시 */}
        <div className="text-center py-8 text-gray-500">
          배경 정보를 불러오는 중입니다...
        </div>
      </div>
    );
  }

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
      <div className="w-full h-2 bg-indigoGray-900"></div>
      {/* Background Area */}
      <div className="gap-6 flex flex-col">
        {!hasChatHistory && flow[0] && (
          <CharacterInfoSection
            title="배경 설명"
            content={flow[0].description}
          />
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold">또 다른 배경 보기</h2>
            <p className="text-sm text-gray-500">
              🔒 캐릭터와 채팅이 쌓이면 잠금된 배경을 볼 수 있어요.
            </p>
          </div>
          <div className="overflow-x-auto flex gap-4 scrollbar-hide">
            {flow.map((flowItem: Flow) => {
              return (
                <CardMediaTop
                  key={flowItem.id}
                  id={flowItem.id}
                  flow={flowItem}
                  imageUrl={
                    flowItem.imgUrl ||
                    "src/assets/images/backgrounds/library.png"
                  }
                  name={flowItem.title || "Unknown Background"}
                  chips={flowItem.tags}
                  onFlowClick={onFlowClick}
                  variant="horizontal"
                  isOpen={flowItem.isOpen}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
