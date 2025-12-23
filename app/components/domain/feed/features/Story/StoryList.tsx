"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import StoryItem from "./StoryItem"; // 위에서 만든 StoryItem 컴포넌트

// ✨ [추가] StoryEmotion 타입 정의 (DiaryEntry와 유사하게 맞춤)
export type StoryEmotion = {
  key: string; // 'joy', 'sadness', 'anger', 'calm', 'anxiety' 등
};

// ✨ [수정] Story 인터페이스에 selectedEmotions 추가
export interface Story {
  id: number;
  userName: string;
  userProfile: string;
  selectedEmotions: StoryEmotion[];
}

// ✨ [수정] 전달받은 감정 키워드(CSS 변수)에 맞춰 샘플 데이터 업데이트
const sampleStories: Story[] = [
  { id: 1, userName: "김철수", userProfile: "https://i.pravatar.cc/150?img=11", selectedEmotions: [{ key: 'happy' }] }, // 행복
  { id: 2, userName: "박영희", userProfile: "https://i.pravatar.cc/150?img=5", selectedEmotions: [{ key: 'sad' }, { key: 'miss' }] }, // 슬픔 + 그리움
  { id: 3, userName: "이민준", userProfile: "https://i.pravatar.cc/150?img=3", selectedEmotions: [{ key: 'anxious' }, { key: 'tired' }] }, // 불안 + 피곤
  { id: 4, userName: "최유리", userProfile: "https://i.pravatar.cc/150?img=9", selectedEmotions: [{ key: 'joy' }, { key: 'excitement' }] }, // 기쁨 + 설렘
  { id: 5, userName: "정수빈", userProfile: "https://i.pravatar.cc/150?img=12", selectedEmotions: [{ key: 'calm' }] }, // 평온
  { id: 6, userName: "강호동", userProfile: "https://i.pravatar.cc/150?img=6", selectedEmotions: [] }, // 감정 없음 (기본)
  { id: 7, userName: "유재석", userProfile: "https://i.pravatar.cc/150?img=7", selectedEmotions: [{ key: 'hope' }, { key: 'proud' }] }, // 희망 + 뿌듯
  { id: 8, userName: "이광수", userProfile: "https://i.pravatar.cc/150?img=8", selectedEmotions: [{ key: 'love' }] }, // 사랑
  { id: 9, userName: "송지효", userProfile: "https://i.pravatar.cc/150?img=4", selectedEmotions: [{ key: 'serene' }, { key: 'satisfied' }] }, // 고요 + 만족
  { id: 10, userName: "김종국", userProfile: "https://i.pravatar.cc/150?img=10", selectedEmotions: [{ key: 'angry' }, { key: 'tired' }] }, // 화남 + 피곤
  { id: 11, userName: "하동훈", userProfile: "https://i.pravatar.cc/150?img=13", selectedEmotions: [{ key: 'grateful' }] }, // 감사
  { id: 12, userName: "양세찬", userProfile: "https://i.pravatar.cc/150?img=14", selectedEmotions: [{ key: 'lazy' }, { key: 'neutral' }] }, // 귀찮음 + 무표정
  { id: 13, userName: "전소민", userProfile: "https://i.pravatar.cc/150?img=20", selectedEmotions: [{ key: 'excitement' }, { key: 'love' }] }, // 설렘 + 사랑
  { id: 14, userName: "지석진", userProfile: "https://i.pravatar.cc/150?img=33", selectedEmotions: [{ key: 'lonely' }] }, // 외로움
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
    <div className="relative w-full py-2">
      {/* 왼쪽 버튼 */}
      {canScrollLeft && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 z-10 w-8 h-8 my-auto transition-all duration-300 bg-[var(--color-component-bg)] rounded-full shadow-md opacity-75 top-1/2 -translate-y-1/2 hover:opacity-100 active:scale-90"
        >
          &lt;
        </button>
      )}

      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollContainerRef}
        className="flex px-2 space-x-2 overflow-x-auto scrollbar-hide"
      >
        {sampleStories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      {canScrollRight && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 z-10 w-8 h-8 my-auto transition-all duration-300 bg-[var(--color-component-bg)] rounded-full shadow-md opacity-75 top-1/2 -translate-y-1/2 hover:opacity-100 active:scale-90"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default StoryList;