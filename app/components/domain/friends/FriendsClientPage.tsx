"use client";
import React from 'react';
// 컴포넌트 import
import FriendsNavigationBar from '@/app/components/domain/friends/Navigation/FriendsNavigationBar';
import RecommendedFriendCarousel from '@/app/components/domain/friends/Recommended/RecommendedFriendCarousel';
import FriendListItem from '@/app/components/domain/friends/FriendList/FriendListItem';
// 데이터 타입 import
import type { RecommendedFriend, Friend, FriendRequest } from '@/app/data/sampleFriendData';

// 데이터를 Props로 받도록 수정
interface FriendsClientPageProps {
  recommendedFriends: RecommendedFriend[];
  myFriends: Friend[];
  receivedRequests: FriendRequest[];
}

export default function FriendsClientPage({
  recommendedFriends,
  myFriends,
  receivedRequests
}: FriendsClientPageProps) {
  
  const newRequestCount = receivedRequests.length;

  return (
    <>
      {/* 1. 친구 탭 전용 네비게이션 (Fixed Top 0) */}
      <FriendsNavigationBar requestCount={newRequestCount} />

      {/* 2. 메인 콘텐츠 (pt-14) */}
      <main className="pt-14 px-4">
        
        {/* 검색창 */}
        <div className="relative my-4">
          <div className="flex items-center bg-[var(--color-subtle-bg)] rounded-full px-4 py-2.5
                        border border-transparent 
                        focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 
                        transition-all">
            <i className="ri-search-line text-[var(--text-subtle)] ri-lg mr-2"></i>
            <input
              type="text"
              placeholder="친구 검색..."
              className="flex-1 w-full bg-transparent text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/80 
                         outline-none border-none p-0 focus:ring-0"
            />
          </div>
        </div>

        {/* 추천 친구 섹션 */}
        <section className="mb-6 -mx-4">
          <h2 className="text-base font-semibold text-[var(--text-main)] mb-1 px-4">추천 친구</h2>
          <RecommendedFriendCarousel friends={recommendedFriends} />
        </section>

        {/* 내 친구 목록 섹션 */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">내 친구 {myFriends.length}명</h2>
          <div>
            {myFriends.map(friend => (
              <FriendListItem key={friend.id} friend={friend} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}