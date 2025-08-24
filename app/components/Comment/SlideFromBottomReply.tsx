"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { CommentEntry } from "../../data/commentEntries";
import CommentItem from "./CommentItem";
import { RemoveScroll } from "react-remove-scroll";
import Image from 'next/image'; // ⭐️ Image 컴포넌트 임포트

interface SlideFromBottomReplyProps {
  entry: CommentEntry[];
  onClose: () => void;
  diaryId: string | null;
}

const SlideFromBottomReply: React.FC<SlideFromBottomReplyProps> = ({
  entry,
  onClose,
  diaryId,
}) => {
  useEffect(() => {
    if (diaryId) {
      console.log(`댓글창이 열린 게시물 ID: ${diaryId}`);
    }
  }, [diaryId]);

  const placeholderImage = "https://placehold.co/40x40/E2E8F0/A0AEC0?text=U";
  const userProfile =
    "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish";
  
  const [height, setHeight] = useState<number | null>(null);
  const [isHeightDragging, setIsHeightDragging] = useState(false);
  const heightDragInfo = useRef({ startY: 0, startHeight: 0 });
  const [replyUserName, setReplyUserName] = useState<string>();
  const TAB_BAR_HEIGHT = 64;

  const snapPoints = useMemo(() => {
    if (typeof window === "undefined") {
      return { top: 760, middle: 533, closed: 0 };
    }
    const availableHeight = window.innerHeight - TAB_BAR_HEIGHT;
    return {
      top: availableHeight - 20,
      middle: availableHeight * 0.6,
      closed: 0,
    };
  }, []);

  useEffect(() => {
    if (height === null) {
      setHeight(snapPoints.middle);
    }
  }, [height, snapPoints]);

  const handleHeightDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsHeightDragging(true);
    const startY = "touches" in e ? e.touches[0].clientY : e.clientY;
    heightDragInfo.current = { startY, startHeight: height || 0 };
  };

  useEffect(() => {
    const handleHeightDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isHeightDragging) return;
      const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaY = currentY - heightDragInfo.current.startY;
      const newHeight = heightDragInfo.current.startHeight - deltaY;
      const constrainedHeight = Math.min(newHeight, snapPoints.top);
      setHeight(constrainedHeight);
    };
    const handleHeightDragEnd = () => {
      if (!isHeightDragging) return;
      setIsHeightDragging(false);
      const currentHeight = height || 0;
      const middleOfTopAndMiddle = (snapPoints.top + snapPoints.middle) / 2;
      const middleOfMiddleAndClose = snapPoints.middle / 2;
      if (currentHeight > middleOfTopAndMiddle) setHeight(snapPoints.top);
      else if (currentHeight > middleOfMiddleAndClose) setHeight(snapPoints.middle);
      else onClose();
    };
    if (isHeightDragging) {
      window.addEventListener("mousemove", handleHeightDragMove);
      window.addEventListener("touchmove", handleHeightDragMove);
      window.addEventListener("mouseup", handleHeightDragEnd);
      window.addEventListener("touchend", handleHeightDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleHeightDragMove);
      window.removeEventListener("touchmove", handleHeightDragMove);
      window.removeEventListener("mouseup", handleHeightDragEnd);
      window.removeEventListener("touchend", handleHeightDragEnd);
    };
  }, [isHeightDragging, height, snapPoints, onClose]);

  const clickStartPos = useRef({ x: 0, y: 0 });
  const handleOverlayInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    const point = "touches" in e ? e.touches[0] : e;
    clickStartPos.current = { x: point.clientX, y: point.clientY };
  };
  const handleOverlayInteractionEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.currentTarget !== e.target) return;
    const endPoint = "changedTouches" in e ? e.changedTouches[0] : e;
    const distance = Math.sqrt(Math.pow(endPoint.clientX - clickStartPos.current.x, 2) + Math.pow(endPoint.clientY - clickStartPos.current.y, 2));
    if (distance < 10) onClose();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = placeholderImage;
  };

  const setRepylUserInfo = (comment: CommentEntry) => {
    setReplyUserName(comment.author);
  };

  if (height === null) return null;

  return (
    <RemoveScroll>
      <div
        className="fixed inset-0 bg-[var(--text-main)]/50 flex flex-col-reverse z-[60]"
        onMouseDown={handleOverlayInteractionStart}
        onMouseUp={handleOverlayInteractionEnd}
        onTouchStart={handleOverlayInteractionStart}
        onTouchEnd={handleOverlayInteractionEnd}
      >
        <div
          className="bg-[var(--color-component-bg)] rounded-t-2xl w-full flex flex-col absolute bottom-16 animate-slideInFromBottom"
          style={{ height: `${height}px`, transition: isHeightDragging ? 'none' : 'height 0.3s ease-out' }}
        >
          <div
            className="flex flex-col w-full items-center justify-center py-3 flex-shrink-0 cursor-ns-resize"
            onMouseDown={handleHeightDragStart}
            onTouchStart={handleHeightDragStart}
          >
            <div className="w-10 h-1 bg-[var(--color-border)] rounded-full" />
            <span className="font-bold text-base mt-2 text-[var(--text-main)]">댓글</span>
          </div>
          <div className="h-full overflow-y-auto overscroll-contain">
            {entry.map((comment) => (
              <CommentItem
                comment={comment}
                setReplyUerInfo={setRepylUserInfo}
                key={comment.id}
              ></CommentItem>
            ))}
          </div>
          <div className="flex items-end border-t border-[var(--color-border)] p-4 space-x-2">
            {/* ⬇️ 1. 부모 div에 'relative' 클래스 추가 */}
            <div className="relative w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden flex-shrink-0">
              {/* ⬇️ 2. img를 Image로 변경하고 fill 속성 적용 */}
              <Image 
                src={userProfile} 
                alt={`사용자프로필`} 
                fill
                sizes="40px"
                className="object-cover" 
                onError={handleImageError} 
              />
            </div>
            <div className="flex-1 flex flex-col bg-[var(--color-subtle-bg)] rounded-xl border border-transparent focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 transition-all p-2">
              <AnimatePresence>
                {replyUserName && (
                  <motion.div
                    className="flex justify-between items-center text-sm px-2 pb-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xs text-[var(--text-subtle)]">
                      <span className="font-medium text-[var(--text-main)]">{replyUserName}</span>
                      님에게 답글 남기는 중
                    </p>
                    <button className="cursor-pointer text-md text-[var(--text-subtle)] p-1 -m-1 rounded-full hover:bg-[var(--color-component-bg)] active:bg-[var(--color-border)]" onClick={() => setReplyUserName(undefined)}>
                      <i className="ri-close-line"></i>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <input 
                className="outline-none w-full text-base bg-transparent px-2"
                placeholder="댓글을 입력하세요..."
              />
            </div>
            <div>
              <button className="cursor-pointer text-md px-3 py-2 rounded-xl bg-[var(--color-subtle-bg)] hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] transition-colors">
                <i className="ri-upload-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default SlideFromBottomReply;