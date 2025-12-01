"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const NotificationNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex-none w-full bg-[var(--color-component-bg)] shadow-sm z-20 border-b border-[var(--color-border)] h-14">
      <div className="flex items-center px-4 h-full relative">
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        <h1 className="text-lg font-semibold text-[var(--text-main)] absolute left-1/2 -translate-x-1/2">알림</h1>
      </div>
    </div>
  );
};

export default NotificationNavigationBar;