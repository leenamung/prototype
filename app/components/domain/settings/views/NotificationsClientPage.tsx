"use client";
import React, { useState } from 'react';
import ToggleSwitch from '@/app/components/domain/common/ToggleSwitch';

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
  return (
    // ✅ NavigationBar 제거, pt-16 -> div wrapper (부모 Page에서 처리)
    <div>
      <div className="bg-[var(--color-component-bg)] border-y border-[var(--color-border)] divide-y divide-[var(--color-border)] mt-4">
          <NotificationSettingItem icon="ri-heart-3-line" label="좋아요" />
          <NotificationSettingItem icon="ri-chat-3-line" label="댓글" />
          <NotificationSettingItem icon="ri-user-add-line" label="새로운 친구" />
          <NotificationSettingItem icon="ri-group-line" label="아지트 초대" />
          <NotificationSettingItem icon="ri-discuss-line" label="메시지" />
      </div>
    </div>
  )
}

export default NotificationsClientPage;