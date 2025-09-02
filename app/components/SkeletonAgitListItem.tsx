// app/components/SkeletonAgitListItem.tsx (새 파일)

import React from 'react';

const SkeletonAgitListItem = () => {
  return (
    <div className="flex items-center p-4 border-b border-[var(--color-border)] animate-pulse">
      {/* 커버 이미지 스켈레톤 */}
      <div className="w-12 h-12 rounded-lg bg-gray-200 mr-4 flex-shrink-0"></div>
      <div className="flex-1 min-w-0 space-y-2">
        {/* 아지트 이름 스켈레톤 */}
        <div className="h-4 w-3/5 bg-gray-200 rounded"></div>
        {/* 멤버 수 스켈레톤 */}
        <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonAgitListItem;