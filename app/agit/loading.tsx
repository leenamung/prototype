import React from 'react';
import AgitListSkeleton from '@/app/components/domain/agit/ui/skeletons/AgitListSkeleton';
import SkeletonAgitListTabs from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitListTabs';
// 👈 [추가] 아지트 메인 네비게이션 스켈레톤 import
import SkeletonAgitMainNavigationBar from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitMainNavigationBar';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-background)]">
      {/* 1. 네비게이션 스켈레톤 */}
      <SkeletonAgitMainNavigationBar />

      <div className="pt-14">
        {/* 2. 탭 스켈레톤 */}
        <SkeletonAgitListTabs />
        
        {/* 3. 리스트 스켈레톤 
            기존처럼 <SkeletonAgitListItem />을 여러 번 쓸 필요 없이,
            이거 하나면 내부에서 4개를 알아서 그려줍니다.
        */}
        <main className="px-4 mt-2">
          <AgitListSkeleton />
        </main>
      </div>
    </div>
  );
}