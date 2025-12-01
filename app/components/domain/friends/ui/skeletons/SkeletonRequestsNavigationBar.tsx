import React from 'react';

// Friend Requests Page의 커스텀 헤더 스켈레톤
const SkeletonRequestsNavigationBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        {/* '뒤로가기' 아이콘 스켈레톤 */}
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        {/* '친구 요청' 타이틀 스켈레톤 */}
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
        {/* 오른쪽 빈 공간 */}
        <div className="w-8"></div>
      </div>
    </nav>
  );
};

export default SkeletonRequestsNavigationBar;