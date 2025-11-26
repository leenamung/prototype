"use client";

import React, { useState, useMemo } from 'react';
import { UserAgitSummary } from '@/app/data/profileSampleData';
import ProfileAgitListItem from '@/app/components/domain/common/AgitListItem';
import EmptySearchResult from '@/app/components/domain/common/EmptySearchResult';
import AgitSearchNavigationBar from './AgitSearchNavigationBar';

interface AgitSearchClientPageProps {
  allAgits: UserAgitSummary[]; // 전체 아지트 목록 (검색 대상)
}

const AgitSearchClientPage: React.FC<AgitSearchClientPageProps> = ({ allAgits }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 로직 (실제로는 API 호출이 될 수 있음)
  const searchResults = useMemo(() => {
    if (searchTerm.trim() === '') {
      return [];
    }
    const lowerCaseTerm = searchTerm.toLowerCase();
    return allAgits.filter(agit =>
      agit.name.toLowerCase().includes(lowerCaseTerm)
    );
  }, [searchTerm, allAgits]);

  const hasResults = searchResults.length > 0;
  const isSearching = searchTerm.trim() !== '';

  return (
    <div>
      {/* ✅ 검색 페이지는 입력 상태 공유를 위해 네비게이션 바를 내부에서 렌더링 */}
      <AgitSearchNavigationBar 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      {/* 상단 여백 (헤더 높이만큼) */}
      <main className="pt-14 px-4 py-4">
        {/* 1. 검색어 입력 전: 안내 문구 */}
        {!isSearching && (
          <div className="text-center py-20">
            <i className="ri-search-eye-line ri-4x text-[var(--color-border)] mb-4"></i>
            <p className="text-sm text-[var(--text-subtle)]">
              관심 있는 주제나 아지트 이름을<br/>검색해보세요.
            </p>
          </div>
        )}

        {/* 2. 검색 결과 없음 */}
        {isSearching && !hasResults && (
          <EmptySearchResult searchTerm={searchTerm} />
        )}
        
        {/* 3. 검색 결과 목록 */}
        {isSearching && hasResults && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[var(--text-subtle)] mb-2 px-1">
              검색 결과 {searchResults.length}개
            </p>
            <div className="bg-[var(--color-component-bg)] rounded-lg border border-[var(--color-border)] divide-y divide-[var(--color-border)] overflow-hidden">
                {searchResults.map(agit => (
                <ProfileAgitListItem key={agit.id} agit={agit} />
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AgitSearchClientPage;