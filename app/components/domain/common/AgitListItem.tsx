"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserAgitSummary } from '@/app/data/profileSampleData';

interface ProfileAgitListItemProps {
  agit?: UserAgitSummary; 
  isEmpty?: boolean;      
  onAccept?: () => void;  
  onDecline?: () => void; 
}

const ProfileAgitListItem: React.FC<ProfileAgitListItemProps> = ({ agit, isEmpty, onAccept, onDecline }) => {
  
  // 1. [Create Mode] 빈 카드
  if (isEmpty || !agit) {
    return (
      <div className="relative mb-4 px-1">
        <Link href="/agit/create" className="block group">
          <div className="
            relative h-[100px] rounded-lg border-2 border-dashed border-[var(--color-border)] 
            bg-[var(--color-subtle-bg)]/50 flex items-center justify-center
            text-[var(--text-subtle)] hover:bg-[var(--color-subtle-bg)] hover:border-[var(--color-primary)]/50
            transition-all duration-200 active:scale-[0.98]
          ">
            <div className="flex flex-col items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center">
                 <i className="ri-add-line text-xl"></i>
              </div>
              <span className="text-sm font-gowun-dodum font-bold">새로운 기록 시작하기</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // 2. [Render Mode]
  const isDiary = agit.type === 'diary';
  const isGhost = agit.isGhost;

  return (
    <div className={`relative mb-4 px-1 group ${isGhost ? 'z-20' : 'z-10'}`}>
       
       <Link href={isGhost ? '#' : `/agit/${agit.id}`} className={`block ${isGhost ? 'cursor-default' : ''}`} onClick={(e) => isGhost && e.preventDefault()}>
        
        {/* [Layer 1] 카드 최상위 컨테이너 (모양 & 배경) 
            ⛔️ 주의: 여기에 grayscale을 주면 안됨! (자식인 버튼까지 회색이 됨)
        */}
        <div 
            className={`
                relative overflow-hidden transition-all duration-200 
                bg-white border border-[var(--color-border)]
                ${isDiary 
                    // 책등 디자인 (Ghost여도 색상 유지됨)
                    ? 'rounded-r-xl rounded-l-md border-l-[8px] border-l-[var(--agit-diary-spine)] border-solid' 
                    : 'rounded-lg'}
                ${!isGhost ? 'active:scale-[0.98] shadow-sm' : 'border-dashed'} 
            `}
        >
            {/* [Layer 2] 디자인 장식 요소 (Ghost여도 색상 유지) */}
            
            {/* 🎫 모임: 절취선 & 홈 */}
            {!isDiary && (
                <>
                    <div className="absolute left-[18px] top-2 bottom-2 w-0 border-l-[2px] border-dashed border-[var(--agit-club-border)]/50 z-20"></div>
                    <div className="absolute left-[13px] top-[-6px] w-3 h-3 rounded-full bg-[var(--color-background)] border-b border-[var(--color-border)] z-30"></div>
                    <div className="absolute left-[13px] bottom-[-6px] w-3 h-3 rounded-full bg-[var(--color-background)] border-t border-[var(--color-border)] z-30"></div>
                </>
            )}

            {/* 📔 교환일기: 책갈피 포인트 */}
            {isDiary && (
                 <div className="absolute left-0 top-3 w-3 h-8 bg-[var(--agit-diary-spine)]/20 rounded-r-sm z-20"></div>
            )}


            {/* [Layer 3] 내부 컨텐츠 (여기에만 회색 필터 적용!) 
                썸네일, 텍스트 등 실제 내용은 흐리게 처리
            */}
            <div className={`
                relative w-full h-full flex items-center py-4 min-h-[90px]
                ${isDiary ? 'pl-5 pr-4' : 'pl-8 pr-4'} 
                ${isGhost ? 'opacity-50 grayscale' : ''} 
            `}>
                {/* 1. 썸네일 */}
                <div className={`
                    relative w-14 h-14 overflow-hidden border border-[var(--color-border)] flex-shrink-0 bg-[var(--color-subtle-bg)] mr-4 z-10
                    ${isDiary ? 'rounded-md shadow-sm rotate-[-1deg]' : 'rounded-full shadow-sm'}
                `}>
                    <Image
                        src={agit.coverImage}
                        alt={`${agit.name} 이미지`}
                        className="w-full h-full object-cover"
                        width={56}
                        height={56}
                    />
                </div>

                {/* 2. 텍스트 정보 */}
                <div className="flex-1 min-w-0 pr-1 z-10">
                    <div className="flex items-center mb-1 space-x-2 truncate">
                        <span className={`
                            text-[10px] font-bold px-1.5 py-[2px] rounded-sm tracking-tight flex-shrink-0
                            ${isDiary 
                                ? 'bg-[var(--agit-diary-tag-bg)] text-[var(--agit-diary-tag-text)]' 
                                : 'bg-[var(--agit-club-tag-bg)] text-[var(--agit-club-tag-text)]'}
                        `}>
                            {isDiary ? '교환일기' : '모임'}
                        </span>
                        {agit.statusMessage && (
                            <span className={`text-[11px] truncate leading-tight ${agit.isUrgent || isGhost ? 'text-[var(--color-warning)] font-bold' : 'text-[var(--text-subtle)] opacity-70'}`}>
                                {agit.statusMessage}
                            </span>
                        )}
                    </div>

                    <h3 className="font-gowun-dodum font-bold text-[16px] text-[var(--text-main)] truncate leading-snug">
                        {agit.name}
                    </h3>
                    
                    <p className="font-maru-buri text-xs text-[var(--text-subtle)] mt-0.5 opacity-60 truncate">
                         {isGhost 
                            ? (isDiary ? '초대장이 도착했습니다.' : '가입 초대를 받았습니다.') 
                            : (isDiary ? '우리만의 비밀 이야기' : `멤버 ${agit.memberCount}명 참여 중`)
                        }
                    </p>
                </div>

                {/* 3. 우측 아이콘 */}
                {!isGhost && (
                    <div className="z-10 text-[var(--color-border-dark)] flex-shrink-0 pl-1">
                        {isDiary ? <i className="ri-lock-2-line text-lg opacity-30"></i> : <i className="ri-arrow-right-s-line text-xl opacity-30"></i>}
                    </div>
                )}

                {/* [배경 질감] */}
                {isDiary && (
                    <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                )}
            </div>


            {/* [Layer 4] 유령 오버레이 & 버튼 (필터 영향 없음!) 
                컨텐츠와 형제 레벨이므로 색상이 선명하게 유지됨
            */}
            {isGhost && (
                <div className="absolute inset-0 z-30 flex items-center justify-end px-4 bg-white/40 backdrop-blur-[0.5px]">
                     <div className="flex items-center gap-2">
                        <button 
                            onClick={(e) => { e.preventDefault(); onDecline?.(); }} 
                            className="h-8 px-3 rounded-full border border-[var(--color-border)] bg-white text-xs font-bold text-[var(--text-subtle)] shadow-sm active:scale-95 transition-transform"
                        >
                            거절
                        </button>
                        <button 
                            onClick={(e) => { e.preventDefault(); onAccept?.(); }} 
                            className="h-8 px-3 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold shadow-md active:scale-95 flex items-center gap-1 transition-transform"
                        >
                            <i className="ri-check-line"></i>
                            수락
                        </button>
                     </div>
                </div>
            )}
        </div>
      </Link>
    </div>
  );
};

export default ProfileAgitListItem;