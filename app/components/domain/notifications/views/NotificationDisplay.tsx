"use client";
import React from 'react';
import type { Notification } from '@/app/data/notificationSampleData';
import NotificationGroup from '../features/List/NotificationGroup';
import EmptyNotifications from '../ui/empty/EmptyNotifications';

interface NotificationDisplayProps {
  groupedNotifications: Record<string, Notification[]>;
}

export default function NotificationDisplay({ groupedNotifications }: NotificationDisplayProps) {
  const hasNotifications = Object.keys(groupedNotifications).length > 0;

  return (
    <main className="min-h-full">
      {hasNotifications ? (
        // ✅ [수정] pb-20 -> pb-4 (하단 탭바와 겹치지 않으므로 적당한 여백만 줌)
        <div className="pb-4">
          {Object.entries(groupedNotifications).map(([groupTitle, notifications]) => (
            <NotificationGroup
              key={groupTitle} 
              title={groupTitle} 
              notifications={notifications} 
            />
          ))}
        </div>
      ) : (
        <EmptyNotifications />
      )}
    </main>
  );
}