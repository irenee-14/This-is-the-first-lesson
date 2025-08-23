import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import Chip from "@components/ui/Chip";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import Switch from "@/components/ui/Switch";
import SwitchSafe from "@/components/ui/SwitchSafe";
import CardMediaTop from "@/components/features/CardMediaTop";
import CardListRow from "@/components/features/CardListRow";
import CardMediaLeft from "@/components/features/CardMediaLeft";
import CardListColumn from "@/components/features/CardListColumn";
import { ReactComponent as Search } from "@/assets/icons/Search.svg";
const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToAbout = (): void => {
    navigate("/characters");
  };

  const dropdownItems = [
    "로맨스",
    "일상",
    "판타지",
    "액션",
    "스릴러",
    "코미디",
    "드라마",
  ];

  const productItems = [
    {
      id: 1,
      imageUrl: "https://placehold.co/80x80",
      name: "동탄고등학교",
      description:
        "[호감도: 80/100]\n동탄고등학교에 전학온 User은 반지호의 옆에",
    },
    {
      id: 2,
      imageUrl: "https://placehold.co/80x80",
      name: "조선시대",
      description:
        "[호감도: 32/100]\n어쩌다 반지호 침소에 들어간 User은 그렇게 ..",
    },
    {
      id: 3,
      name: "현대 카페",
      chips: ["로맨스", "일상"],
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}

      {/* Button Component Tests */}
      <section className="mb-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="s" variant="primary">
                Small
              </Button>
              <Button size="m" variant="primary">
                Medium
              </Button>
              <Button size="l" variant="primary">
                Large
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="s" variant="secondary">
                Small
              </Button>
              <Button size="m" variant="secondary">
                Medium
              </Button>
              <Button size="l" variant="secondary">
                Large
              </Button>
            </div>
          </div>

          {/* Width variants */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-600 w-20">
                  Auto:
                </span>
                <Button size="m" variant="primary" width="auto">
                  Auto Width
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-600 w-20">
                  Full:
                </span>
                <Button size="m" variant="secondary" width="full">
                  Full Width
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-600 w-20">
                  Fit:
                </span>
                <Button size="m" variant="tertiary" width="fit">
                  Fit Content
                </Button>
              </div>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                size="m"
                variant="primary"
                leftIcon={<span className="text-lg">🎯</span>}
              >
                Left Icon
              </Button>
              <Button
                size="m"
                variant="secondary"
                rightIcon={<span className="text-lg">→</span>}
              >
                Right Icon
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chip Component Tests */}
      <section className="mb-12">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-600 w-20">
              Default:
            </span>
            <Chip>다정</Chip>
            <Chip>친절</Chip>
            <Chip>용감</Chip>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-600 w-20">
              Square:
            </span>
            <Chip shape="square">다정</Chip>
            <Chip shape="square">친절</Chip>
            <Chip shape="square">용감</Chip>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-600 w-20">
              Outlined:
            </span>
            <Chip shape="square" variantStyle="outlined">
              다정
            </Chip>
            <Chip shape="square" variantStyle="outlined">
              친절
            </Chip>
            <Chip shape="square" variantStyle="outlined">
              용감
            </Chip>
          </div>
        </div>
      </section>

      {/* Input Component Tests */}
      <section className="mb-12">
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Input
              variant="filled"
              textColor="gray"
              shape="rounded"
              placeholder="Filled Gray Rounded Input"
            />
          </div>
          <div className="space-y-2">
            <Input
              variant="outlinedGray500"
              textColor="white"
              shape="square"
              placeholder="Outlined Gray500 White Square Input"
            />
          </div>
          <div className="space-y-2">
            <Input
              variant="outlinedGray200"
              textColor="gray"
              shape="rounded"
              placeholder="Outlined Gray200 Gray Rounded Input"
            />
          </div>
          <div className="space-y-2">
            <Input
              variant="outlinedGray500"
              textColor="gray"
              shape="rounded"
              placeholder="Input with left icon"
              leftIcon={<Search />}
            />
          </div>
        </div>
      </section>

      {/* Dropdown Component Tests */}
      <section className="mb-12">
        <div className="space-y-4">
          <Dropdown
            label="장르 선택"
            buttonLabel="장르를 선택하세요"
            items={dropdownItems}
          />
        </div>
      </section>

      {/* Switch Component Tests */}
      <section className="mb-12">
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <Switch />
          </div>
          <div className="flex items-center gap-2">
            <SwitchSafe />
          </div>
        </div>
      </section>

      {/* Card Components Tests */}
      <section className="mb-12">
        <div className="space-y-8">
          <div>
            <CardMediaTop
              imageUrl="https://via.placeholder.com/150"
              name="캐릭터명"
              description="설명은 두 줄입니다 설명은 두 줄입니다설명은 두 줄입니다설명은 두 줄입니다설명은 두 줄입니다"
              chips={["다정", "친절", "용감", "어쩌구", "저쩌구"]}
            />
          </div>

          <div>
            <CardMediaLeft
              imageUrl="https://via.placeholder.com/150"
              name="캐릭터명"
              description="설명은 두 줄입니다 설명은 두 줄입니다설명은 두 줄입니다설명은 두 줄입니다설명은 두 줄입니다"
            />
          </div>

          <div>
            <CardListRow
              cards={productItems}
              onCardClick={(card, index) => {
                console.log(
                  `CardListRow clicked: ${card.name} at index ${index}`
                );
                navigate(`/product/${card.id}`);
              }}
            />
          </div>

          <div>
            <CardListColumn
              cards={productItems}
              onCardClick={(item, index) => {
                console.log(
                  `CardListColumn clicked: ${item.name} at index ${index}`
                );
                navigate(`/product/${item.id}`);
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
