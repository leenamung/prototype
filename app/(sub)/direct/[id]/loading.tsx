import React from 'react';
import SkeletonDirectNavigationBar from '../../../components/domain/direct/MessageList/ui/skeletons/SkeletonDirectNavigationBar'; // 메시지 목록에서 만든 스켈레톤 재사용
import SkeletonChatMessages from '../../../components/domain/direct/ChatRoom/ui/skeletons/SkeletonChatMessages';

export default function Loading() {
  return (
    <div className="h-screen flex flex-col">
      <SkeletonDirectNavigationBar />
      <SkeletonChatMessages />
      {/* 입력창 스켈레톤 */}
      <footer className="fixed bottom-16 w-full bg-white border-t border-gray-200 p-2 animate-pulse">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex-1 h-10 bg-gray-100 rounded-full mx-2"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </footer>
    </div>
  );
}