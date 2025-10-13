// app/(main)/diary/[id]/page.tsx

import React from 'react';
import { diaryEntriesData } from '@/app/data/diaryEntries';
import DiaryDetailClient from '@/app/components/domain/diary/DiaryDetailClient'; // 순수 UI 컴포넌트 import
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getDiaryData(id: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return diaryEntriesData.find(diary => diary.id === id);
}

export default async function DiaryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const diaryData = await getDiaryData(id);

  if (!diaryData) {
    notFound(); // Next.js 13+의 공식 Not Found 처리
  }
  const PageBackButton = (
    <Link href="/" aria-label="피드로 돌아가기">
        <div className="fixed top-5 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
            <i className="ri-arrow-left-s-line ri-xl"></i>
        </div>
    </Link>
  );
  return <DiaryDetailClient diary={diaryData} backButton={PageBackButton} />;
}