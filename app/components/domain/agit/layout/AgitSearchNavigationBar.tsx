"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface AgitSearchNavigationBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const AgitSearchNavigationBar: React.FC<AgitSearchNavigationBarProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // 페이지 진입 시 자동으로 검색창에 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14">
      <div className="flex items-center px-4 py-3 h-14 space-x-3">
        {/* 검색창 */}
        <div className="flex-1 flex items-center bg-[var(--color-subtle-bg)] rounded-lg px-4 py-2
                      border border-transparent 
                      focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 
                      transition-all">
          <i className="ri-search-line text-[var(--text-subtle)] ri-lg mr-2"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="전체 아지트 검색..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="flex-1 w-full bg-transparent text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/80 
                       outline-none border-none p-0 focus:ring-0"
          />
        </div>
        {/* 취소 버튼 (뒤로가기) */}
        <button
          onClick={() => router.back()}
          className="text-sm text-[var(--text-subtle)] hover:text-[var(--text-main)] px-2 py-1 rounded-md hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
        >
          취소
        </button>
      </div>
    </nav>
  );
};

export default AgitSearchNavigationBar;