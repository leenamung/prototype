// app/(main)/@modal/(.)diary/[id]/loading.tsx

import React from 'react';

// DiaryDetailClient와 유사한 구조의 스켈레톤 UI
const DiaryDetailLoadingSkeleton = () => {
  return (
    <>
      {/* 1. 로딩 중 배경 (감정색을 모르므로 기본 배경색 사용) */}
      <div className="fixed inset-0 z-30 bg-[var(--color-background)]">
        <div className="noise-background" style={{ zIndex: 31 }} />
      </div>

      {/* 뒤로가기 버튼 스켈레톤 */}
      <div className="fixed top-5 left-4 z-50 w-10 h-10 rounded-full bg-gray-300/50 animate-pulse"></div>
      
      {/* 2. 콘텐츠 카드 스켈레톤 */}
      <div className="relative z-40 flex justify-center items-start min-h-screen p-4 pt-20 pb-28 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden animate-pulse">
            {/* 이미지 영역 스켈레톤 */}
            <div className="w-full aspect-video bg-gray-300/70"></div>
            
            <div className="p-6 sm:p-8">
              {/* 제목 스켈레톤 */}
              <div className="h-8 w-3/4 bg-gray-400/70 rounded-md mb-4"></div>
              {/* 날짜/날씨 스켈레톤 */}
              <div className="h-4 w-1/4 bg-gray-300/70 rounded-md mb-6"></div>

              {/* 본문 스켈레톤 */}
              <div className="space-y-3">
                <div className="h-5 bg-gray-300/70 rounded"></div>
                <div className="h-5 bg-gray-300/70 rounded"></div>
                <div className="h-5 w-5/6 bg-gray-300/70 rounded"></div>
                <div className="h-5 w-2/4 bg-gray-300/70 rounded"></div>
              </div>

              {/* 작성자 정보 스켈레톤 */}
              <div className="border-t border-gray-200/50 mt-8 pt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300/70 mr-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-400/70 rounded-md"></div>
                    <div className="h-3 w-16 bg-gray-300/70 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* 3. '감정의 문' (하단 바) 스켈레톤 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-20 flex justify-center">
        <div className="h-14 w-40 my-auto flex items-center justify-center bg-white/50 backdrop-blur-lg rounded-full shadow-lg animate-pulse">
            <div className="h-6 w-24 bg-gray-200/70 rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default DiaryDetailLoadingSkeleton;