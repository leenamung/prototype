import React from 'react';
import SkeletonFriendsNavigationBar from '@/app/components/domain/friends/Navigation/ui/skeletons/SkeletonFriendsNavigationBar';
import SkeletonRecommendedFriendCard from '@/app/components/domain/friends/Recommended/ui/skeletons/SkeletonRecommendedFriendCard';
import SkeletonFriendListItem from '@/app/components/domain/friends/FriendList/ui/skeletons/SkeletonFriendListItem';

export default function Loading() {
  return (
    <>
      {/* 1. 친구 페이지 헤더 스켈레톤 */}
      <SkeletonFriendsNavigationBar />

      {/* 2. 메인 콘텐츠 (pt-14) */}
      <main className="pt-14 px-4">
        {/* 검색창 스켈레톤 */}
        <div className="relative my-4">
          <div className="w-full h-11 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* 추천 친구 섹션 스켈레톤 */}
        <section className="mb-6 -mx-4">
          <div className="h-5 w-24 bg-gray-200 rounded mb-3 px-4"></div> {/* 타이틀 */}
          <div className="flex space-x-3 overflow-x-hidden px-4 pb-2">
            {/* StoryList 스켈레톤처럼 5개 정도 미리 보여주기 */}
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRecommendedFriendCard key={index} />
            ))}
          </div>
        </section>

        {/* 내 친구 목록 섹션 스켈레톤 */}
        <section className="mb-6">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div> {/* 타이틀 */}
          <div>
            {/* AgitList 스켈레톤처럼 3~4개 정도 미리 보여주기 */}
            <SkeletonFriendListItem />
            <SkeletonFriendListItem />
            <SkeletonFriendListItem />
          </div>
        </section>
      </main>
    </>
  );
}