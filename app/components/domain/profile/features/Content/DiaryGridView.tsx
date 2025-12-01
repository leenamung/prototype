"use client";

import React from 'react';
// ⬇️ 잘못된 import 경로를 수정했습니다.
import { MyDiaryEntry } from '@/app/data/profileSampleData'; 

interface DiaryGridItemProps {
  diary: MyDiaryEntry;
}

const DiaryGridItem: React.FC<DiaryGridItemProps> = ({ diary }) => {
  // ⬇️ 1. 감정(emotion)과 완성된 클래스 이름을 짝지어주는 '지도'를 만듭니다.
  const emotionOverlayMap: Record<MyDiaryEntry['emotion'], string> = {
    happy: 'bg-[var(--emotion-happy)]/15',
    sad: 'bg-[var(--emotion-sad)]/15',
    angry: 'bg-[var(--emotion-angry)]/15',
    calm: 'bg-[var(--emotion-calm)]/15',
    anxious: 'bg-[var(--emotion-anxious)]/15',
    neutral: 'bg-gray-400/15',
  };

  // ⬇️ 2. diary.emotion 값으로 지도에서 알맞은 클래스 이름을 찾아옵니다.
  const emotionOverlayClass = emotionOverlayMap[diary.emotion] || '';

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer aspect-square relative hover:shadow-md transition-shadow duration-150 ease-in-out group`}>
      {/* ⬇️ 3. 이제 Tailwind가 인식할 수 있는 완전한 클래스 이름이 적용됩니다. */}
      <div className={`absolute inset-0 ${emotionOverlayClass} opacity-75 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none`}></div> 
      <div className="relative z-10 p-3 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <span className="text-xs text-[var(--text-subtle)] font-medium">{diary.shortDate || diary.dateString}</span>
          <div className="w-5 h-5 flex items-center justify-center" title={diary.privacy}>
            <i className={`${diary.privacyIcon} text-[var(--color-sub-light-gray)] ri-sm`}></i>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center my-1">
          <i className={`${diary.typeIcon} ri-2x text-[var(--color-sub-light-gray)] opacity-75 group-hover:opacity-100 transition-opacity duration-150`}></i>
        </div>
        <h3 className="text-xs font-semibold text-[var(--text-main)] truncate">{diary.title}</h3>
      </div>
    </div>
  );
};

interface DiaryGridViewProps {
  diaries: MyDiaryEntry[];
}

const DiaryGridView: React.FC<DiaryGridViewProps> = ({ diaries }) => {
  if (!diaries || diaries.length === 0) {
    return <div className="py-12 text-center text-[var(--text-subtle)] text-sm">표시할 일기가 없습니다.</div>;
  }
  return (
    <div className="py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {diaries.map(diary => (
        <DiaryGridItem key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiaryGridView;