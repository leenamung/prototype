"use client";
import React from 'react';
import Link from 'next/link';
import SettingsNavigationBar from './Navigation/SettingsNavigationBar';

// 재사용 가능한 리스트 아이템 컴포넌트
const SettingsListItem = ({ href, icon, label, isWarning = false }: { href: string; icon: string; label: string; isWarning?: boolean }) => (
  <Link href={href} className={`flex items-center p-4 text-sm font-medium transition-colors ${isWarning ? 'text-[var(--color-warning)] hover:bg-[var(--color-warning-bg)]' : 'text-[var(--text-main)] hover:bg-[var(--color-subtle-bg)]'}`}>
    <i className={`${icon} ri-lg mr-3 w-6 text-center text-[var(--text-subtle)]`}></i>
    <span>{label}</span>
    {!isWarning && <i className="ri-arrow-right-s-line ri-lg ml-auto text-[var(--text-subtle)]"></i>}
  </Link>
);

const SettingsClientPage = () => {
  return (
    <>
      <SettingsNavigationBar />
      <main className="pt-14">
        {/* 계정 섹션 */}
        <div className="mt-2">
          <h3 className="text-xs font-semibold text-[var(--text-subtle)] px-4 py-2">계정</h3>
          <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)]">
            <SettingsListItem href="/settings/profile" icon="ri-user-line" label="프로필 편집" />
            {/* TODO: 비밀번호 변경 페이지 추가 필요 */}
            <SettingsListItem href="#" icon="ri-lock-password-line" label="비밀번호 변경" />
          </div>
        </div>

        {/* 알림 및 개인정보 보호 섹션 */}
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-[var(--text-subtle)] px-4 py-2">알림 및 개인정보 보호</h3>
          <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)]">
            <SettingsListItem href="/settings/notifications" icon="ri-notification-4-line" label="푸시 알림 설정" />
            <SettingsListItem href="/settings/blocked-users" icon="ri-shield-user-line" label="차단된 사용자 관리" />
          </div>
        </div>

        {/* 앱 정보 섹션 */}
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-[var(--text-subtle)] px-4 py-2">앱 정보</h3>
          <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)]">
            <SettingsListItem href="/legal/terms" icon="ri-file-text-line" label="이용약관" />
            <SettingsListItem href="/legal/privacy" icon="ri-file-text-line" label="개인정보 처리방침" />
          </div>
        </div>

        {/* 기타 액션 */}
        <div className="mt-4">
          <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)]">
            <button className="w-full text-left flex items-center p-4 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--color-subtle-bg)] transition-colors">
              <i className="ri-logout-box-r-line ri-lg mr-3 w-6 text-center text-[var(--text-subtle)]"></i>
              <span>로그아웃</span>
            </button>
            <SettingsListItem href="#" icon="ri-user-unfollow-line" label="계정 탈퇴" isWarning={true} />
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingsClientPage;