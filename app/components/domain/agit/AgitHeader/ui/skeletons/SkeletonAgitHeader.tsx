import React from 'react';

const SkeletonAgitHeader = () => {
  return (
    <div className="relative animate-pulse">
      {/* 커버 이미지 스켈레톤 */}
      <div className="w-full aspect-[10/3] bg-gray-200"></div>
      <div className="p-4 bg-white">
        {/* 아지트 이름 스켈레톤 */}
        <div className="h-8 w-1/2 bg-gray-200 rounded mb-2"></div>
        {/* 멤버 수 스켈레톤 */}
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
        {/* 버튼 그룹 스켈레톤 */}
        <div className="flex space-x-2">
          <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonAgitHeader;