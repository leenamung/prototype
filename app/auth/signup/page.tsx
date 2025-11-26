import React from 'react';
import SignUpClientPage from '@/app/components/domain/auth/SignUpClientPage';
import SignUpNavigationBar from '@/app/components/domain/auth/SignUpNavigationBar';

export default function SignUpPage() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      {/* 1. 네비게이션 바 */}
      <SignUpNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <SignUpClientPage />
      </div>
    </div>
  );
}