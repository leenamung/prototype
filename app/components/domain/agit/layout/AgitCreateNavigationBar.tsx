"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const AgitCreateNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)]/80 backdrop-blur-sm border-b border-[var(--color-border)] shadow-sm z-20 h-14">
      <div className="flex items-center justify-between px-2 h-14">
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-xl text-[var(--text-subtle)]"></i>
        </button>
        {/* 타이틀 */}
        <h1 className="font-pretendard font-semibold text-lg text-[var(--text-main)]">
          아지트 만들기
        </h1>
        {/* 우측 여백 (타이틀 중앙 정렬용) */}
        <div className="w-10 h-10"></div>
      </div>
    </nav>
  );
};

export default AgitCreateNavigationBar;