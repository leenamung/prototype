"use client";

import React from 'react';

type ViewMode = 'list' | 'grid' | 'calendar';

interface MySpaceNavigationBarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onFilterToggle: () => void;
  hasActiveFilters: boolean;
  onNewDiaryClick: () => void;
}

const MySpaceNavigationBar: React.FC<MySpaceNavigationBarProps> = ({
  currentView,
  onViewChange,
  onFilterToggle,
  hasActiveFilters,
  onNewDiaryClick
}) => {
  const viewTabs: { label: string; view: ViewMode; icon: string }[] = [
    { label: '리스트', view: 'list', icon: 'ri-list-check-2' },
    { label: '그리드', view: 'grid', icon: 'ri-grid-line' },
    { label: '캘린더', view: 'calendar', icon: 'ri-calendar-line' },
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-20">
      <div className="flex items-center justify-between px-4 py-3 h-12">
        {/* ✨ 수정: text-[var(--text-main)] 적용 */}
        <h1 className="text-lg font-semibold text-[var(--text-main)]">내 모든 일기</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={onFilterToggle}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 relative transition-colors duration-150"
            aria-label="필터 열기"
          >
            {/* ✨ 아이콘 색상 text-[var(--text-subtle)] 적용 */}
            <i className="ri-filter-3-line ri-lg text-[var(--text-subtle)]"></i>
            {hasActiveFilters && (
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full border-2 border-white"
                aria-hidden="true"
              ></span>
            )}
          </button>
          <button
            onClick={onNewDiaryClick}
            className="bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-[var(--rounded-button)] flex items-center hover:opacity-80 transition-opacity duration-150 text-sm"
          >
            <i className="ri-quill-pen-line ri-md mr-1"></i>
            <span>새 일기</span>
          </button>
        </div>
      </div>
      <div className="flex border-b border-gray-200 h-11">
        {viewTabs.map((tab) => (
          <button
            key={tab.view}
            onClick={() => onViewChange(tab.view)}
            className={`flex-1 py-2 text-center text-xs font-medium border-b-2 hover:bg-gray-50 transition-colors duration-150 flex flex-col items-center justify-center ${ 
              currentView === tab.view
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                // ✨ 수정: 비활성 탭 텍스트 색상 text-[var(--text-subtle)] 적용
                : 'border-transparent text-[var(--text-subtle)] hover:text-[var(--text-main)]'
            }`}
          >
            <i className={`${tab.icon} ri-lg mb-0.5`}></i>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MySpaceNavigationBar;
