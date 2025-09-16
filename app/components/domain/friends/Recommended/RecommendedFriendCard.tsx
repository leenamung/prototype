"use client";
import React from 'react';
import Image from 'next/image';
import type { RecommendedFriend } from '@/app/data/sampleFriendData';

interface RecommendedFriendCardProps {
  friend: RecommendedFriend;
}

const RecommendedFriendCard: React.FC<RecommendedFriendCardProps> = ({ friend }) => {
  return (
    // ⭐️ 수정: card-base 래퍼를 제거하고, 레이아웃과 패딩만 담당하도록 변경
    // 이렇게 하면 페이지 배경(--color-background) 위에 다른 리스트처럼 투명하게 올라갑니다.
    <div className="flex-shrink-0 w-32 flex flex-col items-center text-center p-2">
      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-[var(--color-border)]">
        <Image
          src={friend.profileImage}
          alt={`${friend.name} 프로필`}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="font-gowun-batang font-bold text-sm text-[var(--text-main)] truncate w-full">{friend.name}</p>
      <p className="text-xs text-[var(--text-subtle)] mt-1 truncate w-full">{friend.reason}</p>
      
      {/* 버튼 스타일은 이전 피드백에서 수정한 Primary 스타일 유지 */}
      <button className="mt-3 w-full px-2 py-1.5 bg-[var(--color-primary)] text-[var(--text-on-primary)] text-xs font-medium rounded-[var(--rounded-button)] border border-[var(--color-primary-dark)] hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all">
        친구 추가
      </button>
    </div>
  );
};

export default RecommendedFriendCard;