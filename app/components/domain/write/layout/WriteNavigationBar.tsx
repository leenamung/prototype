"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface WriteNavigationBarProps {
  onAction: () => void;
  actionText: string;       
  isActionDisabled: boolean;
  onBack?: () => void;      
}

const WriteNavigationBar: React.FC<WriteNavigationBarProps> = ({ 
  onAction, 
  actionText, 
  isActionDisabled,
  onBack
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack(); // 시트 닫기
    } else {
      router.back(); // 페이지 뒤로가기
    }
  };

  return (
    <nav 
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 
                 bg-[var(--color-background)]/90 backdrop-blur-md 
                 border-b border-[var(--color-border)]/30 transition-all h-[57px]"
    >
      {/* 1. 뒤로가기 / 닫기 버튼 */}
      <button 
        onClick={handleBack} 
        className="p-2 -ml-2 text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors active:scale-95"
        aria-label={onBack ? "닫기" : "뒤로 가기"}
      >
        {/* [수정] onBack이 있으면(시트 열림) 아래 화살표, 없으면 왼쪽 화살표 */}
        <i className={`${onBack ? 'ri-arrow-down-s-line' : 'ri-arrow-left-s-line'} ri-xl`}></i>
      </button>

      {/* 2. 타이틀 (중앙 정렬용 더미) */}
      <div className="text-base font-maru-buri font-bold text-[var(--text-main)] opacity-0 pointer-events-none">
        기록하기
      </div>

      {/* 3. 액션 버튼 (간직하기 / 마무리하기) */}
      <button
        onClick={onAction}
        disabled={isActionDisabled}
        className={`
          px-4 py-2 rounded-full text-sm font-bold font-gowun-dodum transition-all duration-300
          flex items-center gap-1.5 shadow-sm
          ${isActionDisabled 
            ? 'bg-[var(--color-border)] text-[var(--text-subtle)] cursor-not-allowed opacity-50 shadow-none' 
            : 'bg-[var(--color-primary)] text-white hover:opacity-90 active:scale-95 hover:shadow-md'}
        `}
      >
        {actionText === "간직하기" ? <i className="ri-check-line"></i> : null}
        <span>{actionText}</span>
        {actionText === "마무리하기" ? <i className="ri-arrow-right-s-line"></i> : null}
      </button>
    </nav>
  );
};

export default WriteNavigationBar;