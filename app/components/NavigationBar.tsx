// components/NavigationBar.tsx
// ✨ 이 파일의 새 경로는 project-root/app/components/NavigationBar.tsx 입니다. ✨
"use client";

import React from 'react';

interface NavigationBarProps {
  activeFilter: string;
  onFilterChange: (filterName: string) => void;
  userProfileImage: string;
  // Add other props for search, write, notification clicks if needed
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeFilter,
  onFilterChange,
  userProfileImage,
}) => {
  const filters = ["전체", "친구", "아지트", "탐색"];

  return (
    <nav className="fixed top-0 w-full bg-[#FFFAF0] border-b border-[#E0E0E0] shadow-sm z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="font-pacifico text-xl text-[var(--color-primary)] cursor-pointer">logo</div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer relative">
            <i className="ri-notification-3-line ri-lg"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-xs">3</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
            <img
              src={userProfileImage}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/*<div className="filter-tabs-container flex justify-between px-4 py-2 bg-[var(--color-secondary)]">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 font-medium transition-colors duration-150 ${
              activeFilter === filter
                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-[#757575] hover:text-[var(--color-primary)]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>*/}
    </nav>
  );
};

export default NavigationBar;
