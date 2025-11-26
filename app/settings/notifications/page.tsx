import React from 'react';
import NotificationsClientPage from '@/app/components/domain/settings/Notifications/NotificationsClientPage';
import NotificationsNavigationBar from '@/app/components/domain/settings/Notifications/NotificationsNavigationBar';

export default function NotificationSettingsPage() {
  return (
    <>
      {/* 1. 네비게이션 바 */}
      <NotificationsNavigationBar />

      {/* 2. 콘텐츠 영역 */}
      <div className="pt-14">
        <NotificationsClientPage />
      </div>
    </>
  );
}