"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProfileNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex-none w-full bg-[var(--color-component-bg)] shadow-sm z-20 border-b border-[var(--color-border)] h-14">
      <div className="flex items-center justify-between px-4 h-full">
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        <h1 className="text-lg font-medium text-[var(--text-main)]">프로필</h1>
        <Link 
          href="/settings"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="설정"
        >
          <i className="ri-settings-3-line ri-lg text-[var(--text-subtle)]"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProfileNavigationBar;