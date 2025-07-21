// app/profile/components/ProfileAgitListItem.tsx
"use client";

import React from 'react';
import type { UserAgitSummary } from '../data/profileSampleData'; // 데이터 타입 임포트
import Link from 'next/link'; // 아지트 상세 페이지로 이동하기 위해 Link 사용

interface ProfileAgitListItemProps {
  agit: UserAgitSummary;
}

const ProfileAgitListItem: React.FC<ProfileAgitListItemProps> = ({ agit }) => {
  return (
    // Link to the specific agit page, e.g., /agit/[agit.id]
    // ** 수정된 부분: legacyBehavior 제거 및 Link에 직접 스타일 적용 **
    <Link 
      href={`/agit/${agit.id}`}
      className="flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
    >
      <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden mr-3 flex-shrink-0"> {/* Changed to rounded-lg */}
        <img
          src={agit.coverImage}
          alt={`${agit.name} 아지트 이미지`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0"> {/* min-w-0 for proper truncation */}
        <p className="text-sm font-medium text-gray-800 truncate">{agit.name}</p>
        <p className="text-xs text-gray-500">멤버 {agit.memberCount}명</p>
      </div>
      <div className="ml-auto text-gray-400">
          <i className="ri-arrow-right-s-line ri-lg"></i>
      </div>
    </Link>
  );
};

export default ProfileAgitListItem;
