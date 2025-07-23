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

const AgitHeader: React.FC<AgitHeaderProps> = ({
  coverImage,
  name,
  memberCount,
  onWritePostClick,
  onInviteMemberClick,
}) => {
  return (
    <div className="relative">
      <div className="relative w-full aspect-[10/3] overflow-hidden">
        <Image
          src={coverImage}
          alt={`${name} 아지트 커버 이미지`}
          fill
          className="object-cover"
          priority // 페이지 상단에 위치하므로 우선순위를 높여 빠르게 로드
        />
      </div>
      <div className="p-4 bg-white">
        <h1 className="text-2xl font-bold text-[var(--text-main)]">{name}</h1>
        <p className="text-[var(--text-subtle)] text-sm mt-1">멤버 {memberCount}명</p>
        <div className="flex mt-4 space-x-2">
          <button
            onClick={onWritePostClick}
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <i className="ri-pencil-line ri-sm mr-1.5"></i>
            <span>글쓰기</span>
          </button>
          <button
            onClick={onInviteMemberClick}
            // 보조 버튼 배경 및 텍스트 색상 변경
            className="bg-[var(--color-sub-beige)] border border-[var(--color-sub-light-gray)] px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium text-[var(--text-subtle)] hover:bg-opacity-80 hover:border-[var(--color-primary)]/50 transition-all"
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
