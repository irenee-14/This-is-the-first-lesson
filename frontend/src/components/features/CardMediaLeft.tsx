import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { ReactComponent as ArrowRight } from "@/assets/icons/Arrow-Right.svg";

interface CardMediaLeftProps {
  imageUrl?: string;
  name?: string;
  description?: string;
  tags?: string[];
  className?: string;
  onClick?: () => void;
}

export default function CardMediaLeft({
  imageUrl,
  name = "캐릭터명",
  description,
  tags = [],
  className,
  onClick,
}: CardMediaLeftProps) {
  const hasTags = tags.length > 0;
  const hasDescription = description && description.trim().length > 0;
  const showArrowRight = hasDescription && !hasTags; // 설명이 있고 태그가 없을 때만 화살표 표시

  return (
    <div
      className={cn(
        "w-full inline-flex justify-start items-center gap-3",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* 이미지 */}
      <div
        className="w-20 h-20 relative bg-indigo-900 rounded"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 콘텐츠 영역 */}
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
        {/* 제목 행 */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="text-white text-base font-semibold">{name}</div>
          {showArrowRight && <ArrowRight className="w-5 h-5 text-gray-300" />}
        </div>

        {/* 칩 또는 설명 */}
        {hasTags && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <Chip key={index} size="m" shape="rounded" variantStyle="filled">
                {tag}
              </Chip>
            ))}
          </div>
        )}

        {hasDescription && !hasTags && (
          <div className="self-stretch text-white text-sm font-normal leading-tight line-clamp-2">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
