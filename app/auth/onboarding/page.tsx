import React from 'react';
import OnboardingClientPage from '@/app/components/domain/auth/OnboardingClientPage';
import OnboardingNavigationBar from '@/app/components/domain/auth/OnboardingNavigationBar';

export default function OnboardingPage() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      {/* 1. 네비게이션 바 */}
      <OnboardingNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <OnboardingClientPage />
      </div>
    </div>
  );
}