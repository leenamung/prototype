// app/profile/components/ProfileDiariesContent.tsx
"use client";

import React, { useState } from 'react';
import ProfileDiaryGridItem from './ProfileDiaryGridItem';
import ProfileDiaryListItem from './ProfileDiaryListItem';
import type { UserDiarySummary } from '../data/profileSampleData';

interface ProfileDiariesContentProps {
  diaries: UserDiarySummary[];
}

type DiariesViewMode = 'grid' | 'list';

const ProfileDiariesContent: React.FC<ProfileDiariesContentProps> = ({ diaries }) => {
  const [viewMode, setViewMode] = useState<DiariesViewMode>('grid');

  return (
    <div>
      <div className="flex justify-end mb-4 mt-1">
        <div className="flex bg-[var(--color-subtle-bg)] rounded-full p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150 ${
              viewMode === 'grid' ? 'bg-[var(--color-primary)] shadow-sm' : 'hover:bg-[var(--color-component-bg)]'
            }`}
            aria-pressed={viewMode === 'grid'}
            aria-label="그리드 뷰로 보기"
          >
            <i className={`ri-grid-fill ri-sm ${viewMode === 'grid' ? 'text-white' : 'text-[var(--text-subtle)]'}`}></i>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150 ${
              viewMode === 'list' ? 'bg-[var(--color-primary)] shadow-sm' : 'hover:bg-[var(--color-component-bg)]'
            }`}
            aria-pressed={viewMode === 'list'}
            aria-label="리스트 뷰로 보기"
          >
            <i className={`ri-list-check ri-sm ${viewMode === 'list' ? 'text-white' : 'text-[var(--text-subtle)]'}`}></i>
          </button>
        </div>
      </div>

      {/* Conditional Rendering based on viewMode */}
      {viewMode === 'grid' ? (
        diaries && diaries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {diaries.map(diary => (
              <ProfileDiaryGridItem key={diary.id} diary={diary} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-subtle)] py-8 text-sm">작성한 일기가 없습니다.</p>
        )
      ) : ( // List View
        diaries && diaries.length > 0 ? (
          <div>
            {diaries.map(diary => (
              <ProfileDiaryListItem key={diary.id} diary={diary} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-subtle)] py-8 text-sm">작성한 일기가 없습니다.</p>
        )
      )}
    </div>
  );
};

export default ProfileDiariesContent;
