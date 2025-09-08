"use client";
import React from 'react';

interface EmptyMyAgitListProps {
  onExploreClick: () => void;
}

const EmptyMyAgitList: React.FC<EmptyMyAgitListProps> = ({ onExploreClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-group-2-line text-5xl text-[var(--color-border)]"></i>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        아직 소속된 아지트가 없어요
      </h2>
      <p className="text-base text-[var(--text-subtle)] mb-8">
        관심있는 주제의 아지트를 찾아 함께 이야기 나눠보세요.
      </p>
      <button
        onClick={onExploreClick}
        className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-8 py-3 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
      >
        아지트 탐색하기
      </button>
    </div>
  );
};

export default EmptyMyAgitList;