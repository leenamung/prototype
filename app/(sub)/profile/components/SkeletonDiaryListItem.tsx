// app/profile/components/SkeletonDiaryListItem.tsx (새 파일)

import React from 'react';

const SkeletonDiaryListItem = () => (
  <div className="flex bg-white rounded-lg overflow-hidden shadow-sm animate-pulse h-[88px]">
    {/* 감정 바 스켈레톤 */}
    <div className="w-1.5 bg-gray-200"></div>
    <div className="flex-1 p-3 space-y-2">
      {/* 날짜 및 아이콘 영역 */}
      <div className="flex justify-between items-start">
        <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
      </div>
      {/* 제목 및 내용 스켈레톤 */}
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-3 w-full bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default SkeletonDiaryListItem;