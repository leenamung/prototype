import React from 'react';
import { 
  sampleSentRequests, 
  sampleReceivedRequests 
} from '@/app/data/sampleFriendData';
import RequestsClientPage from '@/app/components/domain/friends/FriendRequest/RequestsClientPage';
// 1. 네비게이션 바 Import
import RequestsNavigationBar from '@/app/components/domain/friends/Navigation/RequestsNavigationBar';

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
    <>
      {/* 2. 네비게이션 바 */}
      <RequestsNavigationBar />

      {/* 3. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <RequestsClientPage
          sentRequests={data.sentRequests}
          receivedRequests={data.receivedRequests}
        />
      </div>
    </>
  );
}