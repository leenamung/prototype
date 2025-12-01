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
    <div className="sticky top-0 bg-[var(--color-component-bg)] z-30 border-b border-[var(--color-border)] shadow-sm">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-3 text-center text-sm font-medium cursor-pointer transition-colors duration-150 active:opacity-75
                        ${activeTab === tab.key 
                            ? 'text-[var(--color-primary-dark)] border-b-2 border-[var(--color-primary)]' 
                            : 'text-[var(--text-subtle)] border-b-2 border-transparent hover:text-[var(--text-main)] hover:bg-[var(--color-subtle-bg)]'
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