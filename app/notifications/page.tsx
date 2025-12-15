import React from 'react';
import { sampleNotifications, groupNotificationsByTime } from '../data/notificationSampleData';
// 1. 네비게이션 바 Import
import NotificationNavigationBar from '@/app/components/domain/notifications/layout/NotificationNavigationBar';
import NotificationDisplay from '../components/domain/notifications/views/NotificationDisplay';

async function getNotifications() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return groupNotificationsByTime(sampleNotifications);
}

export default async function NotificationsPage() {
  const notificationGroups = await getNotifications();

  return (
    <div className="flex flex-col h-full">
      
      {/* 1. 네비게이션 바 (flex-none) */}
      <NotificationNavigationBar />
      
      {/* 2. 콘텐츠 영역 (flex-1) */}
      {/* pt-14 제거, 내부 스크롤(overflow-y-auto) 적용 */}
      <div className="flex-1 overflow-y-auto">
        <NotificationDisplay groupedNotifications={notificationGroups} />
      </div>
    </div>
  );
}