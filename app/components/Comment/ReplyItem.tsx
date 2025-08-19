import { PropsWithChildren, useEffect, useState } from "react";
import { CommentEntry } from "../../data/commentEntries";
import Image from "next/image";

interface Props {
  comment: CommentEntry;
  setReplyUerInfo: (comment: CommentEntry) => void;
}

const ReplyItem: React.FC<PropsWithChildren<Props>> = ({
  comment,
  setReplyUerInfo,
}) => {
  const placeholderImage = "https://placehold.co/40x40/E2E8F0/A0AEC0?text=U";

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showReadMore, setShowReadMore] = useState<boolean>(false);

  useEffect(() => {
    if (comment.content.length > 50) {
      setShowReadMore(true);
    } else {
      setShowReadMore(false);
    }
  }, [comment.content]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = placeholderImage;
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex mb-3 px-2 pt-2 w-full">
      <div className="flex">
        <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
          <Image src={comment.profileImage} alt={`${comment.author} 프로필`} className="w-full h-full object-cover" width={40} height={40} />
        </div>
        <div className="flex-col">
          <div className="flex">
            <p className="flex font-bold text-[var(--text-main)] text-sm">{comment.author}</p>
            <p className="flex text-sm font-thin ml-2 text-[var(--text-subtle)]">{comment.timestamp}</p>
          </div>
          <div>
            <p className={`text-sm ${isExpanded ? "" : "line-clamp-1"}`}>{comment.content}</p>
            {showReadMore && (
              <p onClick={toggleReadMore} className="text-[var(--color-primary-dark)] text-xs mt-1 cursor-pointer hover:underline">
                {isExpanded ? "접기" : "더보기"}
              </p>
            )}
          </div>
          <div>
            <span
              className="text-xs text-[var(--text-subtle)] cursor-pointer hover:underline"
              onClick={() => setReplyUerInfo(comment)}
            >
              댓글달기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
