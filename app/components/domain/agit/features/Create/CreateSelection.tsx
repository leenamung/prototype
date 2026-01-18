"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CreateSelectionProps {
  onSelect: (type: 'diary' | 'club') => void;
}

export default function CreateSelection({ onSelect }: CreateSelectionProps) {
  return (
    <motion.div
      key="selection"
      // [수정] 아래에서 위로 올라오는 y축 애니메이션 제거
      // [수정] 오직 투명도(opacity)만 조절하여 안정감 확보
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3, ease: "easeInOut" }} // 부드러운 전환
      className="px-5 pt-8 pb-10 flex flex-col h-full overflow-y-auto"
    >
      {/* 헤더 메시지 */}
      <section className="mb-8 text-center">
        <h2 className="font-gowun-dodum font-bold text-2xl text-[var(--text-main)] mb-3 leading-tight">
          당신을 담을<br/>아늑한 공간
        </h2>
        <p className="font-maru-buri text-[var(--text-subtle)] text-sm opacity-80 whitespace-pre-line leading-relaxed">
          소중한 이들과의 속삭임도, 새로운 취향의 발견도{'\n'}
          여기서 시작해볼까요?
        </p>
      </section>

      <div className="flex flex-col gap-5 justify-center">
        {/* 📔 교환일기 버튼 */}
        <button 
          onClick={() => onSelect('diary')}
          className="group relative w-full text-left bg-white rounded-r-2xl rounded-l-lg border border-[var(--color-border)] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 overflow-hidden"
          style={{ borderLeftWidth: '12px', borderLeftColor: 'var(--agit-diary-spine)' }}
        >
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
          <div className="absolute left-0 top-4 w-3 h-8 bg-[var(--agit-diary-spine)]/20 rounded-r-sm z-20"></div>

          <div className="relative z-10 flex items-start justify-between p-6 pl-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[var(--agit-diary-tag-bg)] text-[var(--agit-diary-tag-text)] px-2 py-0.5 rounded text-[11px] font-bold">
                  친구와 함께
                </span>
              </div>
              <h3 className="font-gowun-dodum font-bold text-xl text-[var(--text-main)] mb-2">
                교환일기 쓰기
              </h3>
              <p className="font-maru-buri text-sm text-[var(--text-subtle)] leading-relaxed opacity-80">
                말하지 못한 진심과 사소한 일상들을<br/>
                가장 편안한 우리만의 속도로 나눠요.
              </p>
            </div>
            <div className="w-14 h-14 rounded-md bg-white border border-[var(--color-border)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm rotate-[-2deg]">
              <i className="ri-book-3-line text-2xl text-[var(--agit-diary-spine)]"></i>
            </div>
          </div>
        </button>

        {/* 🎫 모임 모집 버튼 */}
        <button 
          onClick={() => onSelect('club')}
          className="group relative w-full text-left bg-white rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 overflow-hidden"
        >
          <div className="absolute left-[20px] top-[-8px] bottom-[-8px] w-0 border-l-[2px] border-dashed border-[var(--agit-club-border)]/50 z-20"></div>
          <div className="absolute left-[14px] top-[-6px] w-3 h-3 rounded-full bg-[var(--color-background)] border-b border-[var(--color-border)] z-30"></div>
          <div className="absolute left-[14px] bottom-[-6px] w-3 h-3 rounded-full bg-[var(--color-background)] border-t border-[var(--color-border)] z-30"></div>

          <div className="relative z-10 flex items-start justify-between p-6 pl-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[var(--agit-club-tag-bg)] text-[var(--agit-club-tag-text)] px-2 py-0.5 rounded text-[11px] font-bold">
                  새로운 사람들과
                </span>
              </div>
              <h3 className="font-gowun-dodum font-bold text-xl text-[var(--text-main)] mb-2">
                새로운 모임 모집
              </h3>
              <p className="font-maru-buri text-sm text-[var(--text-subtle)] leading-relaxed opacity-80">
                나와 닮은 온도의 사람들을 만나<br/>
                즐거운 취향의 대화를 꽃피워보세요.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <i className="ri-group-line text-2xl text-[var(--agit-club-tag-text)]"></i>
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}