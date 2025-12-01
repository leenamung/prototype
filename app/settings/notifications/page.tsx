import React from 'react';
import NotificationsClientPage from '@/app/components/domain/settings/views/NotificationsClientPage';
import NotificationsNavigationBar from '@/app/components/domain/settings/layout/NotificationsNavigationBar';

export default function NotificationSettingsPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      {/* 1. 네비게이션 바 (flex-none) */}
      <NotificationsNavigationBar />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto">
        <NotificationsClientPage />
      </div>
    </div>
  );
}