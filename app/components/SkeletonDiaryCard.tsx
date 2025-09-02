import React from 'react';

const SkeletonDiaryCard = () => {
  // 0, 1, 2 중 하나의 숫자를 랜덤으로 생성하여 표시할 미디어 타입을 결정합니다.
  const mediaType = Math.floor(Math.random() * 3); // 0: 없음, 1: 이미지/비디오, 2: 음성

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden p-4 animate-pulse">
      {/* 카드 헤더 스켈레톤 */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* 본문 텍스트 스켈레톤 */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>

      {/* --- 수정된 미디어 스켈레톤 영역 --- */}
      {/* 이미지/비디오 썸네일 스켈레톤 */}
      {mediaType === 1 && (
        <div className="w-full aspect-video bg-gray-200 rounded-md mb-4"></div>
      )}

      {/* 음성 스켈레톤 */}
      {mediaType === 2 && (
        <div className="bg-gray-100 rounded-lg p-3 mb-4 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex-1 h-8 flex items-center space-x-1">
            <div className="w-1 h-3 bg-gray-200 rounded-full"></div>
            <div className="w-1 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-1 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      )}

      {/* 하단 버튼 스켈레톤 */}
      <div className="flex items-center space-x-4">
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonDiaryCard;