import React from 'react';
import OnboardingClientPage from '@/app/components/domain/auth/views/OnboardingClientPage';
import OnboardingNavigationBar from '@/app/components/domain/auth/layout/OnboardingNavigationBar';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      {/* 1. 네비게이션 바 */}
      <OnboardingNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="flex-1 overflow-y-auto">
        <OnboardingClientPage />
      </div>
    </div>
  );
}