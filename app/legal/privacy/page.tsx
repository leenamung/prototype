import React from 'react';
import LegalNavigationBar from '@/app/components/domain/legal/LegalNavigationBar';
import PrivacyClientPage from '@/app/components/domain/legal/PrivacyClientPage';

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* 1. 네비게이션 바 */}
      <LegalNavigationBar title="개인정보 처리방침" />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <PrivacyClientPage />
      </div>
    </>
  );
}