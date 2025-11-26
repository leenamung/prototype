import React from 'react';
import BlockedUsersClientPage from '@/app/components/domain/settings/BlockedUsers/BlockedUsersClientPage';
import BlockedUsersNavigationBar from '@/app/components/domain/settings/BlockedUsers/BlockedUsersNavigationBar';

export default function BlockedUsersPage() {
  return (
    <>
      {/* 1. 네비게이션 바 */}
      <BlockedUsersNavigationBar />

      {/* 2. 콘텐츠 영역 */}
      <div className="pt-14">
        <BlockedUsersClientPage />
      </div>
    </>
  );
}