import CardMediaTop from "@/components/features/CardMediaTop";
import Input from "@/components/ui/Input";
import { ReactComponent as SearchIcon } from "@/assets/icons/Search.svg";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { useApi } from "@/hooks/useApi";
import type { CharacterListResponse, Character } from "@/types/character";
import { useEffect } from "react";

const popularCharacters = [
  {
    id: 1,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["짝사랑", "후회"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 2,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["짝사랑", "후회"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 3,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["짝사랑", "후회"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 4,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["짝사랑", "후회"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 5,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["짝사랑", "후회"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 6,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["짝사랑", "후회"],
    imageUrl: "/image/icon.png",
  },
];

const getImageUrl = (dbPath: string) =>
  new URL(`../assets/images/${dbPath}`, import.meta.url).href;

export default function Characters() {
  const navigate = useNavigate();
  const {
    data: charactersData,
    loading,
    error,
    get,
  } = useApi<CharacterListResponse>();

  useEffect(() => {
    get("/characters");
  }, [get]);

  const handleCharacterClick = (characterId: string | number) => {
    navigate(`/characters/${characterId}`);
  };

  const transformCharacterData = (character: Character) => ({
    id: character.characterId,
    name: character.name,
    description: character.description,
    chips: character.tags.length > 0 ? character.tags : ["Chip", "Chip"],
    imageUrl: character.characterImg
      ? getImageUrl(character.characterImg)
      : "/image/icon.png",
  });

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-14 pb-20 flex items-center justify-center min-h-screen">
          <div>로딩 중...</div>
        </div>
        <BottomNav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="pt-14 pb-20 flex items-center justify-center min-h-screen">
          <div>오류가 발생했습니다: {error}</div>
        </div>
        <BottomNav />
      </>
    );
  }

  const characters = charactersData?.data?.characters || [];

  return (
    <>
      <Header />

      <div className="pt-14 pb-20">
        <div className="bg-gray-900 p-4 h-44">
          <h2 className="h-40 text-2xl font-bold">배너</h2>
        </div>

        <div className="p-3">
          <div className="mb-8 gap-3 flex flex-col">
            <h2 className="text-lg font-semibold">위프 추천 🔑 인기 캐릭터</h2>
            <div className="overflow-x-auto flex gap-4 scrollbar-hide">
              {characters.map((character) => {
                const transformedCharacter = transformCharacterData(character);

                return (
                  <CardMediaTop
                    key={transformedCharacter.id}
                    imageUrl={transformedCharacter.imageUrl}
                    name={transformedCharacter.name}
                    description={transformedCharacter.description}
                    chips={transformedCharacter.chips}
                    onClick={() =>
                      handleCharacterClick(transformedCharacter.id)
                    }
                    variant="horizontal"
                  />
                );
              })}
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-4">
            <Input
              placeholder="작품 이름이나 캐릭터, 설명으로 검색"
              leftIcon={<SearchIcon />}
              variant="outlinedGray500"
            />
          </div>

          {/* All Characters Section */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {characters.map((character) => {
                const transformedCharacter = transformCharacterData(character);
                return (
                  <CardMediaTop
                    key={transformedCharacter.id}
                    imageUrl={transformedCharacter.imageUrl}
                    name={transformedCharacter.name}
                    description={transformedCharacter.description}
                    chips={transformedCharacter.chips}
                    onClick={() =>
                      handleCharacterClick(transformedCharacter.id)
                    }
                    variant="grid"
                  />
                );
              })}
            </div>
            {characters.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                캐릭터가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
