import React from 'react';
import { getProfileDataForUser, UserProfileData } from '@/app/data/profileSampleData';
import ProfileView from '@/app/components/domain/profile/ProfileView';
import UserProfileNavigationBar from '@/app/components/domain/profile/UserProfileNavigationBar/UserProfileNavigationBar';
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

  return (
    <>
      {/* 1. 타인 프로필 전용 네비게이션 바 */}
      <UserProfileNavigationBar 
        userName={profileData.name}
        userId={profileData.userId}
        relationshipStatus={profileData.relationshipStatus}
      />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <ProfileView profileData={profileData} />
      </div>
    </>
  );
}