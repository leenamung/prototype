"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AgitMainNavigationBar from './components/AgitMainNavigationBar'; 
import AgitListTabs, { AgitListTabKey } from './components/AgitListTabs';
import FloatingActionButton from '../components/FloatingActionButton';
import ProfileAgitListItem from '../profile/components/ProfileAgitListItem';
import { sampleUserProfileData } from '../profile/data/profileSampleData';
import EmptyMyAgitList from './components/EmptyMyAgitList';

const exploreAgitsData = [
    ...sampleUserProfileData.agits,
    { id: "a6", name: "함께 성장하는 코딩 스터디", memberCount: 78, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20laptop%2C%20coding%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit6&orientation=squarish" },
    { id: "a7", name: "주말 맛집 탐험대", memberCount: 102, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20dining%2C%20food%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit7&orientation=squarish" },
];

export default function AgitListPage() {
  const [activeTab, setActiveTab] = useState<AgitListTabKey>('myAgits');
  const router = useRouter();
  const myAgits = sampleUserProfileData.agits;
  // const myAgits: UserAgitSummary[] = [];
  const handleCreateAgit = () => router.push('/agit/create');

  return (
    <div className="pt-14">
      <AgitMainNavigationBar 
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />
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
            {exploreAgitsData.map(agit => <ProfileAgitListItem key={agit.id} agit={agit} />)}
          </div>
        )}
      </main>
      <FloatingActionButton onClick={handleCreateAgit} />
    </div>
  );
}