import React from 'react';
import { diaryEntriesData } from '@/app/data/diaryEntries';
import DiaryDetailClient from '@/app/components/domain/diary/DiaryDetailClient';

async function getDiaryData(id: string) {
  console.log("요청된 일기 ID:", id);
  await new Promise(resolve => setTimeout(resolve, 2000));
  // 실제로는 id에 맞는 데이터를 찾아야 합니다.
  return diaryEntriesData.find(diary => diary.id === id);
}

export default async function DiaryDetailPage({ params }: { params: { id: string } }) {
  const diaryData = await getDiaryData(params.id);
  if (!diaryData) {
    return <div>일기를 찾을 수 없습니다.</div>
  }
  return <DiaryDetailClient diary={diaryData} />;
}