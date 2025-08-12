// app/notifications/page.tsx
"use client";

import React from 'react';
import NotificationNavigationBar from './components/NotificationNavigationBar';
import NotificationGroup from './components/NotificationGroup';
import { sampleNotifications, groupNotificationsByTime } from './data/notificationSampleData';

export default function NotificationsPage() {
  // 샘플 데이터를 시간대별로 그룹화
  const groupedNotifications = groupNotificationsByTime(sampleNotifications);

  return (
    <div className="pt-14"> {/* 상단 네비게이션 바 높이만큼 패딩 */}
      <NotificationNavigationBar />
      
      <main>
        {Object.entries(groupedNotifications).map(([groupTitle, notifications]) => (
          <NotificationGroup 
            key={groupTitle} 
            title={groupTitle} 
            notifications={notifications} 
          />
        ))}
      </main>
    </div>
  );
}