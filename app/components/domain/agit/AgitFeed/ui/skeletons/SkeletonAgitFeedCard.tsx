import React from 'react';

const SkeletonAgitFeedCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 animate-pulse">
      {/* 카드 헤더 스켈레톤 */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
      {/* 본문 텍스트 스켈레톤 */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonAgitFeedCard;