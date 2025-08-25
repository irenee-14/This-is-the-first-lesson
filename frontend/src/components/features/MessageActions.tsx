import React from "react";
import IconButton from "@/components/ui/IconButton";
import { ReactComponent as ResetIcon } from "@/assets/icons/Reset.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/Pen.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/Delete.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/Message-share.svg";
import { ReactComponent as BookmarkIcon } from "@/assets/icons/Bookmark.svg";

interface MessageActionsProps {
  onReset?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  isLastMessage?: boolean; // 마지막 메시지인지 여부
  className?: string;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  onReset,
  onEdit,
  onDelete,
  onShare,
  onBookmark,
  isLastMessage = false,
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {isLastMessage && (
        <>
          <IconButton
            icon={<ResetIcon className="w-4 h-4" />}
            onClick={onReset}
            size="sm"
            variant="unfilled"
            ariaLabel="메시지 재생성"
          />
          <IconButton
            icon={<PenIcon className="w-4 h-4" />}
            onClick={onEdit}
            size="sm"
            variant="unfilled"
            ariaLabel="메시지 편집"
          />
          <IconButton
            icon={<DeleteIcon className="w-4 h-4" />}
            onClick={onDelete}
            size="sm"
            variant="unfilled"
            ariaLabel="메시지 삭제"
          />
        </>
      )}
      <IconButton
        icon={<ShareIcon className="w-4 h-4" />}
        onClick={onShare}
        size="sm"
        variant="unfilled"
        ariaLabel="메시지 공유"
      />
      <IconButton
        icon={<BookmarkIcon className="w-4 h-4" />}
        onClick={onBookmark}
        size="sm"
        variant="unfilled"
        ariaLabel="메시지 북마크"
      />
    </div>
  );
};

export default MessageActions;
