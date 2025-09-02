"use client";
import React from 'react';

export type AgitListTabKey = 'myAgits' | 'explore';

interface AgitListTabsProps {
  activeTab: AgitListTabKey;
  onTabChange: (tabKey: AgitListTabKey) => void;
}

const AgitListTabs: React.FC<AgitListTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: AgitListTabKey; label: string }[] = [
    { key: 'myAgits', label: '소속 아지트' },
    { key: 'explore', label: '탐색' },
  ];

  return (
    <div className="bg-[var(--color-component-bg)] sticky top-14 z-10 border-b border-[var(--color-border)]">
      <div className="flex px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`py-3 px-2 mr-6 text-sm font-medium transition-colors duration-150 active:opacity-75
                        ${activeTab === tab.key 
                            ? 'text-[var(--text-main)] border-b-2 border-[var(--color-primary)]'
                            : 'text-[var(--text-subtle)] border-b-2 border-transparent hover:text-[var(--text-main)] hover:border-[var(--color-border)]'
                        }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgitListTabs;