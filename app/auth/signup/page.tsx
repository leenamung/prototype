import React from 'react';
import SignUpClientPage from '@/app/components/domain/auth/views/SignUpClientPage';
import SignUpNavigationBar from '@/app/components/domain/auth/layout/SignUpNavigationBar';

export default function SignUpPage() {
  return (
    <div className="flex flex-col h-full">
      {/* 1. 네비게이션 바 */}
      <SignUpNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="flex-1 overflow-y-auto">
        <SignUpClientPage />
      </div>
    </div>
  );
}