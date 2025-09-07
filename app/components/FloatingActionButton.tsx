"use client";
import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-[var(--color-primary)] rounded-[var(--rounded-button)] flex items-center justify-center cursor-pointer z-50 transition-all duration-150 ease-in-out border border-[var(--color-primary-dark)] shadow-sm hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] active:shadow-inner"
      aria-label="새 항목 만들기"
    >
      <i className="ri-add-line ri-xl text-[var(--text-on-primary)]"></i>
    </button>
  );
};

export default FloatingActionButton;