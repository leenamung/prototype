import React from 'react';
import { sampleMessageThreads } from '../data/messageSampleData';
import DirectClientPage from '../components/domain/direct/DirectClientPage';
// 1. 네비게이션 바 Import
import DirectNavigationBar from '@/app/components/domain/direct/MessageList/DirectNavigationBar';

async function getMessageThreads() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // return []; // 빈 상태 테스트 시 주석 해제
  return sampleMessageThreads;
}

export default async function DirectMessagesPage() {
  const threads = await getMessageThreads();
  
  return (
    <>
      {/* 2. 네비게이션 바 */}
      <DirectNavigationBar />

      {/* 3. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <DirectClientPage threads={threads} />
      </div>
    </>
  );
}