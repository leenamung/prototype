"use client";
import React from 'react';
import Image from 'next/image';
// [NEW] 커스텀 훅 불러오기
import { useAgitScroll } from '../../context/AgitScrollContext';

const MOCK_DATA = {
    coverImage: "https://picsum.photos/800/600",
    iconImage: "https://picsum.photos/200",      
};

export default function ClubHeader() {
  // [NEW] 실시간 스크롤 위치값 가져오기
  const scrollTop = useAgitScroll();

  // [핵심 로직] 패럴랙스 오프셋 계산
  // 스크롤된 거리의 절반(0.5)만큼 이미지를 아래로 이동시킵니다.
  // 결과적으로 이미지는 스크롤 속도의 절반으로 움직이는 것처럼 보입니다.
  const parallaxOffset = scrollTop * 0.5;

  return (
    // sticky 제거, overflow-hidden 추가 (이미지가 영역 밖으로 나가는 것 방지)
    <div className="relative overflow-hidden">
      
      {/* 1. 커버 이미지 (JS Parallax 적용) */}
      {/* h-64 -> h-[300px]: 패럴랙스 효과를 위해 높이를 조금 더 여유 있게 잡음 */}
      {/* will-change-transform: 브라우저 최적화 힌트 */}
      <div 
        className="relative w-full h-[300px] -mt-14 z-0 will-change-transform origin-top"
        style={{ transform: `translateY(${parallaxOffset}px)` }} // 계산된 오프셋 적용
      >
         <Image 
            src={MOCK_DATA.coverImage} 
            alt="Club Cover" 
            fill 
            className="object-cover"
            priority // 중요한 이미지이므로 우선 로드
         />
         <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 2. 컨텐츠 영역 (Sliding Card) */}
      {/* -mt-6 -> -mt-20: 이미지 높이가 늘어난 만큼 더 많이 겹치도록 조정 */}
      <div className="relative z-10 bg-white rounded-t-3xl -mt-20 pb-6 border-b border-[var(--color-border)] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        
        <div className="px-5 relative">
            {/* 아이콘 이미지 (Profile) */}
            <div className="absolute -top-10 left-5">
                <div className="w-20 h-20 rounded-xl border-4 border-white shadow-md overflow-hidden bg-white relative">
                    <Image 
                        src={MOCK_DATA.iconImage} 
                        alt="Club Icon" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>

            {/* 모임 정보 */}
            <div className="pt-2 pl-[90px] mb-4 flex justify-between items-start">
                <div>
                    <div className="flex gap-1 mb-1 mt-1">
                        <span className="text-[10px] text-[var(--agit-club-primary)] font-bold bg-[var(--agit-club-tag-bg)] px-1.5 py-0.5 rounded-sm">
                            독서 모임
                        </span>
                    </div>
                </div>
                
                {/* 멤버 수 */}
                <button className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors active:opacity-70 mt-1">
                    <i className="ri-group-line text-sm"></i>
                    <span>멤버 14명</span>
                    <i className="ri-arrow-right-s-line text-[var(--text-subtle)]"></i>
                </button>
            </div>

            {/* 제목 및 설명 */}
            <div className="mt-4">
                <h2 className="font-gowun-dodum font-bold text-2xl text-[var(--text-main)] mb-2 leading-tight">
                    강남역 토요일<br/>독서 모임
                </h2>
                <p className="text-sm text-[var(--text-subtle)] leading-relaxed">
                    매주 한 권의 책을 읽고 서로의 생각을 나누는 따뜻한 공간입니다. 누구나 환영해요!
                </p>
            </div>
        </div>

        {/* 공지사항 */}
        <div className="px-5 mt-5">
            <div className="bg-[var(--agit-club-bg)]/50 rounded-lg p-3 flex items-start gap-3 border border-[var(--agit-club-border)]/30">
                <i className="ri-megaphone-fill text-[var(--agit-club-primary)] mt-0.5"></i>
                <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--agit-club-primary)] mb-0.5">공지사항</p>
                <p className="text-sm text-[var(--text-main)] truncate">
                    이번 주 정모 장소가 변경되었습니다. 확인해주세요!
                </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}