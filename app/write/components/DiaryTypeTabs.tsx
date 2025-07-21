"use client";

import React from 'react';

export type DiaryType = 'text' | 'photo' | 'video' | 'voice';

interface DiaryTypeTabsProps {
  activeTab: DiaryType;
  onTabChange: (tab: DiaryType) => void;
}

const DiaryTypeTabs: React.FC<DiaryTypeTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: DiaryType; label: string; icon: string }[] = [
    { id: 'text', label: '텍스트', icon: 'ri-file-text-line' },
    { id: 'photo', label: '사진', icon: 'ri-image-line' },
    { id: 'video', label: '영상', icon: 'ri-video-line' },
    { id: 'voice', label: '음성', icon: 'ri-mic-line' },
  ];

  return (
    // 탭 컨테이너 배경색 변경
    <div className="flex justify-between bg-[var(--color-sub-beige)] rounded-full p-1 mb-6 mt-4"> 
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center cursor-pointer transition-colors duration-150 ease-in-out
                      ${activeTab === tab.id 
                          ? 'bg-[var(--color-primary)] text-white shadow-sm' 
                          // 비활성 탭 텍스트 색상 및 호버 배경 변경
                          : 'text-[var(--text-subtle)] hover:bg-white/60 hover:text-[var(--text-main)]' 
                      }`}
          aria-pressed={activeTab === tab.id}
        >
          <i className={`${tab.icon} ri-md mr-1 sm:mr-1.5 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center`}></i>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default DiaryTypeTabs;
