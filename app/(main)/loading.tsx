import React from 'react';
import SkeletonStoryCarousel from '../components/domain/feed/StoryCarousel/ui/skeletons/SkeletonStoryCarousel';
import SkeletonDiaryCard from '../components/domain/feed/DiaryCard/ui/skeletons/SkeletonDiaryCard';

export default function Loading() {
  return (
    <main className="pt-20 px-5 pb-5">
      <SkeletonStoryCarousel />
      {/* 보통 화면에 2~3개 정도의 카드가 보이므로, 3개의 스켈레톤 카드를 보여줍니다. */}
      <div className="mt-4 space-y-4">
          <SkeletonDiaryCard />
          <SkeletonDiaryCard />
          <SkeletonDiaryCard />
      </div>
    </main>
  );
}