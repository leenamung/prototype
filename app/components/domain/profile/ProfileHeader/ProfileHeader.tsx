"use client";
import Image from 'next/image';
import React from 'react';
import { RelationshipStatus } from '@/app/data/profileSampleData'; // 타입 import

interface ProfileHeaderProps {
  profileImage: string;
  name: string;
  bio: string;
  friendCount: number;
  onEditProfileClick?: () => void; // 내 프로필일 때만 사용되므로 옵셔널
  relationshipStatus: RelationshipStatus; // 관계 상태 추가
  // 상호작용 버튼 핸들러 추가 (예시)
  onAddFriendClick?: () => void;
  onSendMessageClick?: () => void;
  // TODO: 친구 요청 취소, 요청 수락/거절 등 핸들러 추가
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  name,
  bio,
  friendCount,
  onEditProfileClick,
  relationshipStatus,
  onAddFriendClick = () => console.log('Add friend clicked'), // 기본 핸들러
  onSendMessageClick = () => console.log('Send message clicked'), // 기본 핸들러
}) => {

  const renderActionButtons = () => {
    switch (relationshipStatus) {
      case 'self':
        return (
          <button
            onClick={onEditProfileClick}
            className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-6 py-2 rounded-[var(--rounded-button)] font-medium text-sm hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
          >
            프로필 편집
          </button>
        );
      case 'friend':
        return (
          <button
            onClick={onSendMessageClick}
            className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-6 py-2 rounded-[var(--rounded-button)] font-medium text-sm hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
          >
            메시지 보내기
          </button>
          // 친구 끊기 버튼은 더보기 메뉴로 이동 고려
        );
      case 'none':
        return (
          <div className="flex space-x-2">
            <button
              onClick={onAddFriendClick}
              className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
            >
              <i className="ri-user-add-line ri-sm mr-1.5"></i>
              <span>친구 추가</span>
            </button>
             <button
              onClick={onSendMessageClick}
              className="bg-[var(--color-component-bg)] border border-[var(--color-border)] px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium text-[var(--text-subtle)] hover:border-[var(--color-primary-dark)] active:bg-[var(--color-border-dark)] transition-all"
             >
              <i className="ri-message-3-line ri-sm mr-1.5"></i>
              <span>메시지</span>
            </button>
          </div>
        );
      case 'friend_request_sent':
        return (
           <button
             // onClick={handleCancelRequest} // TODO: 요청 취소 핸들러
             className="bg-[var(--color-subtle-bg)] border border-[var(--color-border)] px-6 py-2 rounded-[var(--rounded-button)] text-sm font-medium text-[var(--text-subtle)] hover:border-[var(--color-primary-dark)] active:bg-[var(--color-border-dark)] transition-all"
           >
             요청 보냄
           </button>
        );
       case 'friend_request_received':
         return (
           <div className="flex space-x-2">
             <button
              //  onClick={handleDeclineRequest} // TODO: 거절 핸들러
               className="bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] px-4 py-2 rounded-[var(--rounded-button)] text-xs font-medium hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] transition-colors"
             >
               거절
             </button>
             <button
              //  onClick={handleAcceptRequest} // TODO: 수락 핸들러
               className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-4 py-2 rounded-[var(--rounded-button)] text-xs font-medium border border-[var(--color-primary-dark)] hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all"
             >
               수락
             </button>
           </div>
         );
      default:
        return null;
    }
  };


  return (
    // pt-20을 ProfileView 또는 페이지 레벨에서 관리하도록 제거
    <div className="pb-6 px-4 bg-[var(--color-component-bg)] border-b border-[var(--color-border)]">
      <div className="flex flex-col items-center pt-6"> {/* 상단 패딩 추가 */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
          <Image
            src={profileImage}
            alt={`${name} 프로필 사진`}
            className="w-full h-full object-cover"
            width={96}
            height={96}
            priority // LCP 개선을 위해 priority 추가
          />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-main)] mb-2">{name}</h2>
        <p className="text-base text-[var(--text-subtle)] mb-4 text-center max-w-md px-4">{bio}</p>
        {/* TODO: 친구 수 클릭 시 '함께 아는 친구' 모달 또는 페이지로 이동 */}
        <div className="text-sm text-[var(--text-subtle)] mb-5 cursor-pointer hover:text-[var(--color-primary)] transition-colors">
          친구 {friendCount}명
        </div>
        {/* 관계 기반 버튼 렌더링 */}
        <div className="h-9 flex items-center justify-center"> {/* 버튼 높이 확보 */}
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;