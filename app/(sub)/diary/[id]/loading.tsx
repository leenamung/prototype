// app/(sub)/diary/[id]/loading.tsx

import React from 'react';

// 간단한 스켈레톤 UI. 실제로는 더 정교하게 만들 수 있습니다.
export default function Loading() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen animate-pulse">
      <header className="fixed top-0 w-full bg-[var(--color-component-bg)]/80 backdrop-blur-sm z-20 border-b border-[var(--color-border)] h-14 flex items-center justify-between px-4"></header>
      <main className="pt-20 px-5 pb-24">
        {/* 작성자 정보 스켈레톤 */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
          </div>
        </div>
        {/* 감정 태그 스켈레톤 */}
        <div className="flex space-x-2 mb-6">
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
        </div>
        {/* 이미지 스켈레톤 */}
        <div className="w-full aspect-square bg-gray-200 rounded-lg mb-6"></div>
        {/* 본문 스켈레톤 */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        </div>
      </main>
    </div>
  );
}