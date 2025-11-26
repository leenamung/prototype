import React from 'react';
import SkeletonProfileHeader from '@/app/components/domain/profile/ProfileHeader/ui/skeletons/SkeletonProfileHeader';
import SkeletonProfileTabs from '@/app/components/domain/profile/ProfileTabs/ui/skeletons/SkeletonProfileTabs';
import SkeletonProfileDiariesContent from '@/app/components/domain/profile/ProfileContent/ui/skeletons/SkeletonProfileDiariesContent';
import SkeletonProfileNavigationBar from '@/app/components/domain/profile/ProfileNavigationBar/ui/skeletons/SkeletonProfileNavigationBar';

export default function Loading() {
  return (
    <>
      <SkeletonProfileNavigationBar />
      <SkeletonProfileHeader />
      <SkeletonProfileTabs />
      <div className="px-4 py-4">
        <SkeletonProfileDiariesContent />
      </div>
    </>
  );
}