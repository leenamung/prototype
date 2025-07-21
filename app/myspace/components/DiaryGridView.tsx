"use client";

import React from 'react';
import { MyDiaryEntry } from '../data/mySpaceSampleData'; 

interface DiaryGridItemProps {
  diary: MyDiaryEntry;
}

const DiaryGridItem: React.FC<DiaryGridItemProps> = ({ diary }) => {
  const emotionOverlayClass = diary.emotion ? `bg-[var(--emotion-${diary.emotion})]/15` : ''; 

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer aspect-square relative hover:shadow-md transition-shadow duration-150 ease-in-out group`} 
    >
      <div className={`absolute inset-0 ${emotionOverlayClass} opacity-75 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none`}></div> 
      
      <div className="relative z-10 p-3 flex flex-col h-full">
        <div className="flex justify-between items-start">
          {/* ✨ 날짜 텍스트 색상 text-[var(--text-subtle)] 적용 (더 어둡게 변경) */}
          <span className="text-xs text-[var(--text-subtle)] font-medium">{diary.shortDate || diary.dateString}</span>
          <div className="w-5 h-5 flex items-center justify-center" title={diary.privacy}>
            <i className={`${diary.privacyIcon} text-[var(--color-sub-light-gray)] ri-sm`}></i> {/* 아이콘 색상 유지 또는 --text-subtle 고려 */}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center my-1">
          <i className={`${diary.typeIcon} ri-2x text-[var(--color-sub-light-gray)] opacity-75 group-hover:opacity-100 transition-opacity duration-150`}></i>
        </div>
        {/* ✨ 제목 텍스트 색상 text-[var(--text-main)] 적용 */}
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
    // ✨ 메시지 텍스트 색상 text-[var(--text-subtle)] 적용
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
