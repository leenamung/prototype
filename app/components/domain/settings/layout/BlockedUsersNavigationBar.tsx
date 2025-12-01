"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const BlockedUsersNavigationBar = () => {
  const router = useRouter();
  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14">
        <div className="flex items-center px-4 h-full">
            <button 
                onClick={() => router.back()} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
                aria-label="뒤로 가기"
            >
                <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
            </button>
            <h1 className="text-lg font-semibold text-[var(--text-main)] absolute left-1/2 -translate-x-1/2">
                차단된 사용자 관리
            </h1>
        </div>
    </nav>
  );
};

export default BlockedUsersNavigationBar;