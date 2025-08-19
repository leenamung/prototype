"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface WriteNavigationBarProps {
  onPublish: () => void;
  isPublishDisabled?: boolean;
}

const WriteNavigationBar: React.FC<WriteNavigationBarProps> = ({ onPublish, isPublishDisabled }) => {
  const router = useRouter();
  const handleCancel = () => router.back(); 

  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] shadow-sm z-20 px-4 py-3 flex justify-between items-center h-14 border-b border-[var(--color-border)]">
      <button 
        onClick={handleCancel}
        className="text-[var(--text-subtle)] hover:text-[var(--text-main)] font-medium text-sm transition-colors"
      >
        취소
      </button>
      <h1 className="text-lg font-semibold text-[var(--text-main)]">일기 쓰기</h1>
      <button
        onClick={onPublish}
        disabled={isPublishDisabled}
        className={`bg-[var(--color-primary)] text-[var(--text-on-primary)] px-4 py-1.5 rounded-[var(--rounded-button)] font-medium text-sm transition-opacity border border-[var(--color-primary-dark)] ${isPublishDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      >
        발행하기
      </button>
    </nav>
  );
};

export default WriteNavigationBar;