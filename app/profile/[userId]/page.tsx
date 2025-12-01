import React from 'react';
import { getProfileDataForUser, UserProfileData } from '@/app/data/profileSampleData';
import ProfileView from '@/app/components/domain/profile/views/ProfileView';
import UserProfileNavigationBar from '@/app/components/domain/profile/layout/UserProfileNavigationBar';
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
    <div className="flex flex-col h-full bg-[var(--color-background)]">
      {/* 1. 타인 프로필 전용 네비게이션 바 (flex-none) */}
      <UserProfileNavigationBar 
        userName={profileData.name}
        userId={profileData.userId}
        relationshipStatus={profileData.relationshipStatus}
      />

      {/* 2. 콘텐츠 영역 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto relative">
        <ProfileView profileData={profileData} />
      </div>
    </div>
  );
}