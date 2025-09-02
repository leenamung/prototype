// app/direct/components/SkeletonMessageListItem.tsx (새 파일)

import React from 'react';

const SkeletonMessageListItem = () => {
  return (
    <div className="flex items-center px-4 py-3 border-b border-gray-100 animate-pulse">
      {/* 프로필 이미지 스켈레톤 */}
      <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
      <div className="flex-1 min-w-0 space-y-2">
        {/* 이름 및 시간 스켈레톤 */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-1/5 bg-gray-200 rounded"></div>
        </div>
        {/* 마지막 메시지 스켈레톤 */}
        <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonMessageListItem;