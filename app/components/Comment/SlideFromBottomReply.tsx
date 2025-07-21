"use client";

// ⬇️ framer-motion 관련 훅들을 대부분 제거합니다.
import { motion, AnimatePresence } from "framer-motion";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { CommentEntry } from "../../data/commentEntries";
import CommentItem from "./CommentItem";
import { RemoveScroll } from "react-remove-scroll";

interface SlideFromBottomReplyProps {
  entry: CommentEntry[];
  onClose: () => void;
}

const SlideFromBottomReply: React.FC<SlideFromBottomReplyProps> = ({
  entry,
  onClose,
}) => {
  const placeholderImage = "https://placehold.co/40x40/E2E8F0/A0AEC0?text=U";
  const userProfile =
    "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish";
  
  // 패널 높이 조절 관련 로직은 그대로 유지합니다.
  const [height, setHeight] = useState<number | null>(null);
  const [isHeightDragging, setIsHeightDragging] = useState(false);
  const heightDragInfo = useRef({ startY: 0, startHeight: 0 });

  const [replyUserName, setReplyUserName] = useState<string>();

  const snapPoints = useMemo(() => {
    if (typeof window === "undefined") {
      return { top: 760, middle: 533, closed: 0 };
    }
    const screenHeight = window.innerHeight;
    return {
      top: screenHeight * 0.95,
      middle: screenHeight * (2 / 3),
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
      setHeight(newHeight);
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
    // RemoveScroll은 배경 스크롤을 막아주므로 그대로 유지합니다.
    <RemoveScroll>
      <div
        className="fixed inset-0 bg-black/50 flex flex-col-reverse z-[60]"
        onMouseDown={handleOverlayInteractionStart}
        onMouseUp={handleOverlayInteractionEnd}
        onTouchStart={handleOverlayInteractionStart}
        onTouchEnd={handleOverlayInteractionEnd}
      >
        <div
          className="bg-white rounded-t-2xl w-full flex flex-col absolute bottom-0 animate-slideInFromBottom"
          style={{ height: `${height}px`, transition: isHeightDragging ? 'none' : 'height 0.3s ease-out' }}
        >
          {/* 패널 높이 조절 핸들러 */}
          <div
            className="flex flex-col w-full items-center justify-center py-2 flex-shrink-0 cursor-ns-resize"
            onMouseDown={handleHeightDragStart}
            onTouchStart={handleHeightDragStart}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
            <span className="font-bold text-base mt-2">댓글</span>
          </div>

          {/* ⬇️ 가장 간단한 네이티브 스크롤로 변경 */}
          <div className="h-full overflow-y-auto overscroll-contain">
            {entry.map((comment) => (
              <CommentItem
                comment={comment}
                setReplyUerInfo={setRepylUserInfo}
                key={comment.id}
              ></CommentItem>
            ))}
          </div>

          {/* 댓글 입력창 */}
          <div className="flex items-end border-t border-gray-200 mx-3 mb-3 pt-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
              <img src={userProfile} alt={`사용자프로필`} className="w-full h-full object-cover" onError={handleImageError} />
            </div>
            <div className="flex-col flex-1 mr-1">
              <AnimatePresence>
                {replyUserName && (
                  <motion.div
                    className="flex justify-between text-sm py-1 border-t border-x rounded-t-xl px-5 border-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <span className="text-sm text-gray-500">{replyUserName}</span>
                      <span className="ml-2 text-sm">님에게 답글 남기는 중</span>
                    </div>
                    <button className="cursor-pointer text-md" onClick={() => setReplyUserName(undefined)}>
                      <i className="ri-close-line"></i>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={`border border-gray-200 ${replyUserName !== undefined ? "rounded-b-xl" : "rounded-xl"} px-5 py-1 focus-within:border-blue-500`}
              >
                <input className="outline-0 w-full text-md"></input>
              </div>
            </div>
            <div>
              <button className="cursor-pointer text-md px-3 py-1 rounded-xl bg-gray-200 active:opacity-65">
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