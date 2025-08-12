// app/notifications/components/NotificationItem.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Notification } from '../data/notificationSampleData';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { user, type, content, timestamp, postThumbnail } = notification;

  // 알림 타입에 따라 다른 메시지 생성
  const renderContent = () => {
    switch (type) {
      case 'like':
        return <>회원님의 게시물을 <b>좋아합니다.</b></>;
      case 'comment':
        // ⬇️ 따옴표 " 를 &quot; 로 변경하여 오류 해결
        return <>회원님의 게시물에 댓글을 남겼습니다: <span className="text-gray-600">&quot;{content}&quot;</span></>;
      case 'follow':
        return <>회원님을 <b>팔로우하기 시작했습니다.</b></>;
      case 'agit_invite':
        return <>회원님을 <b>{content}</b> 아지트에 초대했습니다.</>;
      default:
        return content;
    }
  };

  return (
    <Link href="#" className="flex items-center p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
        <Image src={user.profileImage} alt={`${user.name} 프로필`} fill className="object-cover" />
      </div>
      <div className="flex-1 text-sm">
        <p className="text-gray-800">
          <b className="font-semibold">{user.name}</b>님이 {renderContent()}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{timestamp}</p>
      </div>
      {postThumbnail && (
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 ml-3">
          <Image src={postThumbnail} alt="게시물 썸네일" fill className="object-cover" />
        </div>
      )}
      {type === 'follow' && (
         <button className="ml-3 px-4 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600 transition-colors">
           맞팔로우
         </button>
      )}
    </Link>
  );
};

export default NotificationItem;