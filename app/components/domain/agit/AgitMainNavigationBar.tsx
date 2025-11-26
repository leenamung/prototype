"use client";
import React from 'react';
import Link from 'next/link';

const AgitMainNavigationBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <h1 className="text-lg font-semibold text-[var(--text-main)]">아지트</h1>
        <div className="flex items-center space-x-4">
          <Link 
            href="/agit/search" // 👈 [수정] 검색 페이지 경로
            className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] rounded-full transition-colors"
            aria-label="아지트 검색"
          >
            <i className="ri-search-line ri-lg text-[var(--text-subtle)]"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AgitMainNavigationBar;