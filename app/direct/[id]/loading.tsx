import React from 'react';
// 1. 채팅방 전용 헤더 스켈레톤 import (경로 주의)
import SkeletonChatRoomNavigationBar from '@/app/components/domain/direct/ChatRoom/ui/skeletons/SkeletonChatRoomNavigationBar';
import SkeletonChatMessages from '@/app/components/domain/direct/ChatRoom/ui/skeletons/SkeletonChatMessages';

export default function Loading() {
  return (
    <div className="h-screen flex flex-col">
      {/* 2. 전용 헤더 스켈레톤 사용 */}
      <SkeletonChatRoomNavigationBar />
      
      {/* 메시지 영역 (SkeletonChatMessages 내부에 pt-16이 있어 헤더와 겹치지 않음) */}
      <SkeletonChatMessages />
      
      {/* 입력창 스켈레톤 */}
      <footer className="fixed bottom-16 w-full bg-[var(--color-component-bg)] border-t border-[var(--color-border)] p-2 animate-pulse">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-full mx-2"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </footer>
    </div>
  );
}