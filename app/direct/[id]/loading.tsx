import React from 'react';
// 1. 채팅방 전용 헤더 스켈레톤 import (경로 주의)
import SkeletonChatRoomNavigationBar from '@/app/components/domain/direct/ui/skeletons/SkeletonChatRoomNavigationBar';
import SkeletonChatMessages from '@/app/components/domain/direct/ui/skeletons/SkeletonChatMessages';

export default function Loading() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-component-bg)]">
      <SkeletonChatRoomNavigationBar />
      
      <div className="flex-1 overflow-hidden flex flex-col">
         <SkeletonChatMessages />
      </div>
      
      <footer className="flex-none w-full bg-[var(--color-component-bg)] border-t border-[var(--color-border)] p-2 animate-pulse">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-full mx-2"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </footer>
    </div>
  );
}