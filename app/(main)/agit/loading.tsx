// app/agit/loading.tsx (최종 수정)

import React from 'react';
import SkeletonAgitListItem from '../../components/SkeletonAgitListItem';
import SkeletonAgitListTabs from './components/SkeletonAgitListTabs';

export default function Loading() {
  return (
    <div>
      {/* ⬇️ 문제가 발생했던 부분을 모두 스켈레톤 컴포넌트로 교체합니다. */}
      <SkeletonAgitListTabs />

      <main className="px-4 py-4">
        <SkeletonAgitListItem />
        <SkeletonAgitListItem />
        <SkeletonAgitListItem />
        <SkeletonAgitListItem />
      </main>
    </div>
  );
}