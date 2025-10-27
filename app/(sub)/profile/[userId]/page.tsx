import React from 'react';
// 수정된 sampleData import 및 함수 사용
import { getProfileDataForUser, UserProfileData } from '@/app/data/profileSampleData';
import ProfileView from '@/app/components/domain/profile/ProfileView'; // 기존 ProfileView 재사용
import { notFound } from 'next/navigation';

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션 (userId에 따라 다른 데이터 반환)
async function getUserProfileData(userId: string): Promise<UserProfileData | null> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // currentUserId는 실제 로그인 구현 시 동적으로 받아와야 합니다. 여기서는 'user_me_sky'로 가정합니다.
  return getProfileDataForUser(userId, "user_me_sky");
}

// 동적 라우트 페이지 컴포넌트
export default async function UserProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const profileData = await getUserProfileData(userId);

  if (!profileData) {
    // 사용자를 찾을 수 없는 경우 404 페이지 표시
    notFound();
  }

  // 내 프로필인지 여부를 확인 (관계 상태가 'self'인지)
  // const isMyProfile = profileData.relationshipStatus === 'self';

  // ProfileView 컴포넌트에 isMyProfile prop을 추가하여 전달하는 것을 고려해볼 수 있습니다.
  // 여기서는 일단 데이터만 전달합니다.
  return (
    // UI 렌더링을 모두 ProfileView에 위임합니다.
    // ProfileView 내부에서 relationshipStatus에 따라 UI를 분기 처리합니다.
    <ProfileView profileData={profileData} />
  );
}