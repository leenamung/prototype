import React from 'react';
import { 
  sampleRecommendedFriends, 
  sampleMyFriends, 
  sampleReceivedRequests 
} from '@/app/data/sampleFriendData';
import FriendsClientPage from '@/app/components/domain/friends/views/FriendsClientPage';
// 1. 네비게이션 바 Import
import FriendsNavigationBar from '@/app/components/domain/friends/layout/FriendsNavigationBar';

async function getFriendsData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    recommendedFriends: sampleRecommendedFriends,
    myFriends: sampleMyFriends,
    receivedRequests: sampleReceivedRequests
  };
}

export default async function FriendsPage() {
  const data = await getFriendsData();
  // 요청 개수는 여기서 계산하여 네비게이션 바에 전달
  const requestCount = data.receivedRequests.length;

  return (
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      <FriendsNavigationBar requestCount={requestCount} />

      <div className="flex-1 overflow-y-auto">
        <FriendsClientPage 
          recommendedFriends={data.recommendedFriends}
          myFriends={data.myFriends}
        />
      </div>
    </div>
  );
}