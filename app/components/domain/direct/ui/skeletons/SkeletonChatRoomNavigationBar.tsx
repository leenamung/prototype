import React from 'react';

const SkeletonChatRoomNavigationBar = () => {
  return (
    <div className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14 animate-pulse">
      <div className="flex items-center px-4 h-full">
        {/* 뒤로가기 버튼 */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
        {/* 상대방 프로필 이미지 */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 ml-2 mr-3"></div>
        {/* 상대방 이름 */}
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonChatRoomNavigationBar;