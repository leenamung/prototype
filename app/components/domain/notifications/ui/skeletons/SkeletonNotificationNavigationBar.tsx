import React from 'react';

const SkeletonNotificationNavigationBar = () => {
  return (
    <div className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14 animate-pulse">
      <div className="flex items-center justify-between px-4 h-full relative">
        {/* 뒤로가기 버튼 스켈레톤 */}
        <div className="w-8 h-8 rounded-full bg-gray-200 absolute left-4"></div>
        {/* 타이틀 스켈레톤 (중앙 정렬) */}
        <div className="h-6 w-16 bg-gray-200 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default SkeletonNotificationNavigationBar;