"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AgitListTabs, { AgitListTabKey } from './AgitListTabs';
import EmptyMyAgitList from './ui/empty/EmptyMyAgitList';
import { UserAgitSummary } from '@/app/data/profileSampleData';
import ProfileAgitListItem from '../common/AgitListItem';
import FloatingActionButton from '../common/FloatingActionButton';
import AgitMainNavigationBar from './AgitMainNavigationBar'; // 👈 [추가] 네비게이션 바 import

interface AgitClientPageProps {
  myAgits: UserAgitSummary[];
  exploreAgits: UserAgitSummary[];
}

export default function AgitClientPage({ myAgits, exploreAgits }: AgitClientPageProps) {
  const [activeTab, setActiveTab] = useState<AgitListTabKey>('myAgits');
  const router = useRouter();

  // 👈 [추가] 네비게이션 바에 필요한 프로필 이미지 (임시)
  const userProfileImage = "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish";

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