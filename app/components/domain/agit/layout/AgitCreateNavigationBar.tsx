"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const AgitCreateNavigationBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  // [UX Writing] 상황별 타이틀 매핑
  const getTitle = () => {
    switch (type) {
      case 'diary':
        return '교환일기';
      case 'club':
        return '모임 만들기';
      default:
        return '새 아지트';
    }
  };

  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)] shadow-sm z-20 h-14">
      <div className="flex items-center justify-between px-2 h-14">
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-xl text-[var(--text-subtle)]"></i>
        </button>
        
        {/* 타이틀 (중앙 정렬 + Pretendard) */}
        <h1 className="font-pretendard font-bold text-lg text-[var(--text-main)]">
          {getTitle()}
        </h1>
        
        {/* 우측 여백 (타이틀 중앙 정렬용 Spacer) */}
        <div className="w-10 h-10"></div>
      </div>
    </nav>
  );
};

export default AgitCreateNavigationBar;