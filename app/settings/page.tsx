import React from 'react';
import SettingsClientPage from '@/app/components/domain/settings/SettingsClientPage';
import SettingsNavigationBar from '@/app/components/domain/settings/Navigation/SettingsNavigationBar';

export default function SettingsPage() {
  return (
    <>
      {/* 1. 설정 페이지 전용 네비게이션 바 */}
      <SettingsNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <SettingsClientPage />
      </div>
    </>
  );
}