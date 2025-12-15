import React from 'react';
import { sampleMyProfileData } from '@/app/data/profileSampleData';
import ProfileView from '@/app/components/domain/profile/views/ProfileView';
import ProfileNavigationBar from '@/app/components/domain/profile/layout/ProfileNavigationBar';

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션
async function getProfileData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return sampleMyProfileData;
}

export default async function ProfilePage() {
  const profileData = await getProfileData();

  return (
    <div className="flex flex-col h-full">
      {/* 1. 내 프로필 전용 네비게이션 바 (flex-none) */}
      <ProfileNavigationBar />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거. ProfileView 내부에서 스크롤됨 */}
      <div className="flex-1 overflow-y-auto relative">
        <ProfileView profileData={profileData} />
      </div>
    </div>
  );
}