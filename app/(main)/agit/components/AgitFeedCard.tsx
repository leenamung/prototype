"use client";
import React, { useState } from 'react';
import type { AgitFeedItem } from '../data/agitSampleData';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AgitFeedCardProps {
  item: AgitFeedItem;
}

const AgitFeedCard: React.FC<AgitFeedCardProps> = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };
  
  // ⬇️ DiaryCard에서 사용했던 헬퍼 함수들을 그대로 가져옵니다.
  const getEmotionBackgroundStyle = () => {
    const colors = item.selectedEmotions.map(e => e.color);
    if (colors.length === 0) return { backgroundColor: 'transparent' };
    if (colors.length === 1) return { backgroundColor: colors[0] };
    return { backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})` };
  };
  
  const getEmotionBorderStyle = () => {
    const colors = item.selectedEmotions.map(e => e.color);
    if (colors.length === 0) return { borderLeftColor: 'transparent' };
    if (colors.length === 1) return { borderLeftColor: colors[0] };
    return { 
      borderImageSlice: 1,
      borderImageSource: `linear-gradient(to bottom, ${colors.join(', ')})`
    };
  };

  // ⬇️ 1. 미디어 중심 레이아웃 (사진 또는 영상일 경우)
  if (item.imageUrl) { // 간단하게 imageUrl 유무로 판단
    return (
      <motion.div
        className="card-base overflow-hidden p-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        {/* 미디어 영역 */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-[var(--text-main)]/30 to-transparent">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--text-on-primary)]/80 overflow-hidden mr-2 flex-shrink-0">
                <Image
                  src={item.author.profileImage}
                  alt={`${item.author.name} 프로필`}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-maru-buri font-bold text-[var(--text-on-primary)] text-sm leading-tight shadow-sm">{item.author.name}</p>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full text-[var(--text-on-primary)]/90 hover:bg-[var(--text-on-primary)]/20 transition-colors">
              <i className="ri-more-2-fill ri-lg"></i>
            </button>
          </div>
          <div className="relative w-full aspect-square bg-[var(--color-border)]">
            <Image
              src={item.imageUrl}
              alt="게시물 이미지"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 100vw, 600px"
            />
          </div>
        </div>

        {/* 텍스트 및 피드백 영역 (감성 디자인 적용) */}
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-[0.15] z-0" 
            style={getEmotionBackgroundStyle()}
          ></div>
          <div 
            className="relative border-l-4" 
            style={getEmotionBorderStyle()}
          >
            <div className="p-4 backdrop-blur-sm">
              <p className="text-[15px] text-[var(--text-main)] mb-4">{item.content}</p>
              <div className="border-t border-[var(--color-divider)] my-3"></div>
              <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
                <button 
                  className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors"
                  onClick={handleLikeClick}
                >
                  <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i>
                  <span>{likesCount}</span>
                </button>
                <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors">
                  <i className="ri-chat-3-line"></i>
                  <span>{item.comments}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ⬇️ 2. 텍스트 중심 레이아웃 (사진이 없을 경우)
  return (
    <motion.div
      className="card-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div 
        className="absolute inset-0 opacity-[0.15] z-0" 
        style={getEmotionBackgroundStyle()}
      ></div>
      <div 
        className="relative border-l-4" 
        style={getEmotionBorderStyle()}
      >
        <div className="p-5 backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
                <Image
                  src={item.author.profileImage}
                  alt={`${item.author.name} 프로필`}
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="font-maru-buri font-bold text-[var(--text-main)] text-[15px] leading-tight">{item.author.name}</p>
                <p className="text-xs text-[var(--text-subtle)]">{item.timestamp}</p>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-[var(--color-subtle-bg)] transition-colors">
              <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-[15px] text-[var(--text-main)]">{item.content}</p>
          </div>

          <div className="border-t border-[var(--color-divider)] my-4"></div>

          <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
            <button 
              className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors"
              onClick={handleLikeClick}
            >
              <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i>
              <span>{likesCount}</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors">
              <i className="ri-chat-3-line"></i>
              <span>{item.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgitFeedCard;