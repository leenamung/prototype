"use client";

import React from 'react';

interface SettingsSectionProps {
  iconClass: string;
  title: string;
  children: React.ReactNode; // For controls like dropdowns, toggles
  className?: string;
  contentClassName?: string; // To style the children container if needed
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ iconClass, title, children, className, contentClassName }) => {
  return (
    // 카드 배경색 변경 (예: bg-white 또는 bg-[var(--color-sub-beige)])
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className || ''}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* 아이콘 색상 변경 */}
          <i className={`${iconClass} ri-lg mr-2.5 text-[var(--text-subtle)] w-6 h-6 flex items-center justify-center`}></i>
          {/* 제목 텍스트 색상 변경 */}
          <span className="text-[var(--text-main)] text-sm font-medium">{title}</span>
        </div>
        {/* Children will be the control element (e.g., button, toggle) */}
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
};

export default SettingsSection;
