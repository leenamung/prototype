import React from 'react';
import LegalNavigationBar from '@/app/components/domain/legal/layout/LegalNavigationBar';
import PrivacyClientPage from '@/app/components/domain/legal/views/PrivacyClientPage';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-component-bg)]">
      {/* 1. 네비게이션 바 (flex-none) */}
      <LegalNavigationBar title="개인정보 처리방침" />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거. 이제 LegalContent가 바로 아래에 배치됨 */}
      <div className="flex-1 overflow-y-auto">
        <PrivacyClientPage />
      </div>
    </div>
  );
}