import React from 'react';
// ⬇️ GridItem 대신 ListItem 스켈레톤을 import 합니다.
import SkeletonDiaryListItem from './SkeletonDiaryListItem';

const SkeletonProfileDiariesContent = () => {
  return (
    <div>
      {/* ⬇️ 1. 컨트롤 버튼 영역을 왼쪽 탭 3개, 오른쪽 버튼 1개 형태로 수정합니다. */}
      <div className="flex justify-between items-center mb-4 mt-1 animate-pulse">
        {/* 왼쪽 탭 버튼 그룹 */}
        <div className="flex space-x-2">
          <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
        </div>
        {/* 오른쪽 뷰 토글 버튼 */}
        <div className="w-20 h-9 bg-gray-200 rounded-full"></div>
      </div>

      {/* ⬇️ 2. 그리드 아이템을 리스트 아이템으로 교체하고, 개수를 조정합니다. */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonDiaryListItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonProfileDiariesContent;