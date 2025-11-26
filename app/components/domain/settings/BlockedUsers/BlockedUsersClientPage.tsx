"use client";
import React from 'react';
import Image from 'next/image';
import { sampleBlockedUsers } from '@/app/data/sampleSettingsData';
import type { BlockedUser } from '@/app/data/sampleSettingsData';

const BlockedUserItem = ({ user }: { user: BlockedUser }) => (
    <div className="flex items-center p-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--color-border)] flex-shrink-0 mr-3">
            <Image src={user.profileImage} alt={`${user.name} 프로필`} width={48} height={48} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="font-gowun-batang font-bold text-sm text-[var(--text-main)] truncate">{user.name}</p>
        </div>
        <button className="px-4 py-1.5 bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] text-xs font-medium rounded-[var(--rounded-button)] hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] transition-colors">
            차단 해제
        </button>
    </div>
);

const BlockedUsersClientPage = () => {
    const blockedUsers = sampleBlockedUsers;

    return (
        // ✅ NavigationBar 및 pt-14 제거
        <div>
            <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)] divide-y divide-[var(--color-border)] mt-4">
                {blockedUsers.length > 0 ? (
                    blockedUsers.map(user => <BlockedUserItem key={user.id} user={user} />)
                ) : (
                    <p className="text-center text-sm text-[var(--text-subtle)] py-16">차단된 사용자가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default BlockedUsersClientPage;