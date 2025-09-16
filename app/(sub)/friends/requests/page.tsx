import React from 'react';
// ⭐️ 데이터를 서버에서 직접 import
import { 
  sampleSentRequests, 
  sampleReceivedRequests 
} from '@/app/data/sampleFriendData';
// ⭐️ 방금 만든 클라이언트 페이지 컴포넌트 import
import RequestsClientPage from '@/app/components/domain/friends/FriendRequest/RequestsClientPage';

// ⭐️ 2초 딜레이를 주는 데이터 페칭 함수 시뮬레이션
async function getRequestData() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
  return {
    sentRequests: sampleSentRequests,
    receivedRequests: sampleReceivedRequests
  };
}

// ⭐️ 페이지를 async 함수로 변경
export default async function FriendRequestsPage() {
  // ⭐️ 데이터를 await으로 호출 (이 시간 동안 loading.tsx가 노출됨)
  const data = await getRequestData();

  // ⭐️ 데이터 로딩이 끝나면, 클라이언트 컴포넌트에 props로 전달하여 렌더링
  return (
    <RequestsClientPage
      sentRequests={data.sentRequests}
      receivedRequests={data.receivedRequests}
    />
  );
}