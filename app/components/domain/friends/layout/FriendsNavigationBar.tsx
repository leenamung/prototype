"use client";
import React from 'react';
import Link from 'next/link';

interface FriendsNavigationBarProps {
  requestCount?: number;
}

// ⭐️ 수정: sticky top-14 대신, 다른 (sub) 헤더와 동일하게 fixed top-0 적용
const FriendsNavigationBar: React.FC<FriendsNavigationBarProps> = ({ requestCount = 0 }) => {
  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14">
      <div className="flex items-center justify-between px-4 h-full">
        {/* 타이틀: 서정적인 느낌을 위해 Maru Buri 폰트 적용 */}
        <h1 className="font-gowun-batang text-xl font-bold text-[var(--text-main)]">
          친구
        </h1>
        {/* 친구 요청 관리 페이지로 이동하는 아이콘 버튼 */}
        <Link 
          href="/friends/requests"
          className="w-8 h-8 flex items-center justify-center cursor-pointer relative rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
          aria-label="친구 요청 보기"
        >
          <i className="ri-user-add-line ri-lg text-[var(--text-subtle)]"></i>
          {requestCount > 0 && (
            <span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-primary)] border-2 border-[var(--color-component-bg)] rounded-full flex items-center justify-center text-white text-[10px] font-bold"
              aria-label={`${requestCount}개의 새로운 친구 요청`}
            >
              {requestCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default FriendsNavigationBar;