import React from 'react';
import SkeletonMessageListItem from '@/app/components/domain/direct/MessageList/ui/skeletons/SkeletonMessageListItem';
// 1. 네비게이션 바 스켈레톤 import
import SkeletonDirectNavigationBar from '@/app/components/domain/direct/MessageList/ui/skeletons/SkeletonDirectNavigationBar';

export default function Loading() {
  return (
    <>
      {/* 2. 네비게이션 바 스켈레톤 추가 */}
      <SkeletonDirectNavigationBar />

      {/* 3. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <main className="pt-14">
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
        <SkeletonMessageListItem />
      </main>
    </>
  );
}