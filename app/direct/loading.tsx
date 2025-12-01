import React from 'react';
import SkeletonMessageListItem from '@/app/components/domain/direct/ui/skeletons/SkeletonMessageListItem';
// 1. 네비게이션 바 스켈레톤 import
import SkeletonDirectNavigationBar from '@/app/components/domain/direct/ui/skeletons/SkeletonDirectNavigationBar';

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <SkeletonDirectNavigationBar />

      <main className="flex-1 overflow-y-auto">
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
      </main>
    </div>
  );
}