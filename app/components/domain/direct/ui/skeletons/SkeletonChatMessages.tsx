import React from 'react';

// 단일 말풍선 스켈레톤
const SkeletonBubble = ({ isMe }: { isMe?: boolean }) => {
  const width = Math.floor(Math.random() * 40) + 30; // 30% ~ 70% 랜덤 너비

  return (
    <div className={`flex items-start gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
      )}
      <div 
        className="h-10 bg-gray-200 rounded-2xl"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

// 말풍선들을 보여주는 전체 채팅 영역 스켈레톤
const SkeletonChatMessages = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 space-y-4 animate-pulse">
      <SkeletonBubble />
      <SkeletonBubble isMe />
      <SkeletonBubble />
      <SkeletonBubble isMe />
      <SkeletonBubble isMe />
      <SkeletonBubble />
    </main>
  );
};

export default SkeletonChatMessages;