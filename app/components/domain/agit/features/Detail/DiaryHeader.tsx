"use client";
import React from 'react';
import Image from 'next/image';

const MOCK_DATA = {
    coverImage: "https://picsum.photos/id/1011/400/300",
    iconImage: "https://picsum.photos/id/1025/200",
    members: [
      { id: 1, image: 'https://i.pravatar.cc/150?u=1' },
      { id: 2, image: 'https://i.pravatar.cc/150?u=2' },
      { id: 3, image: 'https://i.pravatar.cc/150?u=3' },
    ]
};

export default function DiaryHeader() {
  return (
    <div className="relative pt-8 pb-10 px-6 bg-[var(--agit-diary-bg)] text-center overflow-hidden">
      
      {/* 1. 커버 이미지 (Tape Photo Style) */}
      <div className="relative w-full max-w-[200px] aspect-[4/3] mx-auto mb-6 rotate-[-2deg] shadow-md border-4 border-white bg-white">
          <Image src={MOCK_DATA.coverImage} alt="Cover" fill className="object-cover" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#E8DCC6]/80 rotate-90 shadow-sm backdrop-blur-[1px]"></div>
          
          {/* 아이콘 이미지 (Stamp) */}
          <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden z-10">
             <Image src={MOCK_DATA.iconImage} alt="Icon" fill className="object-cover" />
          </div>
      </div>

      {/* 2. 타이틀 & 정보 */}
      <div className="mb-6 relative z-10">
        <h2 className="font-maru-buri font-bold text-2xl text-[var(--text-main)] leading-relaxed mb-1">
          우리의 비밀 일기장
        </h2>
        <p className="font-maru-buri text-xs text-[var(--agit-diary-tag-text)] opacity-80">
          Since 2025.12.01 • 함께한 지 34일째
        </p>
      </div>

      {/* 3. 턴 인디케이터 (재촉하기 포함) */}
      <div className="relative inline-block mb-8">
        <div className="flex items-center gap-3 px-4 py-2.5 border border-[#E8DCC6] bg-white/60 rounded-full shadow-sm backdrop-blur-[1px]">
          
          {/* 작성자 아바타 */}
          <div className="relative w-8 h-8 rounded-full border border-white overflow-hidden shadow-sm flex-shrink-0">
             <Image src="https://i.pravatar.cc/150?u=2" alt="writer" fill className="object-cover" />
          </div>
          
          {/* 텍스트 */}
          <div className="text-left mr-2">
              <p className="text-[10px] text-[var(--text-subtle)] font-pretendard leading-none mb-0.5">Current Turn</p>
              <p className="text-sm font-maru-buri text-[var(--text-main)] leading-none">
                 <span className="font-bold text-[var(--agit-diary-tag-text)]">지민</span>님이 쓰는 중
              </p>
          </div>

          {/* 구분선 */}
          <div className="w-px h-6 bg-[var(--text-subtle)]/20"></div>

          {/* 🔔 콕 찌르기 (재촉하기) 버튼 */}
          <button 
            className="flex flex-col items-center justify-center text-[var(--agit-diary-tag-text)] active:scale-90 transition-transform group"
            title="재촉하기 알림 보내기"
          >
             <i className="ri-notification-3-line text-lg group-hover:animate-swing origin-top"></i>
          </button>
        </div>
      </div>

      {/* 4. 멤버 리스트 (Facepile) - 초대 버튼(+) 제거됨 */}
      <div className="flex justify-center items-center gap-3">
         <div className="flex -space-x-2">
            {MOCK_DATA.members.map((member) => (
              <div key={member.id} className="relative w-8 h-8 rounded-full border-2 border-[var(--agit-diary-bg)] overflow-hidden shadow-sm">
                <Image src={member.image} alt="member" fill className="object-cover" />
              </div>
            ))}
         </div>
      </div>

      {/* 배경 질감 */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
    </div>
  );
}