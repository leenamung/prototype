import React from 'react';

const EmptyProfileFriends = () => {
  return (
    <div className="text-center py-16">
      <i className="ri-user-search-line ri-4x text-gray-300 mb-4"></i>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">아직 친구가 없어요</h3>
      <p className="text-sm text-gray-500 mb-6">다른 사람들과 감정을 나누고<br />소통하며 친구를 만들어보세요.</p>
      {/* TODO: 친구 찾기 페이지로 연결될 버튼 */}
      <button className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-[var(--rounded-button)] font-medium text-sm hover:opacity-90 transition-opacity">
        친구 찾아보기
      </button>
    </div>
  );
};

export default EmptyProfileFriends;