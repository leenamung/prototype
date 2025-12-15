import React from 'react';
import { 
  sampleSentRequests, 
  sampleReceivedRequests 
} from '@/app/data/sampleFriendData';
import RequestsClientPage from '@/app/components/domain/friends/views/RequestsClientPage';
// 1. 네비게이션 바 Import
import RequestsNavigationBar from '@/app/components/domain/friends/layout/RequestsNavigationBar';

async function getRequestData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    sentRequests: sampleSentRequests,
    receivedRequests: sampleReceivedRequests
  };
}

export default async function FriendRequestsPage() {
  const data = await getRequestData();

  return (
    <div className="flex flex-col h-full">
      {/* 1. 네비게이션 바 (flex-none) */}
      <RequestsNavigationBar />

      {/* 2. 콘텐츠 영역 (flex-1) */}
      {/* pt-14 제거, overflow-y-auto 적용 */}
      <div className="flex-1 overflow-y-auto">
        <RequestsClientPage
          sentRequests={data.sentRequests}
          receivedRequests={data.receivedRequests}
        />
      </div>
    </div>
  );
}