"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, RefObject } from 'react';

// 1. 스크롤 위치(scrollTop)를 저장할 Context 생성
const AgitScrollContext = createContext<number>(0);

interface AgitScrollProviderProps {
  children: ReactNode;
  // 스크롤이 발생하는 실제 DOM 요소(main 태그)의 Ref를 받습니다.
  scrollContainerRef: RefObject<HTMLElement|null>;
}

// 2. Provider 컴포넌트
export const AgitScrollProvider = ({ children, scrollContainerRef }: AgitScrollProviderProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      // requestAnimationFrame을 사용하여 브라우저 렌더링 주기에 맞춰 업데이트 (성능 최적화)
      requestAnimationFrame(() => {
        if (container) {
          setScrollTop(container.scrollTop);
        }
      });
    };

    // passive: true 옵션으로 스크롤 성능 향상
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // 클린업: 컴포넌트 언마운트 시 리스너 제거
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  return (
    <AgitScrollContext.Provider value={scrollTop}>
      {children}
    </AgitScrollContext.Provider>
  );
};

// 3. 하위 컴포넌트에서 스크롤 위치를 쉽게 가져다 쓸 수 있는 커스텀 Hook
export const useAgitScroll = () => {
  const context = useContext(AgitScrollContext);
  // Provider 없이 사용했을 경우를 대비한 안전장치
  if (context === undefined) {
    throw new Error('useAgitScroll must be used within an AgitScrollProvider');
  }
  return context;
};