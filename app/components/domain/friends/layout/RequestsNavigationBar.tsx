"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

// ⭐️ 수정: sticky top-14 대신, fixed top-0 적용 (Profile/Direct 네비와 동일하게)
const RequestsNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14">
      <div className="flex items-center justify-between px-4 h-full">
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        {/* 페이지 타이틀 */}
        <h1 className="text-lg font-semibold text-[var(--text-main)] absolute left-1/2 -translate-x-1/2">
          친구 요청
        </h1>
        <div className="w-8"></div>
      </div>
    </nav>
  );
};

export default RequestsNavigationBar;