import React from 'react';
import LegalNavigationBar from '@/app/components/domain/legal/layout/LegalNavigationBar';
import TermsClientPage from '@/app/components/domain/legal/views/TermsClientPage';

export default function TermsPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-component-bg)]">
      {/* 1. 네비게이션 바 (flex-none) */}
      <LegalNavigationBar title="이용약관" />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto">
        <TermsClientPage />
      </div>
    </div>
  );
}