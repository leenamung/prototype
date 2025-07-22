// app/agit/page.tsx (또는 app/agit/[id]/page.tsx)
"use client";

import React, { useState, useEffect } from 'react';
import AgitNavigationBar from './components/AgitNavigationBar';
import AgitHeader from './components/AgitHeader';
import AgitTabs, { AgitTabKey } from './components/AgitTabs';
import AgitFeedContent from './components/AgitFeedContent';
import AgitInfoContent from './components/AgitInfoContent';
import AgitMembersContent from './components/AgitMembersContent';
import { sampleAgitData } from './data/agitSampleData'; // 샘플 데이터 임포트

// 이 페이지는 동적 라우트 ([id])를 사용할 경우 params를 받을 수 있습니다.
// interface AgitPageProps {
//   params: { id: string };
// }
// const AgitPage: React.FC<AgitPageProps> = ({ params }) => {
//   const agitId = params.id;
//   // useEffect를 사용하여 agitId로 실제 아지트 데이터 fetching
//   const agitData = sampleAgitData; // 현재는 샘플 데이터 사용

export default function AgitPage() {
  const [activeTab, setActiveTab] = useState<AgitTabKey>('feed');
  const agitData = sampleAgitData; // 실제로는 ID에 따라 fetch 하거나 props로 받아야 함

  // body 태그에 패딩을 추가하여 하단 탭바에 내용이 가려지지 않도록 합니다.
  // 이 로직은 RootLayout으로 옮기는 것이 더 적절할 수 있습니다.
  // useEffect(() => {
  //   document.body.classList.add('pb-16'); // h-16 (4rem)
  //   return () => {
  //     document.body.classList.remove('pb-16');
  //   };
  // }, []);
  
  // Top navigation bar height (h-14)
  const navBarHeight = "56px"; 
  // AgitHeader는 스크롤되므로, AgitTabs의 sticky top 값은 navBarHeight와 동일하게 설정합니다.

  return (
    // pt-14는 상단 AgitNavigationBar의 높이입니다.
    <div className="pt-14"> 
      <AgitNavigationBar 
        onNotificationClick={() => console.log("알림 클릭")}
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />
      
      <AgitHeader
        coverImage={agitData.coverImage}
        name={agitData.name}
        memberCount={agitData.memberCount}
        onWritePostClick={() => console.log("글쓰기 클릭")}
        onInviteMemberClick={() => console.log("멤버 초대 클릭")}
      />

      <AgitTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 탭 콘텐츠 조건부 렌더링 */}
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
    </div>
  );
}
