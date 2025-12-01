"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

const OnboardingNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    // ✅ [수정] fixed top-0 제거 -> flex-none h-14
    <nav className="flex-none w-full bg-[var(--color-background)]/80 backdrop-blur-sm z-20 h-14">
      <div className="flex items-center justify-end px-5 h-full">
        <button
          onClick={() => router.push('/')}
          className="text-sm text-[var(--text-subtle)] rounded-full px-3 py-1 hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors font-pretendard"
        >
          건너뛰기
        </button>
      </div>
    </nav>
  );
};

export default OnboardingNavigationBar;