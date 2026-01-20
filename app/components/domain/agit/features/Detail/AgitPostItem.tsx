"use client";
import React from 'react';
import Image from 'next/image';

interface AgitPostItemProps {
  type: 'diary' | 'club';
  date: string;
}

export default function AgitPostItem({ type, date }: AgitPostItemProps) {
  
  // [Real Feed Design]
  // 로미솜의 핵심 아이덴티티: "3가지 감정 색상이 섞인 파스텔톤 그라데이션"
  // 실제 데이터에서는 post.emotions 배열의 색상값을 가져와서 style로 넣어야 합니다.
  const gradientStyle = {
    background: 'linear-gradient(135deg, #FFD1FF 0%, #FAD0C4 50%, #FFD1FF 100%)', // 예시: 로맨틱/따뜻함
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-sm mb-6 transition-transform active:scale-[0.99]">
      
      {/* 1. 감정 그라데이션 배경 (3 Colors) */}
      <div className="absolute inset-0 z-0" style={gradientStyle}></div>
      
      {/* 2. 노이즈/질감 효과 (선택사항 - 피드와 통일성 위해 추가) */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

      {/* 3. 컨텐츠 컨테이너 */}
      <div className="relative z-10 p-5">
        
        {/* [Header] 작성자 정보 & 감정 태그 */}
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 rounded-full bg-white/50 border border-white/60 overflow-hidden shadow-sm">
                    <Image src="https://i.pravatar.cc/150?u=8" alt="User" fill className="object-cover" />
                </div>
                <div>
                    <p className="text-sm font-bold text-[var(--text-main)] leading-none mb-1">지민</p>
                    <p className="text-[10px] text-[var(--text-subtle)] font-medium opacity-70">{date}</p>
                </div>
            </div>

            {/* 감정 태그 (유리 질감) */}
            <div className="flex gap-1">
                <span className="px-2 py-1 rounded-lg bg-white/40 backdrop-blur-md border border-white/20 text-[10px] font-bold text-[var(--text-main)] shadow-sm">
                    🥰 설렘
                </span>
                <span className="px-2 py-1 rounded-lg bg-white/40 backdrop-blur-md border border-white/20 text-[10px] font-bold text-[var(--text-main)] shadow-sm">
                    🌸 편안함
                </span>
            </div>
        </div>

        {/* [Body] 텍스트 & 미디어 */}
        <div className="mb-4">
            <p className="text-[var(--text-main)] text-[15px] leading-relaxed font-maru-buri whitespace-pre-line">
                오늘 날씨가 너무 좋아서 한강에 다녀왔어.<br/>
                바람도 시원하고 모든 게 완벽했던 하루! 
                이런 날은 시간이 멈췄으면 좋겠어.
            </p>
            
            {/* 사진 (Grid 형태) */}
            <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden">
                <div className="relative aspect-square bg-black/5">
                    <Image src="https://picsum.photos/400/400" alt="post-img-1" fill className="object-cover" />
                </div>
                <div className="relative aspect-square bg-black/5">
                    <Image src="https://picsum.photos/401/401" alt="post-img-2" fill className="object-cover" />
                </div>
            </div>
        </div>

        {/* [Footer] 리액션 (좋아요/댓글/북마크) */}
        <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
                {/* 좋아요 */}
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-colors group">
                    <i className="ri-heart-line text-lg text-[var(--text-main)] group-active:text-red-500 transition-colors"></i>
                    <span className="text-xs font-bold text-[var(--text-main)]">24</span>
                </button>
                {/* 댓글 */}
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-colors">
                    <i className="ri-chat-3-line text-lg text-[var(--text-main)]"></i>
                    <span className="text-xs font-bold text-[var(--text-main)]">5</span>
                </button>
            </div>

            {/* 북마크/공유 */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/40 transition-colors">
                <i className="ri-bookmark-line text-lg text-[var(--text-main)] opacity-70"></i>
            </button>
        </div>

      </div>
    </div>
  );
}