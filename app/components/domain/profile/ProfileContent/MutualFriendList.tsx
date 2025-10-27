"use client";

import React from 'react';
// sampleFriendData에서 Friend 타입과 전체 친구 목록 데이터를 가져옵니다.
// 실제 앱에서는 이 데이터 조회 로직이 달라질 수 있습니다 (예: API 호출, Context API 등).
import { Friend, sampleMyFriends } from '@/app/data/sampleFriendData';
import FriendListItem from '@/app/components/domain/friends/FriendList/FriendListItem';

interface MutualFriendListProps {
  title: string;
  friendIds?: string[]; // 함께 아는 친구 ID 배열 (옵셔널)
}

const MutualFriendList: React.FC<MutualFriendListProps> = ({ title, friendIds }) => {
  // friendIds 배열에 해당하는 친구 정보만 sampleMyFriends에서 필터링합니다.
  // 실제 앱에서는 API 호출이나 더 효율적인 데이터 구조를 사용할 수 있습니다.
  const mutualFriends: Friend[] = friendIds
    ? sampleMyFriends.filter(friend => friendIds.includes(friend.id))
    : [];

  if (!friendIds || mutualFriends.length === 0) {
    // 함께 아는 친구가 없을 경우 아무것도 렌더링하지 않거나, 메시지를 표시할 수 있습니다.
    // 여기서는 일단 아무것도 렌더링하지 않도록 합니다.
    return null;
  }

  return (
    <section className="mb-6">
      <h3 className="text-base font-semibold text-[var(--text-main)] mb-2 px-4">{title} ({mutualFriends.length}명)</h3>
      {/* FriendListItem 재사용 */}
      <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        {mutualFriends.map(friend => (
          <FriendListItem key={friend.id} friend={friend} />
        ))}
      </div>
    </section>
  );
};

export default MutualFriendList;