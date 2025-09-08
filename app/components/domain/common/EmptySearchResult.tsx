"use client";
import React from 'react';

interface EmptySearchResultProps {
  searchTerm: string;
}

const EmptySearchResult: React.FC<EmptySearchResultProps> = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-search-eye-line text-5xl text-[var(--color-border)]"></i>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        &apos;{searchTerm}&apos;에 대한 결과가 없어요
      </h2>
      <p className="text-base text-[var(--text-subtle)]">
        오타가 있는지 확인하거나 다른 검색어로 시도해보세요.
      </p>
    </div>
  );
};

export default EmptySearchResult;