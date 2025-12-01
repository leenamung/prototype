"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Notification } from '@/app/data/notificationSampleData';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { user, type, content, timestamp, postThumbnail } = notification;

  const renderContent = () => {
    switch (type) {
      case 'like':
        return <>회원님의 게시물을 <b>좋아합니다.</b></>;
      case 'comment':
        return <>회원님의 게시물에 댓글을 남겼습니다: <span className="text-[var(--text-subtle)]">&quot;{content}&quot;</span></>;
      case 'follow':
        return <>회원님을 <b>팔로우하기 시작했습니다.</b></>;
      case 'agit_invite':
        return <>회원님을 <b>{content}</b> 아지트에 초대했습니다.</>;
      default:
        return content;
    }
  };

  return (
    <Link href="#" className="flex items-center p-3 -mx-3 rounded-lg hover:bg-[var(--color-subtle-bg)] transition-colors">
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
        <Image src={user.profileImage} alt={`${user.name} 프로필`} fill className="object-cover" />
      </div>
      <div className="flex-1 text-sm">
        <p className="text-[var(--text-main)] leading-relaxed">
          <b className="font-semibold">{user.name}</b>님이 {renderContent()}
        </p>
        <p className="text-xs text-[var(--text-subtle)] mt-1">{timestamp}</p>
      </div>
      {postThumbnail && (
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 ml-4">
          <Image src={postThumbnail} alt="게시물 썸네일" fill className="object-cover" />
        </div>
      )}
      {type === 'follow' && (
         <button className="ml-4 px-4 py-1.5 bg-[var(--color-primary)] text-[var(--text-on-primary)] text-xs font-semibold rounded-md hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]">
           맞팔로우
         </button>
      )}
    </Link>
  );
};

export default NotificationItem;