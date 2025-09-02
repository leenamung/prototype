"use client";
import Image from 'next/image';
import React from 'react';

interface AgitHeaderProps {
  coverImage: string;
  name: string;
  memberCount: number;
  onWritePostClick: () => void;
  onInviteMemberClick: () => void;
}

const AgitHeader: React.FC<AgitHeaderProps> = ({ coverImage, name, memberCount, onWritePostClick, onInviteMemberClick }) => {
  return (
    <div className="relative border-b border-[var(--color-border)]">
      <div className="relative w-full aspect-[10/3] overflow-hidden">
        <Image src={coverImage} alt={`${name} 아지트 커버 이미지`} fill className="object-cover" priority />
      </div>
      <div className="p-5 bg-[var(--color-component-bg)]">
        <h1 className="text-2xl font-bold text-[var(--text-main)]">{name}</h1>
        <p className="text-[var(--text-subtle)] text-sm mt-2">멤버 {memberCount}명</p>
        <div className="flex mt-5 space-x-2">
          <button
            onClick={onWritePostClick}
            className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
          >
            <i className="ri-pencil-line ri-sm mr-1.5"></i>
            <span>글쓰기</span>
          </button>
          <button
            onClick={onInviteMemberClick}
            className="bg-[var(--color-component-bg)] border border-[var(--color-border)] px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium text-[var(--text-subtle)] hover:border-[var(--color-primary-dark)] active:bg-[var(--color-border-dark)] transition-all"
          >
            <i className="ri-user-add-line ri-sm mr-1.5"></i>
            <span>멤버 초대</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgitHeader;