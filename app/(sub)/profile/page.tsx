import React from 'react';
import { sampleUserProfileData } from '../../data/profileSampleData';
import ProfileView from '../../components/domain/profile/ProfileView'; // 새로 만든 통합 클라이언트 컴포넌트

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션
async function getProfileData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return sampleUserProfileData;
}

// page.tsx는 이제 서버 컴포넌트입니다.
export default async function ProfilePage() {
  const profileData = await getProfileData();

  return (
    // UI 렌더링을 모두 ProfileView에 위임합니다.
    <ProfileView profileData={profileData} />
  );
}