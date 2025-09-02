// app/profile/components/DiaryListView.tsx (수정)
"use client";

import React from 'react';
import { MyDiaryEntry } from '../data/profileSampleData'; 

interface DiaryListItemProps {
  diary: MyDiaryEntry;
}

const DiaryListItem: React.FC<DiaryListItemProps> = ({ diary }) => {
  // ⬇️ 1. 감정(emotion)과 완성된 클래스 이름을 짝지어주는 '지도'를 만듭니다.
  const emotionColorMap: Record<MyDiaryEntry['emotion'], string> = {
    happy: 'bg-[var(--emotion-happy)]',
    sad: 'bg-[var(--emotion-sad)]',
    angry: 'bg-[var(--emotion-angry)]',
    calm: 'bg-[var(--emotion-calm)]',
    anxious: 'bg-[var(--emotion-anxious)]',
    neutral: 'bg-[var(--emotion-neutral)]',
  };

  // ⬇️ 2. diary.emotion 값으로 지도에서 알맞은 클래스 이름을 찾아옵니다.
  const emotionBarClass = emotionColorMap[diary.emotion] || 'bg-gray-300';

  return (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-150 ease-in-out">
      {/* ⬇️ 3. 이제 Tailwind가 인식할 수 있는 완전한 클래스 이름이 적용됩니다. */}
      <div className={`w-1.5 ${emotionBarClass}`}></div>
      <div className="flex-1 p-3">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs text-[var(--text-subtle)]">{diary.dateString} {diary.time && `- ${diary.time}`}</span>
          <div className="w-5 h-5 flex items-center justify-center" title={diary.privacy}>
            <i className={`${diary.privacyIcon} text-[var(--color-sub-light-gray)] ri-sm`}></i>
          </div>
        </div>
        <h3 className="font-semibold text-[var(--text-main)] mt-1 mb-0.5 text-sm">{diary.title}</h3>
        <p className="text-xs text-[var(--text-subtle)] line-clamp-2">{diary.contentSnippet}</p>
        <div className="flex mt-1.5">
          <div className="w-5 h-5 flex items-center justify-center" title={diary.type}>
            <i className={`${diary.typeIcon} text-[var(--color-sub-light-gray)] ri-sm`}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DiaryListViewProps {
  diaries: MyDiaryEntry[];
}

const DiaryListView: React.FC<DiaryListViewProps> = ({ diaries }) => {
  if (!diaries || diaries.length === 0) {
    return <div className="py-12 text-center text-[var(--text-subtle)] text-sm">표시할 일기가 없습니다.</div>;
  }
  return (
    <div className="py-4 space-y-3">
      {diaries.map(diary => (
        <DiaryListItem key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiaryListView;