import React from 'react';
import SkeletonAgitListItem from '../../components/domain/agit/ui/skeletons/SkeletonAgitListItem';
import SkeletonAgitListTabs from '../../components/domain/agit/ui/skeletons/SkeletonAgitListTabs';

export default function Loading() {
  return (
    <div>
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