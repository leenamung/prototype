import React from 'react';
import SetupProfileClientPage from '@/app/components/domain/auth/views/SetupProfileClientPage';
import SetupProfileNavigationBar from '@/app/components/domain/auth/layout/SetupProfileNavigationBar';

export default function SetupProfilePage() {
  return (
    <div className="flex flex-col h-full">
      {/* 1. 네비게이션 바 */}
      <SetupProfileNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="flex-1 overflow-y-auto">
        <SetupProfileClientPage />
      </div>
    </div>
  );
}