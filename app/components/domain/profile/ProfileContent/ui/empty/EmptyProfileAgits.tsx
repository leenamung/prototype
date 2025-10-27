"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

// isMyProfile prop 추가 (옵셔널, 기본값 true)
interface EmptyProfileAgitsProps {
  isMyProfile?: boolean;
}

const EmptyProfileAgits: React.FC<EmptyProfileAgitsProps> = ({ isMyProfile = true }) => {
  const router = useRouter();

  const handleExploreClick = () => {
    // 아지트 탐색 탭으로 이동하도록 수정
    router.push('/agit?tab=explore'); // 예시: 쿼리 파라미터 사용
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-community-line text-5xl text-[var(--color-border)]"></i>
      </div>
      {/* isMyProfile 값에 따라 다른 텍스트 표시 */}
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        {isMyProfile ? '아직 소속된 아지트가 없어요' : '소속된 아지트가 없어요'}
      </h2>
      <p className="text-base text-[var(--text-subtle)] mb-8">
        {isMyProfile
          ? '관심사를 나누는 공간을 찾아보거나 직접 만들어보세요.'
          : '이 사용자가 아지트에 가입하면 여기에 표시됩니다.'}
      </p>
      {/* 내 프로필일 때만 '아지트 탐색' 버튼 표시 */}
      {isMyProfile && (
        <button
          onClick={handleExploreClick}
          className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-8 py-3 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
        >
          아지트 탐색하러 가기
        </button>
      )}
    </div>
  );
};

export default EmptyProfileAgits;