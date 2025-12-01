import { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import { CommentEntry } from "@/app/data/commentEntries";
import ReplyItem from "./ReplyItem";

interface Props {
  comment: CommentEntry;
  setReplyUerInfo: (comment: CommentEntry) => void;
}

const CommentItem: React.FC<PropsWithChildren<Props>> = ({
  comment,
  setReplyUerInfo,
}) => {
  const placeholderImage = "https://placehold.co/40x40/E2E8F0/A0AEC0?text=U";

  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  
  const [isReplyExpanded, setIsReplyExpanded] = useState<boolean>(false);

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
    setIsContentExpanded(prev => !prev);
  };

  const toggleReplyExpanded = () => {
    setIsReplyExpanded(prev => ! prev);
  }

  return (
    <div className="flex p-3 w-full">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden">
          <Image src={comment.profileImage} alt={`${comment.author} 프로필`} onError={handleImageError} className="w-full h-full object-cover" width={40} height={40} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="font-bold text-[var(--text-main)] text-sm">{comment.author}</p>
          <p className="text-sm font-thin text-[var(--text-subtle)]">{comment.timestamp}</p>
        </div>
        <div className="mt-1">
          <p className={`text-base leading-relaxed ${isContentExpanded ? "" : "line-clamp-2"}`}>
            {comment.content}
          </p>
          {showReadMore && (
            <p onClick={toggleReadMore} className="text-[var(--color-primary-dark)] text-xs mt-1 cursor-pointer hover:underline">
              {isContentExpanded ? "접기" : "더보기"}
            </p>
          )}
        </div>
        <div className="mt-2">
          <span
            className="text-xs text-[var(--text-subtle)] cursor-pointer hover:underline"
            onClick={() => setReplyUerInfo(comment)}
          >
            댓글달기
          </span>
        </div>
        {comment.comments !== 0 && (
          <div
            className="flex items-center w-fit text-xs text-[var(--text-subtle)] cursor-pointer mt-2"
            onClick={toggleReplyExpanded}
          >
            <div className="w-5 h-[1px] bg-[var(--color-border)] mr-2"></div>
            <span>답글 {comment.comments}개 더 보기</span>
          </div>
        )}
        {isReplyExpanded && <ReplyItem comment={comment} setReplyUerInfo={setReplyUerInfo}></ReplyItem>}
      </div>
    </div>
  );
};

export default CommentItem;