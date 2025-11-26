import React from 'react';
import SkeletonAgitSettingsNavigationBar from '@/app/components/domain/agit/settings/ui/skeletons/SkeletonAgitSettingsNavigationBar';
import SkeletonAgitSettingsClientPage from '@/app/components/domain/agit/settings/ui/skeletons/SkeletonAgitSettingsClientPage';

export default function Loading() {
  return (
    <div className="pb-20">
      {/* 고정된 네비게이션 스켈레톤 */}
      <SkeletonAgitSettingsNavigationBar />
      {/* 스크롤되는 메인 콘텐츠 스켈레톤 */}
      <SkeletonAgitSettingsClientPage />
    </div>
  );
}