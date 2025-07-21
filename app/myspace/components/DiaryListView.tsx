"use client";

import React from 'react';
import { MyDiaryEntry } from '../data/mySpaceSampleData'; 

interface DiaryListItemProps {
  diary: MyDiaryEntry;
}

const DiaryListItem: React.FC<DiaryListItemProps> = ({ diary }) => {
  const emotionBarClass = `bg-[var(--emotion-${diary.emotion})]`; 

  return (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-150 ease-in-out">
      <div className={`w-1.5 ${emotionBarClass}`}></div>
      <div className="flex-1 p-3">
        <div className="flex justify-between items-start mb-1">
          {/* ✨ 날짜 텍스트 색상 text-[var(--text-subtle)] 적용 */}
          <span className="text-xs text-[var(--text-subtle)]">{diary.dateString} {diary.time && `- ${diary.time}`}</span>
          <div className="w-5 h-5 flex items-center justify-center" title={diary.privacy}>
            <i className={`${diary.privacyIcon} text-[var(--color-sub-light-gray)] ri-sm`}></i> {/* 아이콘 색상 유지 또는 --text-subtle 고려 */}
          </div>
        </div>
        {/* ✨ 제목 텍스트 색상 text-[var(--text-main)] 적용 */}
        <h3 className="font-semibold text-[var(--text-main)] mt-1 mb-0.5 text-sm">{diary.title}</h3>
        {/* ✨ 내용 미리보기 텍스트 색상 text-[var(--text-subtle)] 적용 */}
        <p className="text-xs text-[var(--text-subtle)] line-clamp-2">{diary.contentSnippet}</p>
        <div className="flex mt-1.5">
          <div className="w-5 h-5 flex items-center justify-center" title={diary.type}>
            <i className={`${diary.typeIcon} text-[var(--color-sub-light-gray)] ri-sm`}></i> {/* 아이콘 색상 유지 또는 --text-subtle 고려 */}
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
    // ✨ 메시지 텍스트 색상 text-[var(--text-subtle)] 적용
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
