"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AgitDetailNavigationBarProps {
  title: string;
  type: 'diary' | 'club';
  agitId: string; // 👈 [추가] 링크 이동을 위해 ID 필요
}

export default function AgitDetailNavigationBar({ title, type, agitId }: AgitDetailNavigationBarProps) {
  const router = useRouter();

  // [Theme Color Strategy]
  const activeColorClass = type === 'diary' 
    ? "active:text-[var(--agit-diary-tag-text)]" 
    : "active:text-[var(--agit-club-primary)]";

  const buttonClass = `w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-90 text-[var(--text-main)] hover:bg-[var(--text-main)]/5 ${activeColorClass}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] transition-all duration-300">
      <div className="relative flex items-center justify-between px-2 h-full max-w-screen-md mx-auto">
        
        {/* 뒤로가기 */}
        <button 
          onClick={() => router.back()} 
          className={buttonClass}
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-xl"></i>
        </button>
        
        {/* 타이틀 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[60%] pointer-events-none">
          <h1 className="font-pretendard font-bold text-lg text-[var(--text-main)] truncate">
            {title}
          </h1>
        </div>
        
        {/* 우측 액션 버튼들 */}
        <div className="flex items-center gap-0.5 mr-1 z-10">
          <button className={buttonClass} aria-label="채팅">
            <i className="ri-message-3-line text-xl"></i>
          </button>
          
          <Link href={`/agit/write`} className={buttonClass} aria-label="글쓰기">
            <i className="ri-pencil-line text-xl"></i>
          </Link>

          {/* ⚙️ [수정] 설정 버튼에 Link 연결 */}
          <Link href={`/agit/${agitId}/settings`} className={buttonClass} aria-label="설정">
             <i className="ri-settings-3-line text-xl"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}