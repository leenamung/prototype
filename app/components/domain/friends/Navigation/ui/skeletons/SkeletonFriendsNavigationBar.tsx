import React from 'react';

// Friends Page의 커스텀 헤더 스켈레톤
const SkeletonFriendsNavigationBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        {/* '친구' 타이틀 스켈레톤 */}
        <div className="h-6 w-12 bg-gray-200 rounded"></div>
        {/* '친구 요청' 아이콘 스켈레톤 */}
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </nav>
  );
};

export default SkeletonFriendsNavigationBar;