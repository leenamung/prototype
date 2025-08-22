"use client";

import React, { useState } from 'react';
import AgitMemberItem from './AgitMemberItem';
import type { AgitMember } from '../data/agitSampleData';

interface AgitMembersContentProps {
  members: AgitMember[];
  totalMemberCount: number;
}

const AgitMembersContent: React.FC<AgitMembersContentProps> = ({ members, totalMemberCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('최신순');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedMembers = filteredMembers; // 정렬 로직은 아직 미구현

  return (
    <div>
      {/* 검색 및 필터 바 배경 및 구분선, 텍스트 색상 변경 */}
      <div className="bg-[var(--color-component-bg)] p-4 sticky top-[calc(theme(spacing.14)+theme(spacing.12)+1px)] z-10 border-b border-[var(--color-border)] shadow-sm">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="멤버 이름 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // 입력 필드 배경, 텍스트, placeholder 색상 변경
            className="w-full py-3 px-10 bg-[var(--color-subtle-bg)] rounded-full text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/80 focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary-dark)] outline-none transition-all"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
            {/* 검색 아이콘 색상 변경 */}
            <i className="ri-search-line text-[var(--text-subtle)]"></i>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* 전체 멤버 수 텍스트 색상 변경 */}
          <p className="text-xs text-[var(--text-subtle)]">전체 {totalMemberCount}명</p>
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              // 정렬 버튼 텍스트 색상 변경
              className="text-xs text-[var(--text-subtle)] flex items-center cursor-pointer hover:text-[var(--text-main)] p-1 rounded active:bg-[var(--color-subtle-bg)] transition-colors"
            >
              <span>{sortBy}</span>
              <i className={`ri-arrow-down-s-line ml-1 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isSortDropdownOpen && (
              // 드롭다운 메뉴 배경 및 텍스트 색상 변경
              <div className="absolute right-0 mt-2 w-32 bg-[var(--color-component-bg)] rounded-md shadow-lg z-20 border border-[var(--color-border)]/50 py-1">
                {['최신순', '이름순'].map(option => (
                  <button
                    key={option}
                    onClick={() => { setSortBy(option); setIsSortDropdownOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-xs text-[var(--text-main)] hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border-dark)]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        {sortedMembers && sortedMembers.length > 0 ? (
          // 멤버 리스트 카드 배경 변경
          <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm overflow-hidden">
            {sortedMembers.map((member) => (
              <AgitMemberItem key={member.id} member={member} />
            ))}
          </div>
        ) : (
          // 메시지 텍스트 색상 변경
          <p className="text-center text-[var(--text-subtle)] py-8 text-sm">
            {searchTerm ? '검색된 멤버가 없습니다.' : '아지트 멤버가 없습니다.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default AgitMembersContent;
