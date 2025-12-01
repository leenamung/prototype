"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProfileEditNavigationBarProps {
  onSave: () => void;
  isSaveDisabled?: boolean;
}

const ProfileEditNavigationBar: React.FC<ProfileEditNavigationBarProps> = ({ onSave, isSaveDisabled }) => {
  const router = useRouter();
  
  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20 h-14">
        <div className="flex items-center justify-between px-4 h-full">
            <button 
                onClick={() => router.back()} 
                className="text-sm text-[var(--text-subtle)] hover:text-[var(--text-main)] px-2 py-1 rounded-md hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
            >
                취소
            </button>
            <h1 className="text-lg font-semibold text-[var(--text-main)]">프로필 편집</h1>
            <button 
                onClick={onSave}
                disabled={isSaveDisabled}
                className={`text-sm font-bold transition-all px-2 py-1 rounded-md ${
                    isSaveDisabled 
                    ? 'text-[var(--color-border)] cursor-not-allowed' 
                    : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/20'
                }`}
            >
                완료
            </button>
        </div>
    </nav>
  );
};

export default ProfileEditNavigationBar;