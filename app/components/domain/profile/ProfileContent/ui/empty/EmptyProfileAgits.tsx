"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const EmptyProfileAgits = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/agit');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-community-line text-5xl text-[var(--color-border)]"></i>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        아직 소속된 아지트가 없어요
      </h2>
      <p className="text-base text-[var(--text-subtle)] mb-8">
        관심사를 나누는 공간을 찾아보거나 직접 만들어보세요.
      </p>
      <button
        onClick={handleExploreClick}
        className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-8 py-3 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
      >
        아지트 탐색하러 가기
      </button>
    </div>
  );
};

export default EmptyProfileAgits;