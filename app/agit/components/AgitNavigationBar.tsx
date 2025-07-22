// app/agit/components/AgitNavigationBar.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface AgitNavigationBarProps {
  onNotificationClick?: () => void;
  // ⬇️ 프로필 이미지를 받기 위한 prop 추가
  userProfileImage: string; 
}

const AgitNavigationBar: React.FC<AgitNavigationBarProps> = ({ onNotificationClick, userProfileImage }) => {
  return (
    // ⬇️ nav 태그와 기본 페이지의 스타일 클래스를 적용하여 통일성 부여
    <nav className="fixed top-0 w-full bg-[#FFFAF0] border-b border-[#E0E0E0] shadow-sm z-50">
      <div className="flex justify-between items-center px-4 py-3 h-14">
        <Link href="/" className="font-pacifico text-xl text-[var(--color-primary)] cursor-pointer">
          logo
        </Link>
        <div className="flex items-center space-x-4">
          {/* ⬇️ 알림 아이콘과 뱃지 스타일을 기본 페이지와 동일하게 수정 */}
          <button 
            onClick={onNotificationClick} 
            className="w-8 h-8 flex items-center justify-center cursor-pointer relative"
            aria-label="알림"
          >
            <i className="ri-notification-3-line ri-lg text-[var(--text-subtle)]"></i>
            {/* 예시 알림 뱃지 */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-xs">1</span>
          </button>
          
          {/* ⬇️ '더보기' 버튼 대신 프로필 이미지 링크로 변경 */}
          <Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
            <img
              src={userProfileImage}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AgitNavigationBar;