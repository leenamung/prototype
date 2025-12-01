import React from 'react';
import SkeletonAgitDetailNavigationBar from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitDetailNavigationBar';
import SkeletonAgitHeader from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitHeader';
import SkeletonAgitListTabs from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitListTabs'; // 아지트 목록에서 만든 탭 스켈레톤 재사용
import SkeletonAgitFeedCard from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitFeedCard';

export default function Loading() {
  return (
    <div className="flex flex-col h-full w-full">
      
      {/* 1. 네비게이션 바 (Flex Item, 높이 고정) */}
      <SkeletonAgitDetailNavigationBar />

      {/* 2. 콘텐츠 영역 (Flex Item, 남은 공간 채움, 내부 스크롤) */}
      <div className="flex-1 overflow-y-auto bg-[var(--color-background)]">
        <SkeletonAgitHeader />
        
        <SkeletonAgitListTabs />
        
        <main className="p-4 space-y-4">
          <SkeletonAgitFeedCard />
          <SkeletonAgitFeedCard />
        </main>
      </div>
    </div>
  );
}