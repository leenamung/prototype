"use client";
import React from 'react';
import Image from 'next/image';
import type { FriendRequest } from '@/app/data/sampleFriendData';

interface FriendRequestItemProps {
  request: FriendRequest;
  type: 'received' | 'sent';
}

const FriendRequestItem: React.FC<FriendRequestItemProps> = ({ request, type }) => {
  return (
    <div className="flex items-center p-4">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--color-border)] flex-shrink-0 mr-3">
        <Image
          src={request.profileImage}
          alt={`${request.name} 프로필`}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        {/* 닉네임에 Maru Buri 폰트 적용 */}
        <p className="font-gowun-batang font-bold text-sm text-[var(--text-main)] truncate">{request.name}</p>
        <p className="text-xs text-[var(--text-subtle)] mt-1">{request.timestamp}</p>
      </div>
      <div className="flex flex-shrink-0 space-x-2 ml-2">
        {type === 'received' ? (
          <>
            {/* 거절 버튼: Subtle 스타일 */}
            <button className="px-4 py-1.5 bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] text-xs font-medium rounded-[var(--rounded-button)] hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] transition-colors">
              거절
            </button>
            {/* 수락 버튼: Primary 스타일 */}
            <button className="px-4 py-1.5 bg-[var(--color-primary)] text-[var(--text-on-primary)] text-xs font-medium rounded-[var(--rounded-button)] border border-[var(--color-primary-dark)] hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all">
              수락
            </button>
          </>
        ) : (
          /* 보낸 요청 취소 버튼: Subtle 스타일 */
          <button className="px-4 py-1.5 bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] text-xs font-medium rounded-[var(--rounded-button)] hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] transition-colors">
            요청 취소
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendRequestItem;