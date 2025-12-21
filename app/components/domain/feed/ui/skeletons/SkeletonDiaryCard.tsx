import React from 'react';

const SkeletonDiaryCard = () => {
  // 0: 텍스트만, 1: 이미지/비디오 포함
  const hasMedia = Math.random() > 0.3; 

  return (
    <div className="relative mb-10 animate-pulse">
      
      {/* 1. Back Layer (상세페이지 이동 버튼 스켈레톤) */}
      {/* 실제 카드와 동일하게 하단으로 22px 돌출시켜 버튼 영역 확보 */}
      <div className="absolute inset-x-1 bottom-[-22px] h-full rounded-hand-drawn bg-gray-200/60 transform rotate-1 z-0 border border-gray-300/50">
         {/* '온전히 느껴볼까요' 문구 및 화살표 아이콘 자리 */}
         <div className="absolute bottom-3 right-5 flex items-center space-x-2 opacity-70">
            <div className="h-3 w-24 bg-gray-300 rounded-full" />
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
         </div>
      </div>

      {/* 2. Main Card Layer */}
      <div className="relative z-10 shadow-sm rounded-hand-drawn p-[2px] bg-gray-200">
        <div className="relative w-full h-full bg-white rounded-hand-drawn overflow-hidden min-h-[200px]">
            
            {/* 상단 프로필 영역 */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-gray-200 mr-2" />
                    <div className="space-y-1.5">
                        <div className="h-3 w-16 bg-gray-200 rounded-full" />
                        <div className="h-2 w-24 bg-gray-100 rounded-full" />
                    </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-100" />
            </div>

            {/* 미디어 영역 (있을 경우) */}
            {hasMedia && (
                <div className="w-full aspect-square bg-gray-100 relative border-b border-gray-100">
                    {/* 가운데 아이콘 힌트 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200/50" />
                    </div>
                </div>
            )}

            {/* 본문 텍스트 영역 */}
            <div className="p-5 space-y-3">
                {/* 날짜/날씨 */}
                <div className="flex items-center justify-between mb-2">
                    <div className="h-3 w-20 bg-gray-100 rounded-full" />
                    <div className="w-4 h-4 rounded-full bg-gray-100" />
                </div>
                
                {/* 제목 */}
                <div className="h-5 w-2/3 bg-gray-200 rounded-md mb-4" />

                {/* 내용 줄글 */}
                <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-100 rounded-full" />
                    <div className="h-3 w-full bg-gray-100 rounded-full" />
                    <div className="h-3 w-4/5 bg-gray-100 rounded-full" />
                </div>

                {/* 구분선 */}
                <div className="border-t border-gray-100 my-4" />

                {/* 하단 인터랙션 */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200" />
                        <div className="w-8 h-3 bg-gray-100 rounded-full" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200" />
                        <div className="w-8 h-3 bg-gray-100 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDiaryCard;