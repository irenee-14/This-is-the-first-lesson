import React from "react";
import CardMediaTop from "@/components/features/CardMediaTop";
import Input from "@/components/ui/input";
import { ReactComponent as SearchIcon } from "@/assets/icons/Search.svg";

// 더미 데이터
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

const allCharacters = [
  {
    id: 7,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["Chip", "Chip"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 8,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["Chip", "Chip"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 9,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["Chip", "Chip"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 10,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["Chip", "Chip"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 11,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["Chip", "Chip"],
    imageUrl: "/image/icon.png",
  },
  {
    id: 12,
    name: "캐릭터명",
    description: "설명은\n두 줄입니다",
    chips: ["Chip", "Chip"],
    imageUrl: "/image/icon.png",
  },
];

export default function Characters() {
  const handleCharacterClick = (characterId: number) => {
    console.log("캐릭터 클릭:", characterId);
    // 여기에 캐릭터 상세 페이지로 이동하는 로직 추가
  };

  return (
    <>
      <div className="bg-gray-900 p-4 h-44">
        <h2 className="h-40 text-2xl font-bold ">배너</h2>
      </div>

      <div className="p-3">
        <div className="mb-8 gap-3 flex flex-col">
          <h2 className="text-lg font-semibold">위프 추천 🔑 인기 캐릭터</h2>
          <div className="overflow-x-auto flex gap-4 scrollbar-hide">
            {popularCharacters.map((character) => (
              <CardMediaTop
                key={character.id}
                imageUrl={character.imageUrl}
                name={character.name}
                description={character.description}
                chips={character.chips}
                onClick={() => handleCharacterClick(character.id)}
                variant="horizontal"
              />
            ))}
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
            {allCharacters.map((character) => (
              <CardMediaTop
                key={character.id}
                imageUrl={character.imageUrl}
                name={character.name}
                description={character.description}
                chips={character.chips}
                onClick={() => handleCharacterClick(character.id)}
                variant="grid"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
