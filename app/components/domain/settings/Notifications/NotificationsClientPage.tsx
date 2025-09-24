"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToggleSwitch from '@/app/components/domain/write/ToggleSwitch'; // 기존 컴포넌트 재사용

const NotificationSettingItem = ({ icon, label }: { icon: string; label: string }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center text-sm font-medium text-[var(--text-main)]">
                <i className={`${icon} ri-lg mr-3 w-6 text-center text-[var(--text-subtle)]`}></i>
                <span>{label}</span>
            </div>
            <ToggleSwitch id={`toggle-${label}`} checked={isEnabled} onChange={setIsEnabled} />
        </div>
    )
}

const NotificationsClientPage = () => {
  const router = useRouter();
  
  return (
    <>
      <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20">
        <div className="flex items-center px-4 py-3 h-14">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"><i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i></button>
          <h1 className="text-lg font-semibold text-[var(--text-main)] absolute left-1/2 -translate-x-1/2">푸시 알림 설정</h1>
        </div>
      </nav>
      <main className="pt-16">
        <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)] divide-y divide-[var(--color-border)]">
            <NotificationSettingItem icon="ri-heart-3-line" label="좋아요" />
            <NotificationSettingItem icon="ri-chat-3-line" label="댓글" />
            <NotificationSettingItem icon="ri-user-add-line" label="새로운 친구" />
            <NotificationSettingItem icon="ri-group-line" label="아지트 초대" />
            <NotificationSettingItem icon="ri-discuss-line" label="메시지" />
        </div>
      </main>
    </>
  )
}

export default NotificationsClientPage;