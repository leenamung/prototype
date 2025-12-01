"use client";

import { usePathname } from 'next/navigation';
import BottomTabBar from './BottomTabBar';

// 전체 화면을 사용해야 하는 경로 (BottomTabBar 숨김)
const FULL_PAGE_ROUTES = ['/auth', '/diary', '/write', '/settings', '/legal', '/agit/create'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullPage = FULL_PAGE_ROUTES.some(route => pathname.startsWith(route));

  return (
    // ✅ [핵심 변경] h-dvh(동적 뷰포트 높이)로 전체 화면을 잡고 flex-col 적용
    <div className="flex flex-col h-dvh bg-[var(--color-background)]">
      
      {/* ✅ [콘텐츠 영역] 
          - flex-1: 남은 공간을 모두 차지
          - overflow-hidden: 이 영역 자체는 스크롤되지 않고, 내부 페이지가 스크롤을 제어하도록 함 
          - pb-16 제거: Flex 구조이므로 패딩 불필요
      */}
      <div className="flex-1 overflow-hidden relative w-full">
        {children}
      </div>

      {/* ✅ [BottomTabBar] 
          - isFullPage가 아닐 때만 렌더링
          - flex-none: 높이 고정 (자신의 크기만큼 차지)
      */}
      {!isFullPage && <BottomTabBar />}
    </div>
  );
}