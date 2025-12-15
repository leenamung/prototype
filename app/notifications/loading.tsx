import React from 'react';
import SkeletonNotificationGroup from '@/app/components/domain/notifications/ui/skeletons/SkeletonNotificationGroup';
import SkeletonNotificationNavigationBar from '@/app/components/domain/notifications/ui/skeletons/SkeletonNotificationNavigationBar';

export default function Loading() {
  // NotificationNavigationBar는 정적이라 그대로 두고,
  // 실제 콘텐츠 영역만 스켈레톤 UI로 대체합니다.
  return (
    <div className="flex flex-col h-full">
      
      {/* 1. 네비게이션 바 스켈레톤 (flex-none) */}
      <SkeletonNotificationNavigationBar />
      
      {/* 2. 콘텐츠 스켈레톤 영역 (flex-1) */}
      {/* pt-14 제거 */}
      <main className="flex-1 overflow-y-auto">
        <SkeletonNotificationGroup />
        <SkeletonNotificationGroup />
      </main>
    </div>
  );
}