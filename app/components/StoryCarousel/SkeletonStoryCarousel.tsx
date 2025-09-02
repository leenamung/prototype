import React from 'react';

const SkeletonStoryItem = () => (
  <div className="flex flex-col items-center flex-shrink-0 w-20 animate-pulse">
    {/* 원형 이미지 스켈레톤 */}
    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
    {/* 텍스트 라인 스켈레톤 */}
    <div className="h-3 w-12 bg-gray-200 rounded mt-2"></div>
  </div>
);

const SkeletonStoryCarousel = () => {
  return (
    <div className="relative w-full py-4">
      <div className="flex p-2 space-x-2 overflow-hidden">
        {/* 여러 개의 스켈레톤 아이템을 미리 보여줍니다. */}
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonStoryItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonStoryCarousel;