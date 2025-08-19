// components/StoryList.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import StoryItem from "./StoryItem"; // 위에서 만든 StoryItem 컴포넌트

// 샘플 데이터
const sampleStories = [
  { id: 1, userName: "김철수", userProfile: "https://i.pravatar.cc/150?img=1" },
  { id: 2, userName: "박영희", userProfile: "https://i.pravatar.cc/150?img=2" },
  { id: 3, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=3" },
  { id: 4, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=4" },
  { id: 5, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=5" },
  { id: 6, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=6" },
  { id: 7, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=7" },
  { id: 8, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=8" },
  { id: 9, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=9" },
  { id: 10, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=10" },
  { id: 11, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=11" },
  { id: 12, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=12" },
  { id: 13, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=13" },
  { id: 14, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=14" },
];

const StoryList: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 버튼 표시 여부를 체크하는 함수
  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      // 소수점 오차를 고려하여 1px 여유를 줌
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // 컴포넌트 마운트 및 창 크기 변경 시 스크롤 가능 여부 확인
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability(); // 초기 상태 확인
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);

      // 클린업 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [checkScrollability]);

  // 버튼 클릭 시 스크롤 처리 함수
  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      // 한 번에 컨테이너 너비의 80%만큼 스크롤
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollTo({
        left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth", //  핵심: 부드러운 스크롤 애니메이션
      });
    }
  };

  return (
    <div className="relative w-full py-4">
      {/* 왼쪽 버튼 */}
      {canScrollLeft && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 z-10 w-8 h-8 my-auto transition-opacity duration-300 bg-[var(--color-component-bg)] rounded-full shadow-md opacity-75 top-1/2 -translate-y-1/2 hover:opacity-100"
        >
          &lt;
        </button>
      )}

      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollContainerRef}
        className="flex p-2 space-x-2 overflow-x-auto scrollbar-hide"
      >
        {sampleStories.map((story) => (
          <StoryItem key={story.id} {...story} />
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      {canScrollRight && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 z-10 w-8 h-8 my-auto transition-opacity duration-300 bg-[var(--color-component-bg)] rounded-full shadow-md opacity-75 top-1/2 -translate-y-1/2 hover:opacity-100"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default StoryList;