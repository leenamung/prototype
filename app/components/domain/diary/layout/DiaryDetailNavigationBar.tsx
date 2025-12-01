"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

interface DiaryDetailNavigationBarProps {
  dateString: string;
  weatherIcon: string;
}

const DiaryDetailNavigationBar: React.FC<DiaryDetailNavigationBarProps> = ({ dateString, weatherIcon }) => {
  const router = useRouter();
  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)]/80 backdrop-blur-sm border-b border-[var(--color-border)] shadow-sm z-50 h-14">
      <div className="flex items-center justify-between px-4 h-full">
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        {/* 중앙에 날짜와 날씨 정보 표시 */}
        <div className="flex items-center text-sm text-[var(--text-main)] font-medium">
          <span>{dateString}</span>
          <i className={`${weatherIcon} ri-lg ml-2 text-[var(--text-subtle)]`}></i>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
          <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
        </button>
      </div>
    </nav>
  );
};

export default DiaryDetailNavigationBar;