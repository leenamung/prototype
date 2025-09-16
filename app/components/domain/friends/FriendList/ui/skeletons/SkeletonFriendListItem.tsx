import React from 'react';

// 내 친구 목록 아이템 스켈레톤 (AgitListItem 스켈레톤과 유사)
const SkeletonFriendListItem = () => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 animate-pulse">
      {/* 프로필 이미지 */}
      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0"></div>
      <div className="flex-1 min-w-0 space-y-2">
        {/* 이름 */}
        <div className="h-4 w-3/5 bg-gray-200 rounded"></div>
        {/* 상태 메시지 */}
        <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonFriendListItem;