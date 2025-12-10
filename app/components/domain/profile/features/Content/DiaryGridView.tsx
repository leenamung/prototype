"use client";

import React from 'react';
import { MyDiaryEntry } from '@/app/data/profileSampleData'; 

interface DiaryGridItemProps {
  diary: MyDiaryEntry;
}

const DiaryGridItem: React.FC<DiaryGridItemProps> = ({ diary }) => {
  // ⭐️ CSS 변수로 스타일 정의
  const bgVar = `var(--emotion-${diary.emotion})`;
  const borderVar = `var(--emotion-${diary.emotion}-border, var(--color-border))`;

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer aspect-square relative hover:shadow-md transition-shadow duration-150 ease-in-out group border`}
      // ⭐️ 앙주 스타일: 연한 배경색 + 진한 테두리
      style={{
        borderColor: borderVar,
        backgroundColor: `color-mix(in srgb, ${bgVar} 15%, white)`
      }}
    >
      <div className="relative z-10 p-3 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <span className="text-xs text-[var(--text-subtle)] font-medium">{diary.shortDate || diary.dateString}</span>
          <div className="w-5 h-5 flex items-center justify-center" title={diary.privacy}>
            <i className={`${diary.privacyIcon} text-[var(--color-sub-light-gray)] ri-sm`}></i>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center my-1">
          {/* 아이콘 색상도 감정 색상으로 변경 */}
          <i className={`${diary.typeIcon} ri-2x opacity-50 group-hover:opacity-100 transition-opacity duration-150`} style={{ color: borderVar }}></i>
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