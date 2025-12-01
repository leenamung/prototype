import React from 'react';
import { diaryEntriesData } from '@/app/data/diaryEntries';
import { notFound } from 'next/navigation';
import DiaryDetailNavigationBar from '@/app/components/domain/diary/layout/DiaryDetailNavigationBar'; // 👈 네비게이션 바 import
import DiaryDetailClient from '@/app/components/domain/diary/views/DiaryDetailClient';

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
    <div className="flex flex-col h-full w-full bg-[var(--color-background)]">
      {/* 1. 네비게이션 바 (flex-none) */}
      <DiaryDetailNavigationBar 
        dateString={diaryData.dateString}
        weatherIcon={diaryData.weatherIcon}
      />

      {/* 2. 상세 콘텐츠 (flex-1) */}
      {/* DiaryDetailClient 내부에서 스크롤과 하단 바 위치를 제어하므로 여기서는 overflow-hidden */}
      <div className="flex-1 overflow-hidden relative">
        <DiaryDetailClient diary={diaryData} />
      </div>
    </div>
  );
}