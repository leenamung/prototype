// app/agit/components/AgitMainNavigationBar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ⬇️ 프로필 이미지를 받기 위한 prop 추가
interface AgitMainNavigationBarProps {
  userProfileImage: string;
}

const AgitMainNavigationBar: React.FC<AgitMainNavigationBarProps> = ({ userProfileImage }) => {
  return (
    // ⬇️ 기본 페이지 네비게이션 바와 동일한 스타일 적용
    <nav className="fixed top-0 w-full bg-[#FFFAF0] border-b border-[#E0E0E0] shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <h1 className="text-lg font-semibold text-[var(--text-main)]">아지트</h1>
        <div className="flex items-center space-x-4">
          <button 
            className="w-8 h-8 flex items-center justify-center"
            aria-label="아지트 검색"
          >
            <i className="ri-search-line ri-lg text-[var(--text-subtle)]"></i>
          </button>
          <Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
            <Image
              src={userProfileImage}
              alt="프로필"
              className="w-full h-full object-cover"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AgitMainNavigationBar;