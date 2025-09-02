// app/notifications/components/SkeletonNotificationGroup.tsx

import React from 'react';
import SkeletonNotificationItem from './SkeletonNotificationItem';

const SkeletonNotificationGroup = () => {
  return (
    <div className="px-4 py-3">
      {/* 그룹 제목 스켈레톤 */}
      <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mb-4"></div>
      
      {/* 알림 아이템 스켈레톤 목록 */}
      <div className="space-y-3">
        <SkeletonNotificationItem />
        <SkeletonNotificationItem />
        <SkeletonNotificationItem />
      </div>
    </div>
  );
};

export default SkeletonNotificationGroup;