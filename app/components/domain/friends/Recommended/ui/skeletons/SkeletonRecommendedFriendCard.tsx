import React from 'react';

// 추천 친구 카드 스켈레톤 (가로 스크롤용)
const SkeletonRecommendedFriendCard = () => {
  return (
    <div className="flex-shrink-0 w-32 animate-pulse">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="w-16 h-16 rounded-full mb-3 bg-gray-200"></div>
        {/* 이름 */}
        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
        {/* 추천 사유 */}
        <div className="h-3 w-16 bg-gray-200 rounded mb-3"></div>
        {/* 버튼 */}
        <div className="h-7 w-full bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonRecommendedFriendCard;