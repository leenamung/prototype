"use client";

import React from 'react';
import NotificationGroup from './NotificationGroup';
import type { Notification } from '../../../data/notificationSampleData';
import EmptyNotifications from './ui/empty/EmptyNotifications';

interface NotificationDisplayProps {
  groupedNotifications: { [key: string]: Notification[] };
}

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({ groupedNotifications }) => {
  const isEmpty = Object.keys(groupedNotifications).length === 0;

  if (isEmpty) {
    return <EmptyNotifications />;
  }
  return (
    <main>
      {Object.entries(groupedNotifications).map(([groupTitle, notifications]) => (
        <NotificationGroup 
          key={groupTitle} 
          title={groupTitle} 
          notifications={notifications} 
        />
      ))}
    </main>
  );
};

export default NotificationDisplay;