import React from 'react';

const SkeletonAgitDetailNavigationBar = () => {
  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14 animate-pulse">
      <div className="flex items-center justify-between px-4 h-full">
        {/* 뒤로가기 버튼 */}
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        {/* 타이틀 (중앙 정렬 느낌) */}
        <div className="h-6 w-32 bg-gray-200 rounded mx-auto absolute left-1/2 -translate-x-1/2"></div>
        {/* 더보기 버튼 */}
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </nav>
  );
};

export default SkeletonAgitDetailNavigationBar;