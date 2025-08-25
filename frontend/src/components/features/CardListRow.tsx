import CardMediaTop from "@/components/features/CardMediaTop";
import { cn } from "@/lib/utils";

interface CardData {
  id: string | number;
  imageUrl?: string;
  name?: string;
  description?: string;
  chipTexts?: string[];
}

interface CardListRowProps {
  cards: CardData[];
  className?: string;
  onCardClick?: (card: CardData, index: number) => void;
}

export default function CardListRow({
  cards,
  className,
  onCardClick,
}: CardListRowProps) {
  return (
    <div
      className={cn(
        "w-96 overflow-x-auto flex gap-4 py-4 px-2 scrollbar-hide",
        className
      )}
    >
      {cards.map((card, index) => (
        <CardMediaTop
          key={card.id}
          imageUrl={card.imageUrl}
          name={card.name}
          description={card.description}
          chips={card.chipTexts}
          onClick={onCardClick ? () => onCardClick(card, index) : undefined}
        />
      ))}
    </div>
  );
}
