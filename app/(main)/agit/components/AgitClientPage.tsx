// app/agit/components/AgitClientPage.tsx (새 파일)

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AgitListTabs, { AgitListTabKey } from './AgitListTabs';
import FloatingActionButton from '../../../components/FloatingActionButton';
import AgitListItem from '../../../components/AgitListItem'; // ✅ 공용 컴포넌트 경로로 수정
import EmptyMyAgitList from './EmptyMyAgitList';
import { UserAgitSummary } from '@/app/(sub)/profile/data/profileSampleData';

interface AgitClientPageProps {
  myAgits: UserAgitSummary[];
  exploreAgits: UserAgitSummary[];
}

export default function AgitClientPage({ myAgits, exploreAgits }: AgitClientPageProps) {
  const [activeTab, setActiveTab] = useState<AgitListTabKey>('myAgits');
  const router = useRouter();

  const handleCreateAgit = () => router.push('/agit/create');
  
  return (
    <>
      <AgitListTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="px-4 py-4">
        {activeTab === 'myAgits' && (
          <div>
            {myAgits.length > 0 ? (
              myAgits.map(agit => <AgitListItem key={agit.id} agit={agit} />)
            ) : (
              <EmptyMyAgitList onExploreClick={() => setActiveTab('explore')} />
            )}
          </div>
        )}
        {activeTab === 'explore' && (
          <div>
            {exploreAgits.map(agit => <AgitListItem key={agit.id} agit={agit} />)}
          </div>
        )}
      </main>
      <FloatingActionButton onClick={handleCreateAgit} />
    </>
  );
}