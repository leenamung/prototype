"use client"
import React from 'react';

// isMyProfile prop 추가 (옵셔널, 기본값 true)
interface EmptyProfileFriendsProps {
  isMyProfile?: boolean;
}

const EmptyProfileFriends: React.FC<EmptyProfileFriendsProps> = ({ isMyProfile = true }) => {
  return (
    <div className="text-center py-16">
      <i className="ri-user-search-line ri-4x text-[var(--color-border)] mb-4"></i>
      {/* isMyProfile 값에 따라 다른 텍스트 표시 */}
      <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
        {isMyProfile ? '아직 친구가 없어요' : '표시할 친구가 없어요'}
      </h3>
      <p className="text-sm text-[var(--text-subtle)] mb-6">
        {isMyProfile
          ? <>다른 사람들과 감정을 나누고<br />소통하며 친구를 만들어보세요.</>
          : '이 사용자와 함께 아는 친구가 여기에 표시됩니다.'}
      </p>
      {/* 내 프로필일 때만 '친구 찾아보기' 버튼 표시 */}
      {isMyProfile && (
        // TODO: 친구 찾기 페이지 라우팅 구현 필요
        <button className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-6 py-2 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]">
          친구 찾아보기
        </button>
      )}
    </div>
  );
};

export default EmptyProfileFriends;