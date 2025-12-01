"use client";
import React from 'react';

type ViewMode = 'list' | 'grid' | 'calendar';

interface DiaryViewControlsProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onFilterToggle: () => void;
  hasActiveFilters: boolean;
}

const DiaryViewControls: React.FC<DiaryViewControlsProps> = ({ currentView, onViewChange, onFilterToggle, hasActiveFilters }) => {
  const viewTabs:{label: string, view: ViewMode, icon: string}[] = [
    { label: '리스트', view: 'list', icon: 'ri-list-check-2' },
    { label: '그리드', view: 'grid', icon: 'ri-grid-line' },
    { label: '캘린더', view: 'calendar', icon: 'ri-calendar-line' },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-component-bg)] sticky top-[45px] z-10">
      <div className="flex bg-[var(--color-subtle-bg)] rounded-full p-0.5">
        {viewTabs.map((tab) => (
          <button
            key={tab.view}
            onClick={() => onViewChange(tab.view)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150 ${
              currentView === tab.view ? 'bg-[var(--color-primary)] shadow-sm' : 'hover:bg-[var(--color-component-bg)]'
            }`}
            aria-pressed={currentView === tab.view}
            aria-label={`${tab.label} 뷰로 보기`}
          >
            <i className={`${tab.icon} ri-lg ${currentView === tab.view ? 'text-white' : 'text-[var(--text-subtle)]'}`}></i>
          </button>
        ))}
      </div>
      <button
        onClick={onFilterToggle}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-subtle-bg)] hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] relative transition-colors"
        aria-label="필터 열기"
      >
        <i className="ri-filter-3-line ri-lg text-[var(--text-subtle)]"></i>
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full border-2 border-[var(--color-component-bg)]" aria-hidden="true"></span>
        )}
      </button>
    </div>
  );
};

export default DiaryViewControls;