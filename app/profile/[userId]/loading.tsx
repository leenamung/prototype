import React from 'react';
// 기존 스켈레톤 컴포넌트 재사용
import SkeletonProfileHeader from '@/app/components/domain/profile/ui/skeletons/SkeletonProfileHeader';
import SkeletonProfileTabs from '@/app/components/domain/profile/ui/skeletons/SkeletonProfileTabs';
import SkeletonProfileNavigationBar from '@/app/components/domain/profile/ui/skeletons/SkeletonProfileNavigationBar'; // 네비게이션 스켈레톤 추가
import SkeletonProfileDiariesContent from '@/app/components/domain/profile/ui/skeletons/SkeletonProfileDiariesContent';

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      {/* 헤더 스켈레톤 (flex-none) */}
      <SkeletonProfileNavigationBar />
      
      {/* 콘텐츠 스켈레톤 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto">
        <SkeletonProfileHeader />
        
        {/* SkeletonProfileTabs는 sticky top-0으로 수정되어야 함 (아래 참조) */}
        <SkeletonProfileTabs />
        
        <div className="px-4 py-4">
          <SkeletonProfileDiariesContent />
        </div>
      </div>
    </div>
  );
}