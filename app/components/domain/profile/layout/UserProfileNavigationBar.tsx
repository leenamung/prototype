"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserProfileOptionsMenu from '../features/Header/UserProfileOptionsMenu';
import { AnimatePresence } from 'framer-motion';
import { RelationshipStatus } from '@/app/data/profileSampleData'; // 타입 import

interface UserProfileNavigationBarProps {
  userName: string;
  userId: string;
  relationshipStatus: RelationshipStatus; // 관계 상태 받기
}

const UserProfileNavigationBar: React.FC<UserProfileNavigationBarProps> = ({ userName, userId, relationshipStatus }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMoreOptionsClick = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const handleReport = () => {
    console.log(`Report user: ${userName} (ID: ${userId})`);
    alert(`${userName}님을 신고했습니다. (임시)`);
    setIsMenuOpen(false);
  };

  const handleBlock = () => {
    console.log(`Block user: ${userName} (ID: ${userId})`);
    alert(`${userName}님을 차단했습니다. (임시)`);
    setIsMenuOpen(false);
  };

  // 친구 끊기 핸들러 추가
  const handleUnfriend = () => {
    console.log(`Unfriend user: ${userName} (ID: ${userId})`);
    // TODO: 실제 친구 끊기 API 호출
    alert(`${userName}님과 친구를 끊었습니다. (임시)`);
    setIsMenuOpen(false);
    // 친구 끊기 후 UI 업데이트 로직 필요 (예: 페이지 새로고침 또는 상태 업데이트)
  };
  return (
    <>
      <div className="flex-none w-full bg-[var(--color-component-bg)] shadow-sm z-20 border-b border-[var(--color-border)] h-14">
        <div className="flex items-center justify-between px-4 py-3 h-14">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
            aria-label="뒤로 가기"
          >
            <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
          </button>
          {/* 사용자 이름 타이틀 */}
          <h1 className="text-lg font-medium text-[var(--text-main)] truncate max-w-[60%]">
            {userName}
          </h1>
          {/* 더보기 버튼 */}
          <button
            onClick={handleMoreOptionsClick}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
            aria-label="더보기"
          >
            <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <UserProfileOptionsMenu
            isOpen={isMenuOpen}
            onClose={handleCloseMenu}
            onReport={handleReport}
            onBlock={handleBlock}
            onUnfriend={handleUnfriend} // 친구 끊기 핸들러 전달
            userName={userName}
            relationshipStatus={relationshipStatus} // 관계 상태 전달
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfileNavigationBar;