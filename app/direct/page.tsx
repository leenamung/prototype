import React from 'react';
import { sampleMessageThreads } from '../data/messageSampleData';
import DirectClientPage from '../components/domain/direct/views/DirectClientPage';
// 1. 네비게이션 바 Import
import DirectNavigationBar from '@/app/components/domain/direct/layout/DirectNavigationBar';

async function getMessageThreads() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // return []; // 빈 상태 테스트 시 주석 해제
  return sampleMessageThreads;
}

export default async function DirectMessagesPage() {
  const threads = await getMessageThreads();
  
  return (
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      {/* 1. 네비게이션 바 (flex-none) */}
      <DirectNavigationBar />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto">
        <DirectClientPage threads={threads} />
      </div>
    </div>
  );
}