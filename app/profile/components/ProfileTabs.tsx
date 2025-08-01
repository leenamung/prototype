// app/profile/components/ProfileTabs.tsx
"use client";

import React from 'react';

// ⬇️ 'friends' 타입을 추가합니다.
export type ProfileTabKey = 'diaries' | 'friends' | 'agits';

interface ProfileTabsProps {
  activeTab: ProfileTabKey;
  onTabChange: (tabKey: ProfileTabKey) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  // ⬇️ tabs 배열에 '친구' 탭 객체를 추가합니다.
  const tabs: { key: ProfileTabKey; label: string }[] = [
    { key: 'diaries', label: '작성한 일기' },
    { key: 'friends', label: '친구' },
    { key: 'agits', label: '소속 아지트' },
  ];

  return (
    <div className="bg-white sticky top-14 z-10 border-b border-[var(--color-sub-light-gray)] shadow-sm">
      <div className="flex px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`py-3 px-2 mr-6 text-sm font-medium transition-colors duration-150
                        ${activeTab === tab.key 
                            ? 'text-[var(--text-main)] border-b-2 border-[var(--color-primary)]'
                            : 'text-[var(--text-subtle)] border-b-2 border-transparent hover:text-[var(--text-main)] hover:border-[var(--color-sub-light-gray)]'
                        }`}
            aria-current={activeTab === tab.key ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;