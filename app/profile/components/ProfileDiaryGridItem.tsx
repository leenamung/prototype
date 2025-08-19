// app/profile/components/ProfileDiaryGridItem.tsx
"use client";

import React from 'react';
import type { UserDiarySummary } from '../data/profileSampleData'; // 데이터 타입 임포트

interface ProfileDiaryGridItemProps {
  diary: UserDiarySummary;
}

const ProfileDiaryGridItem: React.FC<ProfileDiaryGridItemProps> = ({ diary }) => {
  // **수정된 부분:**
  // globals.css에 정의된 .profile-emotion-* 클래스 이름을 직접 사용합니다.
  // diary.emotionClass는 이미 "profile-emotion-blue"와 같은 값을 가지고 있습니다.
  const emotionBackgroundClass = diary.emotionClass; 

  // Helper to get a human-readable type for the title attribute
  const getReadableDiaryType = (type: UserDiarySummary['type']): string => {
    switch (type) {
      case 'text': return '텍스트 일기';
      case 'image': return '사진 일기';
      case 'video': return '영상 일기';
      case 'audio': return '음성 일기';
      default: return '일기';
    }
  };

  return (
    <div
      className={`aspect-square rounded-lg overflow-hidden relative cursor-pointer group transition-all duration-200 ease-in-out hover:shadow-lg ${emotionBackgroundClass}`}
      title={diary.title || diary.date} // 툴팁으로 제목 또는 날짜 표시
    >
      {/* 타입 아이콘 (우측 상단) */}
      <div
        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-[var(--color-component-bg)]/70 backdrop-blur-sm rounded-full shadow" // Tailwind v4 opacity
        title={getReadableDiaryType(diary.type)}
      >
        <i className={`${diary.typeIcon} ri-sm text-[var(--text-subtle)]`}></i>
      </div>
      {/* 날짜 (하단) */}
      <div
        className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/50 to-transparent" // Tailwind v4 opacity
      >
        <p className="text-xs text-white font-medium truncate">{diary.date}</p>
      </div>
    </div>
  );
};

export default ProfileDiaryGridItem;
