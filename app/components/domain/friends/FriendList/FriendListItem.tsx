"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Friend } from '@/app/data/sampleFriendData';

interface FriendListItemProps {
  friend: Friend;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  return (
    <Link 
      href={`/profile/${friend.id}`}
      // ⭐️ 수정/확인: 호버 시 저희 디자인 시스템의 --color-subtle-bg (푸른색X)가 적용되도록 명시합니다.
      className="flex items-center p-4 border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-subtle-bg)] transition-colors duration-150 last:border-b-0"
    >
      <div className="w-12 h-12 rounded-full bg-[var(--color-border)] overflow-hidden mr-4 flex-shrink-0">
        <Image
          src={friend.profileImage}
          alt={`${friend.name} 프로필 이미지`}
          className="w-full h-full object-cover"
          width={48}
          height={48}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-gowun-batang font-bold text-sm text-[var(--text-main)] truncate">{friend.name}</p>
        <p className="text-xs text-[var(--text-subtle)] mt-1 truncate">{friend.statusMessage}</p>
      </div>
      <div className="ml-auto text-[var(--text-subtle)]">
          <i className="ri-arrow-right-s-line ri-lg"></i>
      </div>
    </Link>
  );
};

export default FriendListItem;