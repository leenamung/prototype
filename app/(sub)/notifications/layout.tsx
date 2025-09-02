// app/(sub)/notifications/layout.tsx (새 파일)
import React from 'react';
import NotificationNavigationBar from './components/NotificationNavigationBar';

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-14">
      <NotificationNavigationBar />
      {children}
    </div>
  );
}