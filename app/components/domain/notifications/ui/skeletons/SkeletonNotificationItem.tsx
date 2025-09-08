import React from 'react';

const SkeletonNotificationItem = () => {
  // 랜덤한 너비를 생성하여 스켈레톤 UI가 더 자연스럽게 보이도록 합니다.
  const textWidth1 = Math.floor(Math.random() * 30) + 60; // 60% ~ 90%
  const textWidth2 = Math.floor(Math.random() * 30) + 30; // 30% ~ 60%
  const showsThumbnail = Math.random() > 0.5; // 50% 확률로 썸네일 또는 버튼 표시

  return (
    <div className="flex items-center p-2 -mx-2">
      {/* 프로필 이미지 스켈레톤 */}
      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse flex-shrink-0 mr-3"></div>
      
      {/* 텍스트 스켈레톤 */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${textWidth1}%` }}></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse" style={{ width: `${textWidth2}%` }}></div>
      </div>

      {/* 썸네일 또는 버튼 스켈레톤 */}
      {showsThumbnail ? (
        <div className="w-12 h-12 rounded-md bg-gray-200 animate-pulse flex-shrink-0 ml-3"></div>
      ) : (
        <div className="w-20 h-7 rounded-md bg-gray-200 animate-pulse flex-shrink-0 ml-3"></div>
      )}
    </div>
  );
};

export default SkeletonNotificationItem;