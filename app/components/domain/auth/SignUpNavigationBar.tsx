"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[var(--color-background)]/80 backdrop-blur-sm z-20">
      <div className="flex items-center px-2 h-14">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors text-[var(--text-main)]"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default SignUpNavigationBar;