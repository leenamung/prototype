// app/profile/components/ProfileDiaryListItem.tsx
"use client";

import React from 'react';
import type { UserDiarySummary } from '../data/profileSampleData'; // 데이터 타입 임포트

interface ProfileDiaryListItemProps {
  diary: UserDiarySummary;
}

const ProfileDiaryListItem: React.FC<ProfileDiaryListItemProps> = ({ diary }) => {
  // emotionBarClass는 'bg-blue-400' 또는 'bg-[var(--emotion-sad)]' 와 같은 Tailwind 클래스
  const emotionBarColorClass = diary.emotionBarClass || 'bg-gray-300'; // 기본 색상

  return (
    <div className="flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150">
      {/* 감정 바 */}
      <div className={`w-1 h-12 ${emotionBarColorClass} rounded-full mr-3.5 flex-shrink-0`}></div> {/* 높이와 마진 조정 */}
      {/* 내용 */}
      <div className="flex-1 min-w-0"> {/* min-w-0 for proper truncation */}
        <div className="flex items-center mb-0.5">
          <i className={`${diary.typeIcon} ri-sm mr-1.5 text-gray-500`}></i>
          <p className="text-sm font-medium text-gray-800 truncate">
            {diary.title || "제목 없는 일기"}
          </p>
        </div>
        <p className="text-xs text-gray-500">{diary.date}</p>
      </div>
      {/* <div className="ml-auto text-gray-400 hover:text-gray-600">
        <i className="ri-arrow-right-s-line ri-lg"></i>
      </div> */}
    </div>
  );
};

export default ProfileDiaryListItem;
