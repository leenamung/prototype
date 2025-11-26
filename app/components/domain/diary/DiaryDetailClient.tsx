"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { DiaryEntry } from '@/app/data/diaryEntries';
import { commentEntriesData } from '@/app/data/commentEntries';
import SlideFromBottomReply from '../feed/Reply/SlideFromBottomReply';
import Link from 'next/link';
import { RemoveScroll } from 'react-remove-scroll';

const getEmotionGradientStyle = (emotions: DiaryEntry['selectedEmotions']) => {
    const colors = emotions.map(e => e.color);
    if (colors.length === 0) return { backgroundColor: 'var(--color-background)' };
    if (colors.length === 1) return { backgroundColor: `${colors[0]}B3` };
    return { backgroundImage: `linear-gradient(160deg, ${colors.map(c => `${c}B3`).join(', ')})` };
};

// 👈 [수정] backButton prop 제거
const DiaryDetailClient = ({ diary }: { diary: DiaryEntry }) => {

  const [isReplySlideOpen, setIsReplySlideOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(diary.isInitiallyLiked || false);
  const [likesCount, setLikesCount] = useState(diary.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  }

  return (
    <RemoveScroll>
      <AnimatePresence>
        <div key="diary-detail-modal">
          {/* 1. 감성 그라데이션 배경 */}
          <motion.div
            className="fixed inset-0 z-30"
            style={getEmotionGradientStyle(diary.selectedEmotions)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="noise-background" style={{ zIndex: 31 }} />
          </motion.div>

          {/* ❌ {backButton} 제거됨 */}
          
          {/* 콘텐츠 스크롤 영역 */}
          <div 
              className="fixed inset-0 z-40 flex justify-center items-start p-4 pt-20 pb-28 overflow-y-auto"
          >
            {/* ... (기존 카드 콘텐츠 동일) ... */}
            <motion.div
              layoutId={`diary-card-${diary.id}`}
              className="w-full max-w-2xl bg-[var(--color-component-bg)]/80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
                {diary.imageUrl && (
                  <div className="relative w-full aspect-video">
                    <Image src={diary.imageUrl} alt={diary.title || '일기 이미지'} fill style={{objectFit: "cover"}} priority/>
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  {diary.title && (
                    <h1 className="font-gowun-dodum text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-4 leading-snug">
                      {diary.title}
                    </h1>
                  )}
                  <div className="flex items-center text-xs text-[var(--text-subtle)] mb-6">
                    <span>{diary.dateString}</span>
                    <span className="mx-2">·</span>
                    <i className={`${diary.weatherIcon} ri-sm mr-1`}></i>
                  </div>

                  <p className="text-[var(--text-main)] text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-pretendard">
                    {diary.content}
                  </p>

                  <div className="border-t border-[var(--color-divider)] mt-8 pt-6">
                    <Link href={`/profile/${diary.author.name}`} className="flex items-center group">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                          <Image src={diary.author.profileImage} alt={diary.author.name} width={40} height={40} />
                      </div>
                      <div>
                        <span className="font-maru-buri font-bold text-sm text-[var(--text-main)] group-hover:underline">{diary.author.name}</span>
                        <p className="text-xs text-[var(--text-subtle)]">프로필 보기</p>
                      </div>
                    </Link>
                  </div>
                </div>
            </motion.div>
          </div>

          {/* ... (하단 바 동일) ... */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 h-20 flex justify-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            <div className="h-14 w-fit px-4 my-auto flex items-center space-x-6 bg-[var(--color-component-bg)]/80 backdrop-blur-lg rounded-full shadow-lg border border-white/20">
                <button onClick={handleLike} className="flex items-center space-x-2 text-sm text-[var(--text-main)] hover:text-[var(--color-warning)] transition-colors">
                  <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'} ri-lg`}></i>
                  <span className="font-medium">{likesCount}</span>
                </button>
                <div className="w-px h-6 bg-[var(--color-border)]"></div>
                <button onClick={() => setIsReplySlideOpen(true)} className="flex items-center space-x-2 text-sm text-[var(--text-main)] hover:text-[var(--color-primary)] transition-colors">
                  <i className="ri-chat-3-line ri-lg"></i>
                  <span className="font-medium">{diary.comments}</span>
                </button>
            </div>
          </motion.div>

          {isReplySlideOpen && (
            <SlideFromBottomReply 
              diaryId={diary.id}
              entry={commentEntriesData} 
              onClose={() => setIsReplySlideOpen(false)} 
            />
          )}
        </div>
      </AnimatePresence>
    </RemoveScroll>
  );
};

export default DiaryDetailClient;