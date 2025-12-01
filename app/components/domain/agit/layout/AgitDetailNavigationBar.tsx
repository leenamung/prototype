"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface AgitDetailNavigationBarProps {
  agitName: string;
}

const AgitDetailNavigationBar: React.FC<AgitDetailNavigationBarProps> = ({ agitName }) => {
  const router = useRouter();

  return (
    <div className="flex-none w-full bg-[var(--color-component-bg)]/80 backdrop-blur-sm shadow-sm z-20 border-b border-[var(--color-border)] h-14">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        {/* 아지트 이름 타이틀 (중앙 정렬 및 말줄임) */}
        <h1 className="text-lg font-medium text-[var(--text-main)] truncate max-w-[60%] absolute left-1/2 -translate-x-1/2">
          {agitName}
        </h1>
        {/* 더보기 버튼 */}
        <button
          onClick={()=>{}}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="더보기"
        >
          <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
        </button>
      </div>
    </div>
  );
};

export default AgitDetailNavigationBar;