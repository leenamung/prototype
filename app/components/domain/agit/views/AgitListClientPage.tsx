"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AgitListTabs, { AgitListTabKey } from '../components/AgitListTabs';
import { UserAgitSummary } from '@/app/data/profileSampleData';
import ProfileAgitListItem from '../../common/AgitListItem';

interface AgitClientPageProps {
  myAgits: UserAgitSummary[];
  exploreAgits: UserAgitSummary[];
}

export default function AgitClientPage({ myAgits, exploreAgits }: AgitClientPageProps) {
  const [activeTab, setActiveTab] = useState<AgitListTabKey>('myAgits');
  const router = useRouter();

  // [Smart Stream 로직] 리스트 정렬 및 필터링
  const { ghosts, activeList } = useMemo(() => {
    // 1. 유령 카드 (초대장) 분리
    const ghosts = myAgits.filter(agit => agit.isGhost);
    
    // 2. 활성 카드 (나머지) - 긴급한 것(isUrgent)을 위로, 나머지는 최신순(예제에선 순서 유지)
    const active = myAgits.filter(agit => !agit.isGhost);
    const sortedActive = [...active].sort((a, b) => {
        // 긴급(내 차례) 우선 정렬
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
        return 0; 
    });

    return { ghosts, activeList: sortedActive };
  }, [myAgits]);

  // 초대 수락/거절 핸들러 (임시 alert 처리)
  const handleAccept = (id: string) => alert(`아지트(${id}) 초대를 수락했습니다!`);
  const handleDecline = (id: string) => alert(`아지트(${id}) 초대를 거절했습니다.`);

  return (
    <div className="relative min-h-full pb-24">
      {/* 탭 네비게이션 */}
      <AgitListTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="px-4 mt-2">
        {activeTab === 'myAgits' && (
          <div className="flex flex-col">
            
            {/* 1. 👻 유령 카드 (초대장) - 최상단 노출 */}
            {ghosts.map(agit => (
                <ProfileAgitListItem 
                    key={agit.id} 
                    agit={agit} 
                    onAccept={() => handleAccept(agit.id)}
                    onDecline={() => handleDecline(agit.id)}
                />
            ))}

            {/* 2. ➕ 빈 카드 (생성 버튼) - 초대장 바로 아래, 리스트 시작점 */}
            <ProfileAgitListItem isEmpty />

            {/* 3. 🎫 활성 리스트 (내 차례 -> 새 소식 -> 일반 순) */}
            {activeList.map(agit => (
                <ProfileAgitListItem key={agit.id} agit={agit} />
            ))}

          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-2 mt-2">
            {/* 탐색 탭용 검색창은 추후 구현 */}
            <div className="relative mb-6">
                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-[var(--text-subtle)]"></i>
                 </div>
                 <input 
                    type="text" 
                    placeholder="관심사나 태그를 검색해보세요" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] text-sm shadow-sm transition-colors"
                 />
            </div>

            {exploreAgits.length > 0 ? (
                exploreAgits.map(agit => <ProfileAgitListItem key={agit.id} agit={agit} />)
            ) : (
              <p className="text-center text-[var(--text-subtle)] font-maru-buri py-10 opacity-60">
                  새로운 아지트를 준비 중이에요.
              </p>
            )}
          </div>
        )}
      </main>
      
      {/* 기존 FAB 제거됨 (빈 카드로 대체) */}
    </div>
  );
}