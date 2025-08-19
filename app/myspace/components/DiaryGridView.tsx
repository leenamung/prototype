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
      className={`bg-[var(--color-component-bg)] rounded-lg overflow-hidden shadow-sm cursor-pointer aspect-square relative hover:shadow-md transition-shadow duration-150 ease-in-out group border border-[var(--color-border)]`} 
    >
      <div className={`absolute inset-0 ${emotionOverlayClass} opacity-75 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none`}></div> 
      
      <div className="relative z-10 p-3 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <span className="text-xs text-[var(--text-subtle)] font-medium">{diary.shortDate || diary.dateString}</span>
          <div className="w-5 h-5 flex items-center justify-center" title={diary.privacy}>
            <i className={`${diary.privacyIcon} text-[var(--color-border)] ri-sm`}></i>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center my-1">
          <i className={`${diary.typeIcon} ri-2x text-[var(--color-border)] opacity-75 group-hover:opacity-100 transition-opacity duration-150`}></i>
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