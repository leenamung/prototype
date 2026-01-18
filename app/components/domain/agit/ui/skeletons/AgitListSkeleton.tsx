"use client";
import React from 'react';

const AgitListSkeletonItem = () => {
  return (
    <div className="relative mb-4 px-1">
      {/* 카드 컨테이너 (실제 아이템과 동일한 보더/라운딩/높이감 적용) */}
      <div className="h-[102px] bg-white rounded-lg border border-[var(--color-border)] p-4 flex items-center shadow-sm">
        
        {/* 1. 썸네일 스켈레톤 */}
        <div className="w-14 h-14 bg-[var(--color-subtle-bg)] rounded-lg mr-4 shrink-0 animate-pulse" />
        
        {/* 2. 텍스트 정보 스켈레톤 */}
        <div className="flex-1 space-y-2 py-1">
            {/* 상단 뱃지 & 상태메시지 영역 */}
            <div className="flex items-center space-x-2">
                <div className="w-12 h-4 bg-[var(--color-subtle-bg)] rounded-sm animate-pulse" />
                <div className="w-24 h-3 bg-[var(--color-subtle-bg)]/60 rounded-sm animate-pulse" />
            </div>

            {/* 메인 타이틀 영역 */}
            <div className="w-3/4 h-5 bg-[var(--color-subtle-bg)] rounded-md animate-pulse" />

            {/* 하단 서브텍스트 영역 */}
            <div className="w-1/2 h-3 bg-[var(--color-subtle-bg)]/60 rounded-sm animate-pulse" />
        </div>

        {/* 3. 우측 아이콘 영역 */}
        <div className="w-6 h-6 bg-[var(--color-subtle-bg)]/50 rounded-full shrink-0 ml-2 animate-pulse" />
      </div>
    </div>
  );
};

export default function AgitListSkeleton() {
  // 3~4개 정도의 스켈레톤 아이템을 리스트로 보여줌
  return (
    <div className="w-full">
      {Array.from({ length: 4 }).map((_, idx) => (
        <AgitListSkeletonItem key={idx} />
      ))}
    </div>
  );
}