"use client";

import Image from 'next/image';
import React from 'react';

interface ProfileHeaderProps {
  profileImage: string;
  name: string;
  bio: string;
  friendCount: number;
  onEditProfileClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  name,
  bio,
  friendCount,
  onEditProfileClick,
}) => {
  return (
    <div className="pt-14 pb-4 px-4 bg-[var(--color-component-bg)]"> 
      <div className="flex flex-col items-center mt-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
          <Image
            src={profileImage}
            alt={`${name} 프로필 사진`}
            className="w-full h-full object-cover"
            width={96}
            height={96}
          />
        </div>
        {/* 이름 텍스트 색상 변경 */}
        <h2 className="text-xl font-bold text-[var(--text-main)] mb-1">{name}</h2>
        {/* 소개 텍스트 색상 변경 */}
        <p className="text-sm text-[var(--text-subtle)] mb-3 text-center max-w-md px-4">{bio}</p>
        {/* 친구 수 텍스트 색상 변경 */}
        <div className="text-sm text-[var(--text-subtle)] mb-4 cursor-pointer hover:text-[var(--color-primary)] transition-colors">
          친구 {friendCount}명
        </div>
        <button
          onClick={onEditProfileClick}
          className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-6 py-2 rounded-[var(--rounded-button)] font-medium text-sm hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
        >
          프로필 편집
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
