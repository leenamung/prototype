"use client";
import React from 'react';

const SkeletonAgitMainNavigationBar = () => {
  return (
    <nav className="fixed top-0 z-40 w-full bg-[var(--color-component-bg)]/95 border-b border-[var(--color-border)] h-14">
      <div className="flex items-center justify-between px-4 h-full">
        
        {/* [Left Spacer] 실제 UI와 동일하게 좌측 여백 확보 */}
        <div className="w-8"></div>

        {/* [Center Title] 중앙 타이틀 스켈레톤 */}
        <div className="w-24 h-6 bg-[var(--color-subtle-bg)] rounded-md animate-pulse"></div>

        {/* [Right Action] 우측 아이콘(검색 등) 스켈레톤 */}
        <div className="w-8 h-8"></div>
      
      </div>
    </nav>
  );
};

export default SkeletonAgitMainNavigationBar;