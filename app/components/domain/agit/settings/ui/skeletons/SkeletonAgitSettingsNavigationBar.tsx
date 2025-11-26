import React from 'react';

const SkeletonAgitSettingsNavigationBar = () => (
  <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 animate-pulse">
    <div className="flex items-center justify-between px-4 py-3 h-14">
      {/* 취소 버튼 */}
      <div className="h-5 w-10 bg-gray-200 rounded-md"></div>
      {/* 타이틀 */}
      <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
      {/* 저장 버튼 */}
      <div className="h-5 w-10 bg-gray-200 rounded-md"></div>
    </div>
  </nav>
);

export default SkeletonAgitSettingsNavigationBar;