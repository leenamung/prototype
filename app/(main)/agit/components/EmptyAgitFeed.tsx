"use client";
import React from 'react';

interface EmptyAgitFeedProps {
  onWritePostClick: () => void;
}

const EmptyAgitFeed: React.FC<EmptyAgitFeedProps> = ({ onWritePostClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-sparkling-2-line text-5xl text-[var(--color-border)]"></i>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        아지트의 첫 이야기를 시작해보세요
      </h2>
      <p className="text-base text-[var(--text-subtle)] mb-8">
        이곳은 우리만의 공간이에요. 어떤 이야기든 좋아요.
      </p>
      <button
        onClick={onWritePostClick}
        className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-8 py-3 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
      >
        첫 글 남기기
      </button>
    </div>
  );
};

export default EmptyAgitFeed;