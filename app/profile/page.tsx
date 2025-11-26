import React from 'react';
import { sampleMyProfileData } from '@/app/data/profileSampleData';
import ProfileView from '@/app/components/domain/profile/ProfileView';
import ProfileNavigationBar from '@/app/components/domain/profile/ProfileNavigationBar/ProfileNavigationBar';

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션
async function getProfileData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return sampleMyProfileData;
}

export default async function ProfilePage() {
  const profileData = await getProfileData();

  return (
    <>
      {/* 1. 내 프로필 전용 네비게이션 바 */}
      <ProfileNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <ProfileView profileData={profileData} />
      </div>
    </>
  );
}