// app/agit/components/SkeletonAgitMainNavigationBar.tsx (새 파일)

import React from 'react';

const SkeletonAgitMainNavigationBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 shadow-sm z-20 animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        {/* 타이틀 스켈레톤 */}
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        {/* 오른쪽 아이콘 그룹 스켈레톤 */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </nav>
  );
};

export default SkeletonAgitMainNavigationBar;