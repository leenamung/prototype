import React from 'react';
import AgitSearchClientPage from '@/app/components/domain/agit/search/AgitSearchClientPage';
import { sampleMyProfileData } from '@/app/data/profileSampleData'; // 👈 샘플 데이터 import

// '탐색' 탭의 데이터를 검색 대상으로 사용 (임시)
// 실제로는 이 페이지에서 API를 호출하거나, 클라이언트에서 API를 호출해야 합니다.
const allSearchableAgits = [
    ...sampleMyProfileData.agits, // (데이터 파일에서 직접 가져오는 대신, 다른 샘플 데이터 활용)
    { id: "a6", name: "함께 성장하는 코딩 스터디", memberCount: 78, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20laptop%2C%20coding%2C%20...&width=100&height=100&seq=agit6&orientation=squarish"},
    { id: "a7", name: "주말 맛집 탐험대", memberCount: 102, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20dining%2C%20food%2C%20...&width=100&height=100&seq=agit7&orientation=squarish"},
    { id: "a8", name: "영화 리뷰 모임", memberCount: 50, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20movie%20film%2C%20...&width=100&height=100&seq=agit5&orientation=squarish"},
    { id: "a9", name: "새벽 기상 챌린지", memberCount: 120, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20sunrise%2C%20alarm%20clock%2C%20...&width=100&height=100&seq=agit8&orientation=squarish"},
];

export default function AgitSearchPage() {
  // 
  // 실제 구현에서는 서버에서 검색 API를 호출하거나,
  // 클라이언트 컴포넌트에서 API를 호출하도록 합니다.
  // 여기서는 검색 대상이 될 전체 목록을 prop으로 넘기는 시뮬레이션을 합니다.
  //
  return <AgitSearchClientPage allAgits={allSearchableAgits} />;
}