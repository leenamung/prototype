import React from 'react';
import SkeletonProfileHeader from '../../components/domain/profile/ProfileHeader/ui/skeletons/SkeletonProfileHeader';
import SkeletonProfileTabs from '../../components/domain/profile/ProfileTabs/ui/skeletons/SkeletonProfileTabs';
import SkeletonProfileDiariesContent from '@/app/components/domain/profile/ProfileContent/ui/skeletons/SkeletonProfileDiariesContent';

export default function Loading() {
  return (
    <>
      <SkeletonProfileHeader />
      <SkeletonProfileTabs />
      <div className="px-4 py-4">
        <SkeletonProfileDiariesContent />
      </div>
    </>
  );
}