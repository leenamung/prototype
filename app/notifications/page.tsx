import React from 'react';
import { sampleNotifications, groupNotificationsByTime } from '../data/notificationSampleData';
import NotificationDisplay from '@/app/components/domain/notifications/NotificationDisplay';
// 1. 네비게이션 바 Import
import NotificationNavigationBar from '@/app/components/domain/notifications/NotificationNavigationBar';

async function getNotifications() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return groupNotificationsByTime(sampleNotifications);
}

export default async function NotificationsPage() {
  const notificationGroups = await getNotifications();

  return (
    <>
      {/* 1. 네비게이션 바 */}
      <NotificationNavigationBar />
      
      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <NotificationDisplay groupedNotifications={notificationGroups} />
      </div>
    </>
  );
}