import React from 'react';
import { 
  sampleRecommendedFriends, 
  sampleMyFriends, 
  sampleReceivedRequests 
} from '@/app/data/sampleFriendData';
import FriendsClientPage from '@/app/components/domain/friends/FriendsClientPage';
// 1. 네비게이션 바 Import
import FriendsNavigationBar from '@/app/components/domain/friends/Navigation/FriendsNavigationBar';

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
    <>
      {/* 2. 네비게이션 바 */}
      <FriendsNavigationBar requestCount={requestCount} />

      {/* 3. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <FriendsClientPage 
          recommendedFriends={data.recommendedFriends}
          myFriends={data.myFriends}
        />
      </div>
    </>
  );
}