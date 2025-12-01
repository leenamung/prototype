import React from 'react';
import SkeletonStoryCarousel from '@/app/components/domain/feed/ui/skeletons/SkeletonStoryCarousel';
import SkeletonDiaryCard from '@/app/components/domain/feed/ui/skeletons/SkeletonDiaryCard';
import SkeletonNavigationBar from '@/app/components/layout/ui/skeletons/SkeletonNavigationBar';

export default function Loading() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      {/* 1. 네비게이션 바 스켈레톤 (flex-none) */}
      <SkeletonNavigationBar />

      {/* 2. 콘텐츠 스켈레톤 (flex-1) */}
      {/* pt-20 등 고정 패딩 제거 -> py-5 */}
      <main className="flex-1 overflow-y-auto px-5 py-5">
        <SkeletonStoryCarousel />
        <div className="mt-4 space-y-4">
            <SkeletonDiaryCard />
            <SkeletonDiaryCard />
            <SkeletonDiaryCard />
        </div>
      </main>
    </div>
  );
}