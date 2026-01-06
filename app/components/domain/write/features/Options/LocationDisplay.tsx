"use client";
import React from 'react';

interface LocationDisplayProps {
  currentLocation: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ currentLocation }) => {
  return (
    <div className="w-full">
      {/* 폴라로이드 프레임 스타일 */}
      <div className="bg-white p-2 rounded-[16px] border border-[var(--color-border)] shadow-sm">
        
        {/* 1. 지도 시각화 영역 (Map Placeholder) */}
        {/* Hover 효과 제거됨 */}
        <div className="relative w-full h-32 rounded-[12px] overflow-hidden bg-[#F2F4F6] border border-[var(--color-border)]/50">
            
            {/* 배경: 지도 느낌의 격자 패턴 */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />
            
            {/* 데코레이션: 강/길 느낌의 곡선 (SVG) */}
            <svg className="absolute inset-0 w-full h-full text-[var(--color-primary)]/10" xmlns="http://www.w3.org/2000/svg">
                <path d="M-10,50 Q40,20 100,50 T220,40" fill="none" stroke="currentColor" strokeWidth="8" />
                <path d="M-10,80 Q60,60 150,90 T320,70" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6" />
            </svg>

            {/* 중앙 핀 아이콘 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="relative">
                    <i className="ri-map-pin-fill text-3xl text-[var(--color-primary)] drop-shadow-md z-10 relative"></i>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-[100%] blur-[2px]" />
                 </div>
            </div>
        </div>

        {/* 2. 주소 텍스트 영역 */}
        <div className="mt-3 px-1 pb-1 flex items-start gap-2">
            <i className="ri-map-pin-2-line text-[var(--color-primary)] mt-0.5"></i>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--text-main)] leading-tight font-pretendard">
                    {currentLocation || "위치 정보를 불러올 수 없어요"}
                </span>
                <span className="text-[11px] text-[var(--text-subtle)] font-gowun-dodum mt-0.5">
                    오늘, 이곳에서의 기록
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;