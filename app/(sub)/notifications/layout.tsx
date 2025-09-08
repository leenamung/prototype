import NotificationNavigationBar from '@/app/components/domain/notifications/NotificationNavigationBar';
import React from 'react';

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-14">
      <NotificationNavigationBar />
      {children}
    </div>
  );
}