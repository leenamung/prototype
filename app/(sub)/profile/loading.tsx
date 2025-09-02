// app/profile/loading.tsx (파일 교체)

import React from 'react';
import SkeletonProfileHeader from './components/SkeletonProfileHeader';
import SkeletonProfileTabs from './components/SkeletonProfileTabs';
import SkeletonProfileDiariesContent from './components/SkeletonProfileDiariesContent';

export default function Loading() {
  return (
    <>
      <SkeletonProfileHeader />
      <SkeletonProfileTabs />
      <div className="px-4 py-4">
        <SkeletonProfileDiariesContent />
      </div>
    </>
  );
}