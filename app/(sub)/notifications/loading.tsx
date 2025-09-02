// app/notifications/loading.tsx

import React from 'react';
import NotificationNavigationBar from './components/NotificationNavigationBar';
import SkeletonNotificationGroup from './components/SkeletonNotificationGroup';

export default function Loading() {
  // NotificationNavigationBar는 정적이라 그대로 두고,
  // 실제 콘텐츠 영역만 스켈레톤 UI로 대체합니다.
  return (
    <div className="pt-14">
      <NotificationNavigationBar />
      <main>
        <SkeletonNotificationGroup />
        <SkeletonNotificationGroup />
      </main>
    </div>
  );
}