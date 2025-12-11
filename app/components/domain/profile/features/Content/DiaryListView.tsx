"use client";

import React from 'react';
import { MyDiaryEntry } from '@/app/data/profileSampleData'; 

interface DiaryListItemProps {
  diary: MyDiaryEntry;
}

const DiaryListItem: React.FC<DiaryListItemProps> = ({ diary }) => {
  // ⭐️ CSS 변수로 색상 정의
  const borderVar = `var(--emotion-${diary.emotion}-border, var(--color-border))`;

  return (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-150 ease-in-out">
      {/* ⭐️ 왼쪽 컬러바: 진한 외곽선 색상 사용 */}
      <div className="w-1.5" style={{ backgroundColor: borderVar }}></div>
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