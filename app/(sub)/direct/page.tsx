import React from 'react';
import { sampleMessageThreads } from '../../data/messageSampleData';
import DirectClientPage from '../../components/domain/direct/DirectClientPage';

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션
async function getMessageThreads() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // ❗️메시지가 없는 상황을 테스트하려면 아래 주석을 해제하세요.
  // return [];
  return sampleMessageThreads;
}

export default async function DirectMessagesPage() {
  const threads = await getMessageThreads();
  return <DirectClientPage threads={threads} />;
}