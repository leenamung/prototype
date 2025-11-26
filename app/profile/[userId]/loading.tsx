import React from 'react';
// 기존 스켈레톤 컴포넌트 재사용
import SkeletonProfileHeader from '@/app/components/domain/profile/ProfileHeader/ui/skeletons/SkeletonProfileHeader';
import SkeletonProfileTabs from '@/app/components/domain/profile/ProfileTabs/ui/skeletons/SkeletonProfileTabs';
import SkeletonProfileDiariesContent from '@/app/components/domain/profile/ProfileContent/ui/skeletons/SkeletonProfileDiariesContent';
import SkeletonProfileNavigationBar from '@/app/components/domain/profile/ProfileNavigationBar/ui/skeletons/SkeletonProfileNavigationBar'; // 네비게이션 스켈레톤 추가

export default function Loading() {
  return (
    <>
      {/* 상대방 프로필도 고정 네비게이션 사용 */}
      <SkeletonProfileNavigationBar />
      <div className="pt-14"> {/* 네비게이션 높이만큼 패딩 */}
        <SkeletonProfileHeader />
        <SkeletonProfileTabs />
        <div className="px-4 py-4">
          <SkeletonProfileDiariesContent />
        </div>
      </div>
    </>
  );
}