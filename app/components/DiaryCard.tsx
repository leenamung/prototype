"use client";
import React, { useState, useEffect, useRef } from "react";
import type { DiaryEntry } from "../data/diaryEntries";
import Image from "next/image";
import { motion } from "framer-motion";

interface DiaryCardProps {
  entry: DiaryEntry;
  optionHandle: (entry: DiaryEntry) => void;
  repliySlideHandle: (diaryId: string) => void;
}

const DiaryCard: React.FC<DiaryCardProps> = ({ entry, optionHandle, repliySlideHandle,}) => {
  const [isLiked, setIsLiked] = useState(entry.isInitiallyLiked || false);
  const [currentLikes, setCurrentLikes] = useState(entry.likes);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      if (entry.content && entry.content.length > 150) {
        setShowReadMore(true);
      } else {
        setShowReadMore(false);
      }
    }
  }, [entry.content]);

  const handleOpenOptionsMenu = () => {
    optionHandle(entry);
  };

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleAudioPlay = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const getEmotionBackgroundStyle = () => {
    const colors = entry.selectedEmotions.map(e => e.color);
    if (colors.length === 0) return { backgroundColor: 'transparent' };
    if (colors.length === 1) return { backgroundColor: colors[0] };
    return { backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})` };
  };
  
  const getEmotionBorderStyle = () => {
    const colors = entry.selectedEmotions.map(e => e.color);
    if (colors.length === 0) return { borderLeftColor: 'transparent' };
    if (colors.length === 1) return { borderLeftColor: colors[0] };
    return { 
      borderImageSlice: 1,
      borderImageSource: `linear-gradient(to bottom, ${colors.join(', ')})`
    };
  };

  if (entry.type === 'image' || entry.type === 'video') {
    return (
      <motion.div
        className="card-base overflow-hidden p-0" // 패딩 제거
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        <div className="relative">
          {/* 헤더: 프로필, 이름, 더보기 (콘텐츠 위에 오버레이) */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/30 to-transparent">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/80 overflow-hidden mr-2 flex-shrink-0">
                <Image
                  src={entry.profileImage}
                  alt={`${entry.author} 프로필`}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-gowun-batang font-bold text-white text-sm leading-tight shadow-sm">{entry.author}</p>
              </div>
            </div>
            <button
              className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full text-white/90 hover:bg-white/20 transition-colors"
              onClick={handleOpenOptionsMenu}
            >
              <i className="ri-more-2-fill ri-lg"></i>
            </button>
          </div>

          {/* 메인 콘텐츠: 사진 또는 영상 */}
          <div className="relative w-full aspect-square bg-[var(--color-border)]">
            {entry.type === "image" && entry.imageUrl && (
              <Image
                src={entry.imageUrl}
                alt="게시물 이미지"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 600px) 100vw, 600px"
              />
            )}
            {entry.type === "video" && entry.videoInfo && (
              <>
                <Image
                  src={entry.videoInfo.thumbnailImage}
                  alt={`${entry.author}의 영상 일기 썸네일`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, 600px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button className="w-14 h-14 flex items-center justify-center bg-[var(--color-component-bg)]/80 rounded-full cursor-pointer">
                    <i className="ri-play-fill ri-2x text-[var(--color-primary)]"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ⬇️ 2. 텍스트 및 피드백 영역 (감성 디자인 적용) */}
        <div className="relative">
          {/* 감성 오버레이 */}
          <div 
            className="absolute inset-0 opacity-[0.15] z-0" 
            style={getEmotionBackgroundStyle()}
          ></div>
          {/* 감정의 여백 */}
          <div 
            className="relative border-l-4" 
            style={getEmotionBorderStyle()}
          >
            <div className="p-4 backdrop-blur-sm">
              {entry.content && (
                <p ref={contentRef} className={`text-[15px] text-[var(--text-main)] mb-4 ${isExpanded ? "" : "line-clamp-3"}`}>
                  {entry.content}
                </p>
              )}
              {showReadMore && (
                <button onClick={toggleReadMore} className="text-[var(--text-subtle)] text-sm -mt-3 mb-3 hover:underline focus:outline-none">
                  {isExpanded ? "간략히" : "더보기"}
                </button>
              )}
              {/* 콘텐츠 구분선 */}
              <div className="border-t border-[var(--color-divider)] my-3"></div>
              {/* 좋아요/댓글 버튼 */}
              <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
                <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={handleLikeToggle}>
                  <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i>
                  <span>{currentLikes}</span>
                </button>
                <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={() => repliySlideHandle(entry.id)}>
                  <i className="ri-chat-3-line"></i>
                  <span>{entry.comments}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }


  // ⬇️ 기존 텍스트 중심의 카드 레이아웃 (폴라로이드 조건에 해당하지 않을 때 렌더링)
  return (
    <motion.div 
      className="card-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      {/* 감성 그라데이션 오버레이 */}
      <div 
        className="absolute inset-0 opacity-[0.15] z-0" 
        style={getEmotionBackgroundStyle()}
      ></div>

      {/* 감정의 여백 (테두리) 및 콘텐츠 */}
      <div 
        className="relative border-l-4" 
        style={getEmotionBorderStyle()}
      >
        <div className="p-5 backdrop-blur-sm">
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
                <Image
                  src={entry.profileImage}
                  alt={`${entry.author} 프로필`}
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="font-gowun-batang font-bold text-[var(--text-main)] text-[15px] leading-tight">{entry.author}</p> 
                <p className="text-xs text-[var(--text-subtle)]">{entry.timestamp}</p>
              </div>
            </div>
            <button
              className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-[var(--color-subtle-bg)] transition-colors"
              onClick={handleOpenOptionsMenu}
            >
              <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
            </button>
          </div>

        {/* 일기 타입별 콘텐츠 렌더링 */}
          <div className="mb-4">
            {entry.type === "image" && entry.imageUrl && (
              <div className="w-full rounded-lg overflow-hidden mb-4 border border-[var(--color-border)]">
                <Image
                  src={entry.imageUrl}
                  alt={`${entry.author}의 사진 일기`}
                  width={500}
                  height={375}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
            )}

            {entry.type === "video" && entry.videoInfo && (
               <div className="mb-4 rounded-lg overflow-hidden relative border border-[var(--color-border)]">
                  <Image
                    src={entry.videoInfo.thumbnailImage}
                    alt={`${entry.author}의 영상 일기 썸네일`}
                    width={513}  // ⭐️ 원본 이미지의 너비 (비율 계산용)
                    height={288} // ⭐️ 원본 이미지의 높이 (비율 계산용)
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button className="w-14 h-14 flex items-center justify-center bg-[var(--color-component-bg)]/80 rounded-full cursor-pointer">
                      <i className="ri-play-fill ri-2x text-[var(--color-primary)]"></i>
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                    {entry.videoInfo.duration}
                  </div>
                </div>
            )}

            {entry.type === "audio" && entry.audioInfo && (
               <div className="bg-[var(--color-component-bg)] rounded-lg p-3 mb-4 shadow-sm border border-[var(--color-border)]">
              {/* 오디오 플레이어 배경 및 그림자 추가 */}
                  <div className="flex items-center mb-2">
                    <button 
                      className="w-8 h-8 flex items-center justify-center cursor-pointer bg-[var(--color-primary)] border border-[var(--color-primary-dark)] rounded-full mr-3 hover:opacity-80 transition-opacity"
                      onClick={toggleAudioPlay}
                      aria-label={isAudioPlaying ? "오디오 일시정지" : "오디오 재생"}
                    >
                      <i className={`ri-lg text-white ${isAudioPlaying ? "ri-pause-fill" : "ri-play-fill"}`}></i>
                    </button>
                    <div className="flex-1 h-10 flex items-center">
                      <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
                        <div className={`bg-[var(--color-primary)] h-full ${entry.audioInfo.progressWidth || "w-0"} rounded-full transition-all duration-300`}></div>
                      </div>
                    </div>
                    <span className="text-xs text-[var(--text-subtle)] ml-3">
                      {entry.audioInfo.duration}
                    </span>
                  </div>
                  <div className="w-full h-12 flex items-center justify-center">
                    <Image
                      src={entry.audioInfo.waveformImage}
                      alt="오디오 파형"
                      className="h-full w-auto object-contain"
                      width={144}
                      height={48}
                    />
                  </div>
                </div>
            )}

          {/* 일기 본문 */}
            <p ref={contentRef} className={`text-[15px] text-[var(--text-main)] ${isExpanded ? "" : "line-clamp-4"}`}>
              {entry.content}
            </p>
            {showReadMore && (
              <button onClick={toggleReadMore} className="text-[var(--text-subtle)] text-sm mt-1 hover:underline focus:outline-none">
                {isExpanded ? "간략히" : "더보기"}
              </button>
            )}
          </div>

        {/* 하단 액션: 좋아요, 댓글 */}
          <div className="border-t border-[var(--color-divider)] my-4"></div>
          <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
            <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={handleLikeToggle}>
              <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i>
              <span>{currentLikes}</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={() => repliySlideHandle(entry.id)}>
              <i className="ri-chat-3-line"></i>
              <span>{entry.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiaryCard;