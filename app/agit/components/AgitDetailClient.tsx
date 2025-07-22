// app/agit/components/AgitDetailClient.tsx
"use client";

import React, { useState } from 'react';
import AgitHeader from './AgitHeader';
import AgitTabs, { AgitTabKey } from './AgitTabs';
import AgitFeedContent from './AgitFeedContent';
import AgitInfoContent from './AgitInfoContent';
import AgitMembersContent from './AgitMembersContent';
import type { AgitInfo } from '../data/agitSampleData'; // 데이터 타입 임포트

// Agit 상세 페이지에 필요한 데이터 타입을 props로 정의
interface AgitDetailClientProps {
  agitData: AgitInfo;
}

const AgitDetailClient: React.FC<AgitDetailClientProps> = ({ agitData }) => {
  const [activeTab, setActiveTab] = useState<AgitTabKey>('feed');

  // 만약 데이터가 없다면 에러 메시지 표시
  if (!agitData) {
    return <div className="pt-14 text-center">아지트 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <AgitHeader
        coverImage={agitData.coverImage}
        name={agitData.name}
        memberCount={agitData.memberCount}
        onWritePostClick={() => console.log("글쓰기 클릭")}
        onInviteMemberClick={() => console.log("멤버 초대")}
      />

      <AgitTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'feed' && (
        <AgitFeedContent notice={agitData.notice} feedItems={agitData.feedItems} />
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