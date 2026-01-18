"use client";
import React from 'react';

const SkeletonAgitListTabs = () => {
  return (
    <div className="sticky top-14 z-30 w-full bg-[var(--color-background)] border-b border-[var(--color-border)]">
      <div className="flex w-full">
        
        {/* Tab 1: 나의 아지트 */}
        <div className="flex-1 flex flex-col items-center justify-center h-[48px] px-1 relative">
          <div className="w-20 h-4 bg-[var(--color-subtle-bg)] rounded-sm animate-pulse mb-1"></div>
          {/* Active Indicator Placeholder */}
          <div className="absolute bottom-0 w-full h-[2px] bg-[var(--color-subtle-bg)]/50 animate-pulse"></div>
        </div>

        {/* Tab 2: 아지트 탐색 */}
        <div className="flex-1 flex flex-col items-center justify-center h-[48px] px-1 relative">
           <div className="w-20 h-4 bg-[var(--color-subtle-bg)]/60 rounded-sm animate-pulse mb-1"></div>
        </div>

      </div>
    </div>
  );
};

export default SkeletonAgitListTabs;