import React from 'react';
import { diaryEntriesData } from '@/app/data/diaryEntries';
import DiaryDetailClient from '@/app/components/domain/diary/DiaryDetailClient';
import { notFound } from 'next/navigation';
import DiaryDetailNavigationBar from '@/app/components/domain/diary/Navigation/DiaryDetailNavigationBar'; // 👈 네비게이션 바 import

async function getDiaryData(id: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return diaryEntriesData.find(diary => diary.id === id);
}

export default async function DiaryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const diaryData = await getDiaryData(id);

  if (!diaryData) {
    notFound();
  }

  return (
    <>
      {/* 1. 네비게이션 바 (페이지 상단 고정) */}
      <DiaryDetailNavigationBar 
        dateString={diaryData.dateString}
        weatherIcon={diaryData.weatherIcon}
      />

      {/* 2. 상세 콘텐츠 */}
      {/* DiaryDetailClient 내부에서 배경과 패딩을 처리하므로 별도 div 필요 없음 */}
      <DiaryDetailClient diary={diaryData} />
    </>
  );
}