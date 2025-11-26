import React from 'react';
import SkeletonAgitListItem from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitListItem';

export default function Loading() {
  return (
    <div>
      {/* 1. 검색 네비게이션 바 스켈레톤 */}
      <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 animate-pulse">
        <div className="flex items-center px-4 py-3 h-14 space-x-3">
          {/* 검색창 */}
          <div className="flex-1 h-9 bg-gray-200 rounded-lg"></div>
          {/* 취소 버튼 */}
          <div className="h-6 w-10 bg-gray-200 rounded-md"></div>
        </div>
      </nav>

      {/* 2. 검색 결과 스켈레톤 (pt-14) */}
      <main className="pt-14 px-4 py-4">
        {/* 로딩 시에는 보통 스켈레톤 목록을 바로 보여줍니다. */}
        <SkeletonAgitListItem />
        <SkeletonAgitListItem />
        <SkeletonAgitListItem />
        <SkeletonAgitListItem />
      </main>
    </div>
  );
}