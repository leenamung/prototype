"use client";
import React from 'react';

export type AgitListTabKey = 'myAgits' | 'explore';

interface AgitListTabsProps {
  activeTab: AgitListTabKey;
  onTabChange: (tabKey: AgitListTabKey) => void;
}

const AgitListTabs: React.FC<AgitListTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: AgitListTabKey; label: string }[] = [
    { key: 'myAgits', label: '나의 아지트' },
    { key: 'explore', label: '아지트 탐색' },
  ];

  return (
    <div className="sticky top-0 z-30 py-3 pl-4 bg-[var(--color-background)]/95 backdrop-blur-sm">
      <div className="flex space-x-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              // [수정] hover 효과 전면 제거 (모바일 우선)
              // active:scale-95로 터치 시 눌리는 피드백만 제공
              className={`
                px-4 py-2 rounded-full text-sm font-bold font-gowun-dodum transition-all duration-200 border
                active:scale-95
                ${isActive 
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm' 
                  : 'bg-white text-[var(--text-subtle)] border-[var(--color-border)]'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AgitListTabs;