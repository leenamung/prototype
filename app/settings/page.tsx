import React from 'react';
import SettingsClientPage from '@/app/components/domain/settings/views/SettingsClientPage';
import SettingsNavigationBar from '@/app/components/domain/settings/layout/SettingsNavigationBar';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      {/* 1. 설정 페이지 전용 네비게이션 바 (flex-none) */}
      <SettingsNavigationBar />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto">
        <SettingsClientPage />
      </div>
    </div>
  );
}