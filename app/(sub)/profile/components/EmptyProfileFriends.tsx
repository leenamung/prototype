import React from 'react';

const EmptyProfileFriends = () => {
  return (
    <div className="text-center py-16">
      <i className="ri-user-search-line ri-4x text-[var(--color-border)] mb-4"></i>
      <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">아직 친구가 없어요</h3>
      <p className="text-sm text-[var(--text-subtle)] mb-6">다른 사람들과 감정을 나누고<br />소통하며 친구를 만들어보세요.</p>
      {/* TODO: 친구 찾기 페이지로 연결될 버튼 */}
      <button className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-6 py-2 ...">
        친구 찾아보기
      </button>
    </div>
  );
};

export default EmptyProfileFriends;