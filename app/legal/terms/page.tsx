import React from 'react';
import LegalNavigationBar from '@/app/components/domain/legal/LegalNavigationBar';
import TermsClientPage from '@/app/components/domain/legal/TermsClientPage';

export default function TermsPage() {
  return (
    <>
      {/* 1. 네비게이션 바 */}
      <LegalNavigationBar title="이용약관" />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <TermsClientPage />
      </div>
    </>
  );
}