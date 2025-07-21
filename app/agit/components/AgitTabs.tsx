"use client";

import React from 'react';

export type AgitTabKey = 'feed' | 'info' | 'members';

interface AgitTabsProps {
  activeTab: AgitTabKey;
  onTabChange: (tabKey: AgitTabKey) => void;
}

const AgitTabs: React.FC<AgitTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: AgitTabKey; label: string }[] = [
    { key: 'feed', label: '피드' },
    { key: 'info', label: '정보' },
    { key: 'members', label: '멤버' },
  ];

  return (
    <div className="sticky top-14 bg-white z-10 border-b border-[var(--color-sub-light-gray)] shadow-sm"> {/* 구분선 색상 변경 */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-3 text-center text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-[var(--color-sub-beige)]/50
                        ${activeTab === tab.key 
                            ? 'text-[var(--agit-tab-active-text)] border-b-2 border-[var(--agit-tab-active-border)]' 
                            // 비활성 탭 텍스트 색상 변경
                            : 'text-[var(--text-subtle)] border-b-2 border-transparent hover:text-[var(--text-main)]'
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

export default AgitTabs;
