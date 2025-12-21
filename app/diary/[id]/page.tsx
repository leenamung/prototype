import React from 'react';
import { diaryEntriesData } from '@/app/data/diaryEntries';
import { notFound } from 'next/navigation';
import DiaryDetailClient from '@/app/components/domain/diary/views/DiaryDetailClient';

async function getDiaryData(id: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return diaryEntriesData.find(diary => diary.id === id);
}
// 🎲 랜덤 타이틀 생성기 (서버 사이드 렌더링 시 실행됨)
const generateEmotionalTitle = (dateString: string, authorName: string) => {
  // 1. 날짜 파싱 ("2025년 9월 26일" -> "9월 26일")
  const dateParts = dateString.split(' ');
  // 데이터 형식이 맞지 않을 경우 원본 유지
  const dateOnly = dateParts.length >= 3 
    ? `${dateParts[1]} ${dateParts[2]}` 
    : dateString;

  // 2. UX Writing 옵션 A, B, C (디자이너님 컨펌 완료 ⭐️)
  const templates = [
    `${dateOnly}에 담긴, ${authorName}의 첫 번째 마음`,      // Option A: 감성
    `${authorName}가 ${dateOnly}에 기록한 첫 페이지`,        // Option B: 서사
    `${authorName}의 ${dateOnly}, 그 첫 번째 이야기`         // Option C: 소유
  ];

  // 3. 랜덤 선택
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

export default async function DiaryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const diary = await getDiaryData(id);

  if (!diary) {
    notFound();
  }
  const emotionalHeader = generateEmotionalTitle(diary.dateString, diary.author.name);
  return (
    <div className="relative w-full h-full bg-[var(--color-background)]">
      {/* ✨ [수정] 네비게이션 바 제거 후 Client에게 데이터 전달 */}
      <DiaryDetailClient 
        diary={diary} 
        headerTitle={emotionalHeader} 
      />
    </div>
  );
}