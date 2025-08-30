"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AgitInfo, sampleAgitData } from '../data/agitSampleData';
import AgitHeader from './AgitHeader';
import AgitTabs, { AgitTabKey } from './AgitTabs';
import AgitFeedContent from './AgitFeedContent';
import AgitInfoContent from './AgitInfoContent';
import AgitMembersContent from './AgitMembersContent';

interface AgitDetailClientProps {
  agitData: AgitInfo | null;
}

const AgitDetailClient: React.FC<AgitDetailClientProps> = ({ agitData }) => {
  const [activeTab, setActiveTab] = useState<AgitTabKey>('feed');
  const router = useRouter();

  if (!agitData) {
    return <div className="pt-20 text-center text-base text-[var(--text-subtle)]">아지트 정보를 불러올 수 없습니다.</div>;
  }
  
  const handleWritePost = () => {
    // 실제로는 아지트 ID를 가지고 글쓰기 페이지로 이동하게 됩니다.
    console.log(`Writing post for agit ${agitData.id}`);
    router.push('/write');
  };
  
  const handleInviteMember = () => {
    console.log("Invite member clicked");
  };

  return (
    <>
      <AgitHeader
        coverImage={agitData.coverImage}
        name={agitData.name}
        memberCount={agitData.memberCount}
        onWritePostClick={handleWritePost}
        onInviteMemberClick={handleInviteMember}
      />

      <AgitTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'feed' && (
        <AgitFeedContent notice={agitData.notice} feedItems={agitData.feedItems} onWritePostClick={handleWritePost} />
      )}
      {activeTab === 'info' && (
        <AgitInfoContent
          description={agitData.description}
          rules={agitData.rules}
          admin={agitData.admin}
          creationDate={agitData.creationDate}
          meetingCycle={agitData.meetingCycle}
        />
      )}
      {activeTab === 'members' && (
        <AgitMembersContent members={agitData.members} totalMemberCount={agitData.memberCount} />
      )}
    </>
  );
};

export default AgitDetailClient;