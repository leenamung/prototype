"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { RecommendedFriend } from "@/app/data/sampleFriendData";
import RecommendedFriendCard from "@/app/components/domain/friends/features/Recommended/RecommendedFriendCard";

interface RecommendedFriendCarouselProps {
  friends: RecommendedFriend[];
}

const RecommendedFriendCarousel: React.FC<RecommendedFriendCarouselProps> = ({ friends }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // StoryList.tsx의 스크롤 체크 로직을 그대로 사용합니다
  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [checkScrollability]);

  // StoryList.tsx의 스크롤 핸들러 로직을 그대로 사용합니다
  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollTo({
        left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full py-2">
      {/* 왼쪽 버튼 */}
      {canScrollLeft && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 z-10 w-8 h-8 my-auto transition-all duration-300 bg-[var(--color-component-bg)] rounded-full shadow-md opacity-75 top-1/2 -translate-y-1/2 hover:opacity-100 active:scale-90 flex items-center justify-center text-[var(--text-subtle)]"
          aria-label="이전 목록 보기"
        >
          <i className="ri-arrow-left-s-line ri-lg"></i>
        </button>
      )}

      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-3 overflow-x-auto scrollbar-hide px-1"
      >
        {friends.map((friend) => (
          <RecommendedFriendCard key={friend.id} friend={friend} />
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      {canScrollRight && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 z-10 w-8 h-8 my-auto transition-all duration-300 bg-[var(--color-component-bg)] rounded-full shadow-md opacity-75 top-1/2 -translate-y-1/2 hover:opacity-100 active:scale-90 flex items-center justify-center text-[var(--text-subtle)]"
          aria-label="다음 목록 보기"
        >
          <i className="ri-arrow-right-s-line ri-lg"></i>
        </button>
      )}
    </div>
  );
};

export default RecommendedFriendCarousel;