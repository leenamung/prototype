"use client";
import React from 'react';
import RecommendedFriendCarousel from '@/app/components/domain/friends/Recommended/RecommendedFriendCarousel';
import FriendListItem from '@/app/components/domain/friends/FriendList/FriendListItem';
import type { RecommendedFriend, Friend } from '@/app/data/sampleFriendData';

interface FriendsClientPageProps {
  recommendedFriends: RecommendedFriend[];
  myFriends: Friend[];
  // receivedRequests는 NavigationBar에서만 쓰이므로 ClientPage Props에서 제거합니다.
}

export default function FriendsClientPage({
  recommendedFriends,
  myFriends,
}: FriendsClientPageProps) {
  
  return (
    <>
      {/* ❌ FriendsNavigationBar 제거됨 */}
      
      {/* ✅ pt-14 제거 (부모에서 처리), px-4는 콘텐츠 여백이므로 유지 */}
      <main className="px-4 py-4">
        
        {/* 검색창 */}
        <div className="relative mb-4"> {/* my-4 -> mb-4 (상단 여백은 pt-14로 충분) */}
          <div className="flex items-center bg-[var(--color-subtle-bg)] rounded-lg px-4 py-2.5
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