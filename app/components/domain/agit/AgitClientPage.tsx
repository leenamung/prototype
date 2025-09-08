"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AgitListTabs, { AgitListTabKey } from './AgitListTabs';
import EmptyMyAgitList from './ui/empty/EmptyMyAgitList';
import { UserAgitSummary } from '@/app/data/profileSampleData';
import ProfileAgitListItem from '../common/AgitListItem';
import FloatingActionButton from '../common/FloatingActionButton';

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
              myAgits.map(agit => <ProfileAgitListItem key={agit.id} agit={agit} />)
            ) : (
              <EmptyMyAgitList onExploreClick={() => setActiveTab('explore')} />
            )}
          </div>
        )}
        {activeTab === 'explore' && (
          <div>
            {exploreAgits.map(agit => <ProfileAgitListItem key={agit.id} agit={agit} />)}
          </div>
        )}
      </main>
      <FloatingActionButton onClick={handleCreateAgit} />
    </>
  );
}