"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const SettingsNavigationBar = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20">
      <div className="flex items-center px-4 py-3 h-14">
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        <h1 className="text-lg font-semibold text-[var(--text-main)] absolute left-1/2 -translate-x-1/2">
          설정
        </h1>
      </div>
    </nav>
  );
};

export default SettingsNavigationBar;