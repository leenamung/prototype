"use client";
import React from 'react';
import type { UserAgitSummary } from '../(sub)/profile/data/profileSampleData';
import Link from 'next/link';
import Image from 'next/image';

interface ProfileAgitListItemProps {
  agit: UserAgitSummary;
}

const ProfileAgitListItem: React.FC<ProfileAgitListItemProps> = ({ agit }) => {
  return (
    <Link 
      href={`/agit/${agit.id}`}
      className="flex items-center p-4 border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-subtle-bg)] transition-colors duration-150"
    >
      <div className="w-12 h-12 rounded-lg bg-[var(--color-border)] overflow-hidden mr-4 flex-shrink-0">
        <Image
          src={agit.coverImage}
          alt={`${agit.name} 아지트 이미지`}
          className="w-full h-full object-cover"
          width={48}
          height={48}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-main)] truncate">{agit.name}</p>
        <p className="text-xs text-[var(--text-subtle)] mt-1">멤버 {agit.memberCount}명</p>
      </div>
      <div className="ml-auto text-[var(--text-subtle)]">
          <i className="ri-arrow-right-s-line ri-lg"></i>
      </div>
    </Link>
  );
};

export default ProfileAgitListItem;