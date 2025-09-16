import React from 'react';

// 친구 요청 아이템 스켈레톤
const SkeletonFriendRequestItem = () => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 animate-pulse">
      {/* 프로필 이미지 */}
      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
      <div className="flex-1 min-w-0 space-y-2">
        {/* 이름 */}
        <div className="h-4 w-2/5 bg-gray-200 rounded"></div>
        {/* 시간 */}
        <div className="h-3 w-1/5 bg-gray-200 rounded"></div>
      </div>
      <div className="flex flex-shrink-0 space-x-2 ml-2">
        {/* 버튼 2개 (수락/거절) */}
        <div className="h-7 w-14 bg-gray-200 rounded-md"></div>
        <div className="h-7 w-14 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonFriendRequestItem;