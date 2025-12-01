"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AgitListTabs, { AgitListTabKey } from '../components/AgitListTabs';
import EmptyMyAgitList from '../ui/empty/EmptyMyAgitList';
import { UserAgitSummary } from '@/app/data/profileSampleData';
import ProfileAgitListItem from '../../common/AgitListItem';
import FloatingActionButton from '../../common/FloatingActionButton';

interface AgitClientPageProps {
  myAgits: UserAgitSummary[];
  exploreAgits: UserAgitSummary[];
}

export default function AgitClientPage({ myAgits, exploreAgits }: AgitClientPageProps) {
  const [activeTab, setActiveTab] = useState<AgitListTabKey>('myAgits');
  const router = useRouter();

  // 👈 [추가] 네비게이션 바에 필요한 프로필 이미지 (임시)

  const handleCreateAgit = () => router.push('/agit/create');
  
  return (
    <>

      <AgitListTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="px-4 pb-4">
        {activeTab === 'myAgits' && (
          <div>
            {myAgits.length > 0 ? (
              myAgits.map(agit => <ProfileAgitListItem key={agit.id} agit={agit} />)
            ) : (
              <EmptyMyAgitList onExploreClick={() => setActiveTab('explore')} />
            )}
          </div>
        )}
        {activeTab === 'explore' && (
          <div>
            {exploreAgits.length > 0 ? (
                exploreAgits.map(agit => <ProfileAgitListItem key={agit.id} agit={agit} />)
            ) : (
              <p>탐색할 아지트가 없습니다.</p> // (혹은 다른 Empty UI)
            )}
          </div>
        )}
      </main>
      <FloatingActionButton onClick={handleCreateAgit} />
    </>
  );
}