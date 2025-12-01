"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

// isMyProfile prop 추가 (옵셔널, 기본값 true)
interface EmptyProfileDiariesProps {
  isMyProfile?: boolean;
}

const EmptyProfileDiaries: React.FC<EmptyProfileDiariesProps> = ({ isMyProfile = true }) => {
  const router = useRouter();

  const handleWriteClick = () => {
    router.push('/write');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-book-mark-line text-5xl text-[var(--color-border)]"></i>
      </div>
      {/* isMyProfile 값에 따라 다른 텍스트 표시 */}
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        {isMyProfile ? '나만의 첫 기록을 남겨보세요' : '아직 공유된 일기가 없어요'}
      </h2>
      <p className="text-base text-[var(--text-subtle)] mb-8">
        {isMyProfile
          ? '어떤 사소한 감정이라도 소중한 이야기가 될 수 있어요.'
          : '이 사용자가 일기를 공유하면 여기에 표시됩니다.'}
      </p>
      {/* 내 프로필일 때만 '첫 일기 쓰러가기' 버튼 표시 */}
      {isMyProfile && (
        <button
          onClick={handleWriteClick}
          className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-8 py-3 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
        >
          첫 일기 쓰러가기
        </button>
      )}
    </div>
  );
};

export default EmptyProfileDiaries;