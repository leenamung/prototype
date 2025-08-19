"use client";
import React from 'react';
import type { UserDiarySummary } from '../data/profileSampleData';

interface ProfileDiaryListItemProps {
  diary: UserDiarySummary;
}

const ProfileDiaryListItem: React.FC<ProfileDiaryListItemProps> = ({ diary }) => {
  const emotionBarColorClass = diary.emotionBarClass || 'bg-[var(--color-border)]';

  return (
    <div className="flex items-center py-3 border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-subtle-bg)] transition-colors duration-150">
      <div className={`w-1 h-12 ${emotionBarColorClass} rounded-full mr-3.5 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center mb-0.5">
          <i className={`${diary.typeIcon} ri-sm mr-1.5 text-[var(--text-subtle)]`}></i>
          <p className="text-sm font-medium text-[var(--text-main)] truncate">
            {diary.title || "제목 없는 일기"}
          </p>
        </div>
        <p className="text-xs text-[var(--text-subtle)]">{diary.date}</p>
      </div>
    </div>
  );
};

export default ProfileDiaryListItem;