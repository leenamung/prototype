import React from 'react';
import SkeletonRequestsNavigationBar from '@/app/components/domain/friends/ui/skeletons/SkeletonRequestsNavigationBar';
import SkeletonFriendRequestItem from '@/app/components/domain/friends/ui/skeletons/SkeletonFriendRequestItem';

export default function Loading() {
  return (
    <>
      {/* 1. 친구 요청 페이지 헤더 스켈레톤 */}
      <SkeletonRequestsNavigationBar />

      {/* 2. 메인 콘텐츠 (pt-14) */}
      <main className="pt-14">
        
        {/* 섹션 1: 내가 보낸 요청 스켈레톤 */}
        <section className="mb-4">
          {/* 섹션 헤더 */}
          <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 animate-pulse">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div>
            <SkeletonFriendRequestItem /> {/* 1개 정도만 표시 */}
          </div>
        </section>

        {/* 섹션 2: 나에게 온 요청 스켈레톤 */}
        <section>
          {/* 섹션 헤더 */}
          <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 animate-pulse">
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
          </div>
          <div>
            <SkeletonFriendRequestItem />
            <SkeletonFriendRequestItem />
          </div>
        </section>

      </main>
    </>
  );
}