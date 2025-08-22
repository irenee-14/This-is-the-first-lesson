import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

interface CardMediaTopProps {
  imageUrl?: string;
  name?: string;
  description?: string;
  chips?: string[];
  className?: string;
  onClick?: () => void;
}

export default function CardMediaTop({
  imageUrl,
  name = "캐릭터명",
  description,
  chips = [],
  className,
  onClick,
}: CardMediaTopProps) {
  return (
    <div
      className={cn(
        "w-40 inline-flex flex-col justify-start items-start gap-2",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div
        className="w-40 h-40 relative bg-indigo-900 rounded"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="self-stretch text-white text-base font-semibold">
        {name}
      </div>
      {description && (
        <div className="self-stretch text-white text-sm font-normal leading-tight line-clamp-2">
          {description}
        </div>
      )}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {chips.slice(0, 2).map((chip, index) => (
            <Chip key={index} size="m" shape="rounded" variantStyle="filled">
              {chip}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}
