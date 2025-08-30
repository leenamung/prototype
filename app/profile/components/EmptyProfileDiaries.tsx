"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const EmptyProfileDiaries = () => {
  const router = useRouter();

  const handleWriteClick = () => {
    router.push('/write');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-book-mark-line text-5xl text-[var(--color-border)]"></i>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        나만의 첫 기록을 남겨보세요
      </h2>
      <p className="text-base text-[var(--text-subtle)] mb-8">
        어떤 사소한 감정이라도 소중한 이야기가 될 수 있어요.
      </p>
      <button
        onClick={handleWriteClick}
        className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-8 py-3 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
      >
        첫 일기 쓰러가기
      </button>
    </div>
  );
};

export default EmptyProfileDiaries;