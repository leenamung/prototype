// app/agit/[id]/loading.tsx (새 파일)

import React from 'react';
import SkeletonAgitHeader from '../components/SkeletonAgitHeader';
import SkeletonAgitListTabs from '../components/SkeletonAgitListTabs'; // 아지트 목록에서 만든 탭 스켈레톤 재사용
import SkeletonAgitFeedCard from '../components/SkeletonAgitFeedCard';

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