"use client";
import React, { useState } from 'react';
import type { AgitFeedItem } from '../data/agitSampleData';
import Image from 'next/image';

interface AgitFeedCardProps {
  item: AgitFeedItem;
}

const AgitFeedCard: React.FC<AgitFeedCardProps> = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    // 카드 배경색 변경 (기본 #FFFAF0 사용 또는 --color-sub-beige 등 고려)
    <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--color-border)]">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-4 flex-shrink-0">
            <Image
              src={item.author.profileImage}
              alt={`${item.author.name} 프로필`}
              className="w-full h-full object-cover"
              width={40}
              height={40}
            />
          </div>
          <div>
            {/* 작성자 이름 텍스트 색상 변경 */}
            <p className="font-medium text-sm text-[var(--text-main)]">{item.author.name}</p>
            {/* 타임스탬프 텍스트 색상 변경 */}
            <p className="text-xs text-[var(--text-subtle)]">{item.timestamp}</p>
          </div>
        </div>

        {/* 감정 오버레이 배경색 변경 (bg-primary/15) */}
        <div className={item.emotionOverlay ? "bg-[var(--color-primary)]/15 p-4 rounded-md mb-4" : "mb-4"}>
          {/* 본문 텍스트 색상 변경 */}
          <p className="text-base text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">{item.content}</p>
        </div>

        {item.imageUrl && (
          <div className="mb-4 rounded-md overflow-hidden">
            <Image
              src={item.imageUrl}
              alt="피드 이미지"
              width={500} // ⭐️ 원본 이미지의 너비 (비율 계산용)
              height={375} // ⭐️ 원본 이미지의 높이 (비율 계산용)
              className="w-full h-auto object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </div>
        )}

        {/* 아이콘 및 카운트 텍스트 색상 변경 */}
        <div className="flex justify-between items-center text-[var(--text-subtle)]">
          <div className="flex items-center space-x-5">
            <button onClick={handleLike} className="flex items-center p-1 rounded-full hover:text-[var(--color-primary)] active:bg-[var(--color-subtle-bg)] transition-colors" aria-label="좋아요">
              <i className={`${isLiked ? 'ri-heart-fill text-[var(--color-primary)]' : 'ri-heart-line'} ri-md`}></i>
              <span className="text-xs ml-1.5">{likes}</span>
            </button>
            <button className="flex items-center p-1 rounded-full hover:text-[var(--color-primary)] active:bg-[var(--color-subtle-bg)] transition-colors" aria-label="댓글">
              <i className="ri-chat-1-line ri-md"></i>
              <span className="text-xs ml-1.5">{item.comments}</span>
            </button>
          </div>
          <button onClick={handleBookmark} className="p-1 rounded-full hover:text-[var(--color-primary)] active:bg-[var(--color-subtle-bg)] transition-colors" aria-label="북마크">
            <i className={`${isBookmarked ? 'ri-bookmark-fill text-[var(--color-primary)]' : 'ri-bookmark-line'} ri-md`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgitFeedCard;