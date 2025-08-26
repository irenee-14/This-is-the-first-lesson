import { cn } from "@/lib/utils";
import CardMediaLeft from "./CardMediaLeft";

interface ProductItem {
  id?: string | number;
  imageUrl?: string;
  name?: string;
  description?: string;
  chips?: string[];
}

interface CardListColumnProps {
  cards: ProductItem[];
  className?: string;
  onCardClick?: (item: ProductItem, index: number) => void;
}

export default function CardListColumn({
  cards,
  className,
  onCardClick,
}: CardListColumnProps) {
  return (
    <div
      className={cn(
        "self-stretch inline-flex flex-col justify-start items-start gap-4 scrollbar-hide",
        className
      )}
    >
      {cards.map((item, index) => (
        <CardMediaLeft
          key={item.id || index}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
          chips={item.chips}
          onClick={onCardClick ? () => onCardClick(item, index) : undefined}
        />
      ))}
    </div>
  );
}
