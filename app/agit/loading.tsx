import React from 'react';
import SkeletonAgitListItem from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitListItem';
import SkeletonAgitListTabs from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitListTabs';
// 👈 [추가] 아지트 메인 네비게이션 스켈레톤 import
import SkeletonAgitMainNavigationBar from '@/app/components/domain/agit/ui/skeletons/SkeletonAgitMainNavigationBar';

export default function Loading() {
  return (
    <div>
      {/* 👈 [추가] 아지트 메인 네비게이션 스켈레톤 */}
      <SkeletonAgitMainNavigationBar />

      {/* 👈 [추가] pt-14 클래스를 가진 래퍼 div로 감싸기 */}
      <div className="pt-14">
        <SkeletonAgitListTabs />
        <main className="px-4 py-4">
          <SkeletonAgitListItem />
          <SkeletonAgitListItem />
          <SkeletonAgitListItem />
          <SkeletonAgitListItem />
        </main>
      </div>
    </div>
  );
}