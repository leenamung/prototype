"use client";

import { usePathname } from 'next/navigation';
import BottomTabBar from './BottomTabBar';

// BottomTabBar와 하단 여백을 숨길 페이지 경로 목록입니다.
const FULL_PAGE_ROUTES = ['/auth', '/diary', '/agit']; 

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 현재 경로가 전체 화면을 사용해야 하는 경로인지 확인합니다.
  const isFullPage = FULL_PAGE_ROUTES.some(route => pathname.startsWith(route));

  return (
    <>
      {/* isFullPage가 true이면(auth 페이지 등) pb-16 클래스가 없는 div로 감싸고,
        false이면(일반 페이지) pb-16 클래스가 있는 div로 감쌉니다.
      */}
      <div className={isFullPage ? "content-wrapper" : "content-wrapper pb-16"}>
        {children}
      </div>

      {/* isFullPage가 false일 때만 BottomTabBar를 렌더링합니다. */}
      {!isFullPage && <BottomTabBar />}
    </>
  );
}