"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { DiaryEntry } from '@/app/data/diaryEntries';
import { commentEntriesData } from '@/app/data/commentEntries';
import DiaryDetailNavigationBar from './Navigation/DiaryDetailNavigationBar';
import SlideFromBottomReply from '../feed/Reply/SlideFromBottomReply';

// 카드 배경을 위한 그라데이션 함수 (이제 제대로 보일 겁니다!)
const getCardBackgroundStyle = (emotions: DiaryEntry['selectedEmotions']) => {
    const colors = emotions.map(e => e.color);
    if (colors.length === 0) return { backgroundColor: 'var(--color-component-bg)' };
    if (colors.length === 1) return { backgroundColor: `${colors[0]}4D` }; // 30% opacity
    return { backgroundImage: `linear-gradient(135deg, ${colors.map(c => `${c}4D`).join(', ')})` };
};

const DiaryDetailClient = ({ diary }: { diary: DiaryEntry }) => {
  const [isReplySlideOpen, setIsReplySlideOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(diary.isInitiallyLiked || false);
  const [likesCount, setLikesCount] = useState(diary.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  }

  return (
    // ⭐️ 수정: 모든 문제를 일으켰던 최상위 Wrapper Div를 제거했습니다.
    <>
      {/* 이제 이 컴포넌트는 전역 `noise-background` 위에 렌더링됩니다. */}
      <DiaryDetailNavigationBar dateString={diary.dateString} weatherIcon={diary.weatherIcon} />
      
      <main className="pt-20 pb-10">
        <div className="px-4">
          <article className="card-base" style={getCardBackgroundStyle(diary.selectedEmotions)}>
            <div className="p-5">
              {diary.imageUrl && (
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 shadow-inner">
                  <Image src={diary.imageUrl} alt={diary.title || '일기 이미지'} layout="fill" objectFit="cover" />
                </div>
              )}
              {diary.title && (
                <h2 className="font-gowun-batang text-xl font-bold text-[var(--text-main)] mb-4">
                  {diary.title}
                </h2>
              )}
              <p className="text-[var(--text-main)] leading-relaxed whitespace-pre-wrap prose">
                {diary.content}
              </p>

              <div className="border-t border-black/10 mt-6 pt-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                      <Image src={diary.author.profileImage} alt={diary.author.name} width={32} height={32} />
                  </div>
                  <span className="font-gowun-batang font-bold text-sm text-[var(--text-main)]">{diary.author.name}</span>
                  <button className="ml-auto px-3 py-1 bg-white/50 text-[var(--text-subtle)] text-xs font-medium rounded-[var(--rounded-button)] border border-[var(--color-border)] hover:bg-[var(--color-subtle-bg)] transition-colors">
                    팔로우
                  </button>
                </div>
              </div>
            </div>
          </article>

          <section className="mt-6 px-2">
            <div className="mb-6">
                <h3 className="text-xs font-semibold text-[var(--text-subtle)] mb-3">오늘의 감정</h3>
                <div className="flex flex-wrap gap-2">
                {diary.selectedEmotions.map(emotion => (
                    <div key={emotion.key} className="px-3 py-1 text-sm font-medium text-white rounded-full shadow-sm" style={{ backgroundColor: emotion.color }}>
                    {emotion.label}
                    </div>
                ))}
                </div>
            </div>

            <div className="flex items-center space-x-6 text-[var(--text-subtle)]">
              <button onClick={handleLike} className="flex items-center space-x-1.5 text-sm hover:text-[var(--text-main)] transition-colors">
                <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'} ri-lg`}></i>
                <span>{likesCount}</span>
              </button>
              <button onClick={() => setIsReplySlideOpen(true)} className="flex items-center space-x-1.5 text-sm hover:text-[var(--text-main)] transition-colors">
                <i className="ri-chat-3-line ri-lg"></i>
                <span>{diary.comments}</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {isReplySlideOpen && (
        <SlideFromBottomReply 
          diaryId={diary.id}
          entry={commentEntriesData} 
          onClose={() => setIsReplySlideOpen(false)} 
        />
      )}
    </>
  );
};

export default DiaryDetailClient;