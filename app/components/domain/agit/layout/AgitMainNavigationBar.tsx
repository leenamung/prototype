"use client";
import React from 'react';
import Link from 'next/link';

const AgitMainNavigationBar = () => {
  return (
    <nav className="flex-none w-full bg-[var(--color-component-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)] shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        
        {/* [Left Spacer] 우측 아이콘 공간만큼 비워둬야 타이틀이 정중앙에 위치함 */}
        <div className="w-8"></div>

        {/* [Center Title] 폰트 및 정렬 수정 */}
        <h1 className="text-lg font-bold font-pretendard text-[var(--text-main)]">
          아지트
        </h1>

        {/* [Right Action] */}
        <div className="flex items-center space-x-4">
          
        </div>
      </div>
    </nav>
  );
};

export default AgitMainNavigationBar;