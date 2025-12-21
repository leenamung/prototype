import React from 'react';

const SkeletonDiaryDetail = () => {
  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[var(--color-background)] animate-pulse">
      {/* 1. 네비게이션 바 스켈레톤 */}
      <div className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-4 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
         <div className="w-8 h-8 rounded-full bg-gray-200/80" />
         <div className="h-4 w-32 bg-gray-200/80 rounded-full" />
         <div className="w-8 h-8 rounded-full bg-gray-200/80" />
      </div>

      {/* 2. Media Layer Placeholder (Parallax 영역) */}
      <div className="fixed top-14 left-0 right-0 h-[55vh] z-0 px-6 py-4">
        <div className="w-full h-full rounded-lg bg-gray-200/60" />
      </div>

      {/* 3. Content Layer (스크롤 영역 시뮬레이션) */}
      <div className="relative z-10 w-full h-full mt-[calc(55vh+70px)] px-3 pb-32">
        <div className="relative shadow-sm rounded-hand-drawn p-[2px] bg-gray-200">
            <div className="w-full h-full bg-[#FFFAF0] rounded-hand-drawn min-h-[60vh] p-5">
                
                {/* 드래그 핸들 */}
                <div className="w-full flex justify-center mb-6">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                </div>

                {/* 헤더 (날짜/제목) */}
                <div className="flex justify-between items-center mb-6">
                    <div className="h-3 w-24 bg-gray-200 rounded-full" />
                    <div className="w-5 h-5 bg-gray-200 rounded-full" />
                </div>
                <div className="h-8 w-3/4 bg-gray-300 rounded-md mb-6" />

                {/* 태그 */}
                <div className="flex gap-2 mb-8">
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    <div className="h-6 w-12 bg-gray-200 rounded-full" />
                </div>

                {/* 본문 줄글 */}
                <div className="space-y-4 mb-12">
                    <div className="h-4 w-full bg-gray-200 rounded-full" />
                    <div className="h-4 w-full bg-gray-200 rounded-full" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded-full" />
                    <div className="h-4 w-full bg-gray-200 rounded-full" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded-full" />
                </div>

                {/* 작성자 서명 */}
                <div className="border-t border-gray-100 pt-6 flex justify-end items-center gap-3">
                    <div className="text-right space-y-2">
                        <div className="h-3 w-20 bg-gray-200 rounded-full ml-auto" />
                        <div className="h-2 w-24 bg-gray-100 rounded-full" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                </div>
            </div>
        </div>
      </div>

      {/* 4. 하단 인터랙션 바 */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
        <div className="h-12 w-48 bg-white/80 rounded-full shadow-sm flex items-center justify-center gap-6 px-6">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <div className="w-px h-4 bg-gray-200" />
            <div className="w-6 h-6 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDiaryDetail;