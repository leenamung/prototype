// components/FloatingActionButton.tsx
"use client";

import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-[var(--color-primary)] rounded-[var(--rounded-button)] shadow-lg flex items-center justify-center cursor-pointer z-50 hover:bg-[var(--color-primary)]/80 transition-all duration-150 ease-in-out"
      aria-label="새 일기 작성"
    >
      <i className="ri-add-line ri-xl text-white"></i>
    </button>
  );
};

export default FloatingActionButton;
