import React from 'react';
import SkeletonAgitHeader from '@/app/components/domain/agit/AgitHeader/ui/skeletons/SkeletonAgitHeader';
import SkeletonAgitListTabs from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitListTabs'; // 아지트 목록에서 만든 탭 스켈레톤 재사용
import SkeletonAgitFeedCard from '@/app/components/domain/agit/AgitFeed/ui/skeletons/SkeletonAgitFeedCard';

export default function Loading() {
  return (
    <div>
      <SkeletonAgitHeader />
      <SkeletonAgitListTabs />
      <main className="p-4 space-y-4">
        <SkeletonAgitFeedCard />
        <SkeletonAgitFeedCard />
      </main>
    </div>
  );
}