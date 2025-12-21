"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

interface DiaryDetailNavigationBarProps {
  headerTitle?: string;
  onOptionClick?: () => void; // ✨ [추가] 옵션 버튼 클릭 핸들러
}

const DiaryDetailNavigationBar: React.FC<DiaryDetailNavigationBarProps> = ({ headerTitle, onOptionClick }) => {
  const router = useRouter();
  
  return (
    // fixed 상단 고정, 배경 블러 처리로 본문 위로 은은하게 떠 있는 느낌
    <nav className="flex-none w-full h-14 bg-[#FFFAF0]/80 backdrop-blur-sm z-50 fixed top-0 left-0 right-0 border-b border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between px-4 h-full max-w-screen-md mx-auto">
        
        {/* 뒤로 가기 */}
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:scale-90 transition-all"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-xl text-[var(--text-subtle)]"></i>
        </button>

        {/* ✨ 중앙 정보: 감성 문구 출력 */}
        <div className="flex-1 flex justify-center items-center overflow-hidden px-2">
          {headerTitle && (
            <span className="font-maru-buri font-bold text-xs sm:text-sm text-[var(--text-main)] truncate opacity-90 tracking-tight animate-fade-in">
              {headerTitle}
            </span>
          )}
        </div>

        {/* ✨ [수정] 더보기 메뉴 버튼에 onClick 연결 */}
        <button 
          onClick={onOptionClick}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:scale-90 transition-all"
          aria-label="메뉴"
        >
          <i className="ri-more-2-fill ri-xl text-[var(--text-subtle)]"></i>
        </button>
      </div>
    </nav>
  );
};

export default DiaryDetailNavigationBar;