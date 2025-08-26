import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

interface CardMediaTopProps {
  imageUrl?: string;
  name?: string;
  description?: string;
  chips?: string[];
  className?: string;
  onClick?: () => void;
  variant?: "horizontal" | "grid";
}

export default function CardMediaTop({
  imageUrl,
  name = "캐릭터명",
  description,
  chips = [],
  className,
  onClick,
  variant = "grid",
}: CardMediaTopProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={cn(
        "inline-flex flex-col justify-start items-start gap-2",
        isHorizontal ? "w-40 flex-shrink-0" : "w-full",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative bg-indigo-900 rounded",
          isHorizontal ? "w-40 h-40" : "w-full aspect-square"
        )}
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
