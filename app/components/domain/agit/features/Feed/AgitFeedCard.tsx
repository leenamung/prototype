"use client";
import React, { useState } from 'react';
import { AgitFeedItem } from '@/app/data/agitSampleData';
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
  
  // [수정] 앙주 스타일 카드 디자인 (DiaryCard와 동일 로직)
  const getEmotionCardStyle = () => {
    const emotions = item.selectedEmotions;
    if (!emotions || emotions.length === 0) {
      return {
        borderColor: 'var(--color-border)',
        backgroundColor: '#ffffff',
        borderWidth: '1px',
        borderStyle: 'solid',
      };
    }
    const mainEmotionKey = emotions[0].key;
    return {
      borderColor: `var(--emotion-${mainEmotionKey}-border, var(--color-border))`,
      backgroundColor: `color-mix(in srgb, var(--emotion-${mainEmotionKey}) 10%, #ffffff)`,
      borderWidth: '2px',
      borderStyle: 'solid',
    };
  };

  const cardStyle = getEmotionCardStyle();

  // 1. 미디어 중심 레이아웃
  if (item.imageUrl) {
    return (
      <motion.div
        // card-base 제거, rounded-hand-drawn 적용
        className="relative mb-4 overflow-hidden shadow-sm transition-all duration-200 rounded-hand-drawn hover:shadow-md"
        style={cardStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-[var(--text-main)]/30 to-transparent">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/80 overflow-hidden mr-2 flex-shrink-0">
                <Image src={item.author.profileImage} alt={`${item.author.name} 프로필`} width={32} height={32} className="w-full h-full object-cover"/>
              </div>
              <div><p className="font-maru-buri font-bold text-white text-sm leading-tight shadow-sm">{item.author.name}</p></div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full text-white/90 hover:bg-white/20 transition-colors">
              <i className="ri-more-2-fill ri-lg"></i>
            </button>
          </div>
          {/* 미디어 하단 테두리 추가 */}
          <div className="relative w-full aspect-square bg-[var(--color-subtle-bg)]" style={{ borderBottom: `2px solid ${cardStyle.borderColor}` }}>
            <Image src={item.imageUrl} alt="게시물 이미지" fill style={{ objectFit: 'cover' }} sizes="(max-width: 600px) 100vw, 600px"/>
          </div>
        </div>

        <div className="p-4 backdrop-blur-sm">
          <p className="text-[15px] text-[var(--text-main)] mb-4">{item.content}</p>
          {/* 구분선 색상 맞춤 */}
          <div className="border-t my-3" style={{ borderColor: cardStyle.borderColor, opacity: 0.4 }}></div>
          <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
            <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={handleLikeClick}>
              <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i><span>{likesCount}</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors">
              <i className="ri-chat-3-line"></i><span>{item.comments}</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // 2. 텍스트 중심 레이아웃
  return (
    <motion.div
      className="relative mb-4 overflow-hidden shadow-sm transition-all duration-200 rounded-hand-drawn hover:shadow-md"
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div className="p-5 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
              <Image src={item.author.profileImage} alt={`${item.author.name} 프로필`} className="w-full h-full object-cover" width={40} height={40}/>
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

        <div className="border-t my-4" style={{ borderColor: cardStyle.borderColor, opacity: 0.4 }}></div>

        <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
          <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={handleLikeClick}>
            <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i><span>{likesCount}</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors">
            <i className="ri-chat-3-line"></i><span>{item.comments}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AgitFeedCard;