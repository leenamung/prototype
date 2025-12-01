"use client";
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation'; // 👈 useRouter 추가

interface AgitHeaderProps {
  agitId: string; // 👈 agitId를 받아오도록 추가 (설정 페이지 이동용)
  coverImage: string;
  name: string;
  memberCount: number;
  onWritePostClick: () => void;
  onInviteMemberClick: () => void;
  showInviteButton?: boolean;
  showSettingsButton?: boolean; // 👈 showSettingsButton prop 추가
}

const AgitHeader: React.FC<AgitHeaderProps> = ({
  agitId, // 👈 agitId 받기
  coverImage,
  name,
  memberCount,
  onWritePostClick,
  onInviteMemberClick,
  showInviteButton = false,
  showSettingsButton = false // 👈 prop 받기
}) => {
  const router = useRouter(); // 👈 router 초기화

  const handleSettingsClick = () => {
    router.push(`/agit/${agitId}/settings`); // 👈 설정 페이지로 이동
  };

  return (
    <div className="relative border-b border-[var(--color-border)]">
      <div className="relative w-full aspect-[10/3] overflow-hidden">
        <Image src={coverImage} alt={`${name} 아지트 커버 이미지`} fill className="object-cover" priority />
      </div>
      <div className="p-5 bg-[var(--color-component-bg)]">
        {/* 👈 [수정] 헤더 콘텐츠 영역을 flex로 감싸고 justify-between 적용 */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-main)]">{name}</h1>
            <p className="text-[var(--text-subtle)] text-sm mt-2">멤버 {memberCount}명</p>
          </div>
          {/* 👈 [추가] 관리자일 경우 설정 버튼 표시 */}
          {showSettingsButton && (
            <button
              onClick={handleSettingsClick}
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
              aria-label="아지트 설정"
            >
              <i className="ri-settings-3-line ri-lg text-[var(--text-subtle)]"></i>
            </button>
          )}
        </div>
        <div className="flex mt-5 space-x-2">
          <button
            onClick={onWritePostClick}
            className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
          >
            <i className="ri-pencil-line ri-sm mr-1.5"></i>
            <span>글쓰기</span>
          </button>
          {showInviteButton && (
            <button
              onClick={onInviteMemberClick}
              className="bg-[var(--color-component-bg)] border border-[var(--color-border)] px-4 py-2 rounded-[var(--rounded-button)] flex items-center cursor-pointer text-sm font-medium text-[var(--text-subtle)] hover:border-[var(--color-primary-dark)] active:bg-[var(--color-border-dark)] transition-all"
            >
              <i className="ri-user-add-line ri-sm mr-1.5"></i>
              <span>멤버 초대</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgitHeader;