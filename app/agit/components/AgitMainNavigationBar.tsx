"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AgitMainNavigationBarProps {
  userProfileImage: string;
}

const AgitMainNavigationBar: React.FC<AgitMainNavigationBarProps> = ({ userProfileImage }) => {
  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <h1 className="text-lg font-semibold text-[var(--text-main)]">아지트</h1>
        <div className="flex items-center space-x-4">
          <button 
            className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] rounded-full transition-colors"
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