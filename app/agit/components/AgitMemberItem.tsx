"use client";

import React from 'react';
import type { AgitMember } from '../data/agitSampleData';
import Image from 'next/image';

interface AgitMemberItemProps {
  member: AgitMember;
}

const AgitMemberItem: React.FC<AgitMemberItemProps> = ({ member }) => {
  return (
    // 호버 시 배경색 변경
    <div className="p-4 flex items-center border-b border-[var(--color-sub-light-gray)] hover:bg-[var(--color-sub-beige)]/50 transition-colors duration-150"> {/* 구분선 및 호버 배경 변경 */}
      <div className="w-10 h-10 rounded-full bg-[var(--color-sub-light-gray)] overflow-hidden mr-3 flex-shrink-0">
        <Image
          src={member.profileImage}
          alt={`${member.name} 프로필`}
          className="w-full h-full object-cover"
          width={40}
          height={40}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          {/* 멤버 이름 텍스트 색상 변경 */}
          <p className="font-medium text-sm text-[var(--text-main)]">{member.name}</p>
          {member.isAdmin && (
            // 관리자 뱃지 배경 및 텍스트 색상 유지 (primary 강조)
            <span className="ml-2 text-xs text-[var(--color-primary)] bg-[var(--agit-notice-badge-bg)] px-2 py-0.5 rounded-full font-medium">
              관리자
            </span>
          )}
        </div>
        {/* 가입일 텍스트 색상 변경 */}
        <p className="text-xs text-[var(--text-subtle)]">{member.joinDate}</p>
      </div>
    </div>
  );
};

export default AgitMemberItem;
