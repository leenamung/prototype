import React from 'react';
import { sampleMyProfileData } from '@/app/data/profileSampleData';
import AgitClientPage from '@/app/components/domain/agit/AgitClientPage';
import AgitMainNavigationBar from '../components/domain/agit/AgitMainNavigationBar';

const exploreAgitsData = [
    ...sampleMyProfileData.agits,
    { id: "a6", name: "함께 성장하는 코딩 스터디", memberCount: 78, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20laptop%2C%20coding%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit6&orientation=squarish"},
    { id: "a7", name: "주말 맛집 탐험대", memberCount: 102, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20dining%2C%20food%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit7&orientation=squarish"},
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
  const userProfileImage = "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish";
  return (
    <>
      {/* 1. 헤더 영역 */}
      <AgitMainNavigationBar userProfileImage={userProfileImage} />

      {/* 2. 콘텐츠 영역 (pt-14) */}
      <div className="pt-14">
        <AgitClientPage myAgits={myAgits} exploreAgits={exploreAgitsData} />
      </div>
    </>
  );
}