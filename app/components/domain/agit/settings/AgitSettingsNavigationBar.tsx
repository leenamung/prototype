"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

interface AgitSettingsNavigationBarProps {
  onSave: () => void;
  isSaveDisabled?: boolean;
}

const AgitSettingsNavigationBar: React.FC<AgitSettingsNavigationBarProps> = ({ onSave, isSaveDisabled = false }) => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        {/* 취소 버튼 (뒤로 가기) */}
        <button 
          onClick={() => router.back()} 
          className="text-sm text-[var(--text-subtle)] hover:text-[var(--text-main)] px-2 py-1 rounded-md hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
        >
          취소
        </button>
        {/* 페이지 타이틀 */}
        <h1 className="text-lg font-semibold text-[var(--text-main)]">아지트 설정</h1>
        {/* 저장 버튼 */}
        <button 
          onClick={onSave}
          disabled={isSaveDisabled}
          className={`text-sm font-bold transition-all px-2 py-1 rounded-md ${
            isSaveDisabled 
              ? 'text-[var(--color-border)]' // 비활성 상태
              : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/20' // 활성 상태
          }`}
        >
          저장
        </button>
      </div>
    </nav>
  );
};

export default AgitSettingsNavigationBar;