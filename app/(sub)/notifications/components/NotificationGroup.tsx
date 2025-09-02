// app/notifications/components/NotificationGroup.tsx
"use client";

import React from 'react';
import NotificationItem from './NotificationItem';
import type { Notification } from '../data/notificationSampleData';

interface NotificationGroupProps {
  title: string;
  notifications: Notification[];
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({ title, notifications }) => {
  return (
    <div className="px-4 py-3">
      <h2 className="font-semibold text-[var(--text-main)] mb-3">{title}</h2>
      <div className="space-y-3">
        {notifications.map(notification => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationGroup;