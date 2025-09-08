"use client";
import React from 'react';
import Image from 'next/image';
import { AgitMember } from '@/app/data/agitSampleData';

interface AgitMemberItemProps {
  member: AgitMember;
}

const AgitMemberItem: React.FC<AgitMemberItemProps> = ({ member }) => {
  return (
    <div className="p-4 flex items-center border-b border-[var(--color-border)] hover:bg-[var(--color-subtle-bg)] transition-colors duration-150">
      <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
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
          <p className="font-medium text-sm text-[var(--text-main)]">{member.name}</p>
          {member.isAdmin && (
            <span className="ml-2 text-xs text-[var(--color-primary-dark)] bg-[var(--agit-notice-badge-bg)] px-2 py-0.5 rounded-full font-medium">
              관리자
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--text-subtle)]">{member.joinDate}</p>
      </div>
    </div>
  );
};

export default AgitMemberItem;