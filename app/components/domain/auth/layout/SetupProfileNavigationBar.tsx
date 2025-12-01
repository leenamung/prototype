"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const SetupProfileNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[var(--color-background)]/80 backdrop-blur-sm z-20">
      <div className="flex items-center justify-end px-5 h-14">
        <button
          onClick={() => router.push('/')} // '나중에 하기' 클릭 시 메인으로 이동
          className="text-sm text-[var(--text-subtle)] rounded-full px-4 py-2 hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors font-pretendard"
        >
          나중에 하기
        </button>
      </div>
    </nav>
  );
};

export default SetupProfileNavigationBar;