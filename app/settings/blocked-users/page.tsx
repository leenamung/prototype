import React from 'react';
import BlockedUsersClientPage from '@/app/components/domain/settings/views/BlockedUsersClientPage';
import BlockedUsersNavigationBar from '@/app/components/domain/settings/layout/BlockedUsersNavigationBar';

export default function BlockedUsersPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      {/* 1. 네비게이션 바 (flex-none) */}
      <BlockedUsersNavigationBar />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto">
        <BlockedUsersClientPage />
      </div>
    </div>
  );
}