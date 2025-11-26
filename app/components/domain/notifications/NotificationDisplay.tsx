"use client";
import React from 'react';
import NotificationGroup from './NotificationGroup';
import EmptyNotifications from './ui/empty/EmptyNotifications';
import type { Notification } from '@/app/data/notificationSampleData';

interface NotificationDisplayProps {
  groupedNotifications: Record<string, Notification[]>;
}

export default function NotificationDisplay({ groupedNotifications }: NotificationDisplayProps) {
  const hasNotifications = Object.keys(groupedNotifications).length > 0;

  return (
    // ✅ 네비게이션 바 제거됨
    // ✅ pt-14 제거 (부모 page.tsx에서 처리)
    <main className="min-h-screen bg-[var(--color-background)]">
      {hasNotifications ? (
        <div className="pb-20">
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