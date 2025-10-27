"use client";

import React from 'react';
// UserAgitSummary 타입과 AgitListItem 컴포넌트를 가져옵니다.
import { UserAgitSummary } from '@/app/data/profileSampleData';
import ProfileAgitListItem from '@/app/components/domain/common/AgitListItem';

interface MutualAgitListProps {
  title: string;
  agitIds?: string[]; // 함께 소속된 아지트 ID 배열 (옵셔널)
  allAgits?: UserAgitSummary[]; // 대상 유저가 가입한 전체 아지트 목록 (필터링 용도)
}

const MutualAgitList: React.FC<MutualAgitListProps> = ({ title, agitIds, allAgits = [] }) => {
  // agitIds 배열에 해당하는 아지트 정보만 allAgits에서 필터링합니다.
  const mutualAgits: UserAgitSummary[] = agitIds
    ? allAgits.filter(agit => agitIds.includes(agit.id))
    : [];

  if (!agitIds || mutualAgits.length === 0) {
    // 함께 소속된 아지트가 없을 경우 아무것도 렌더링하지 않습니다.
    return null;
  }

  return (
    <section className="mb-6">
      <h3 className="text-base font-semibold text-[var(--text-main)] mb-2 px-4">{title} ({mutualAgits.length}개)</h3>
      {/* AgitListItem 재사용 */}
      <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        {mutualAgits.map(agit => (
          <ProfileAgitListItem key={agit.id} agit={agit} />
        ))}
      </div>
    </section>
  );
};

export default MutualAgitList;