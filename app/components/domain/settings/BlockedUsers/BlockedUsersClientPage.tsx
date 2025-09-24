"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    const blockedUsers = sampleBlockedUsers; // 실제로는 API 호출

    return (
        <>
            <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20">
                <div className="flex items-center px-4 py-3 h-14">
                    <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"><i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i></button>
                    <h1 className="text-lg font-semibold text-[var(--text-main)] absolute left-1/2 -translate-x-1/2">차단된 사용자 관리</h1>
                </div>
            </nav>
            <main className="pt-14">
                <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                    {blockedUsers.length > 0 ? (
                        blockedUsers.map(user => <BlockedUserItem key={user.id} user={user} />)
                    ) : (
                        <p className="text-center text-sm text-[var(--text-subtle)] py-16">차단된 사용자가 없습니다.</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default BlockedUsersClientPage;