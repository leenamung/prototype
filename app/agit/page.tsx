import React from 'react';
import { sampleMyProfileData, UserAgitSummary } from '@/app/data/profileSampleData';
import AgitClientPage from '@/app/components/domain/agit/views/AgitListClientPage';
import AgitMainNavigationBar from '@/app/components/domain/agit/layout/AgitMainNavigationBar';

const exploreAgitsData: UserAgitSummary[] = [
    ...sampleMyProfileData.agits,
    { id: "a6", 
      name: "함께 성장하는 코딩 스터디", 
      memberCount: 78, 
      coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20laptop%2C%20coding%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit6&orientation=squarish",
      type: "club"
    },
    { id: "a7", 
      name: "주말 맛집 탐험대", 
      memberCount: 102, 
      coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20dining%2C%20food%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit7&orientation=squarish",
      type: "club"
    },
];

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션
async function getMyAgits() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // ❗️'내 아지트'가 비어있는 상태를 테스트하려면 아래 주석을 해제하세요.
  // return [];
  return sampleMyProfileData.agits;
}

export default async function AgitListPage() {
  const myAgits = await getMyAgits();
  return (
    <div className="flex flex-col h-full">
      
      {/* 1. 헤더 영역 (flex-none으로 높이 차지) */}
      <AgitMainNavigationBar />

      {/* 2. 콘텐츠 영역 
          - pt-14 제거: Flex 레이아웃이므로 패딩 불필요
          - flex-1: 남은 공간 모두 차지
          - overflow-y-auto: 내용이 넘치면 이 영역 내부에서만 스크롤 발생
      */}
      <div className="flex-1 overflow-y-auto">
        <AgitClientPage myAgits={myAgits} exploreAgits={exploreAgitsData} />
      </div>
    </div>
  );
}