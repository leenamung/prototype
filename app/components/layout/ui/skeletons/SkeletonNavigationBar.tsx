import React from 'react';

const SkeletonNavigationBar = () => {
  return (
    // ✅ [신규] Flex Item 스타일 적용
    <div className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-50 h-14 animate-pulse">
      <div className="flex items-center justify-between px-4 h-full">
        {/* 로고 스켈레톤 */}
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        {/* 우측 아이콘 스켈레톤 */}
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonNavigationBar;