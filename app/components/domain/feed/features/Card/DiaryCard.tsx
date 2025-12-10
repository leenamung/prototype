"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DiaryEntry } from "@/app/data/diaryEntries";

interface DiaryCardProps {
  entry: DiaryEntry;
  optionHandle: (entry: DiaryEntry) => void;
  repliySlideHandle: (diaryId: string) => void;
}

const DiaryCard: React.FC<DiaryCardProps> = ({ entry, optionHandle, repliySlideHandle }) => {
  const [isLiked, setIsLiked] = useState(entry.isInitiallyLiked || false);
  const [currentLikes, setCurrentLikes] = useState(entry.likes);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  // 애니메이션용 옵저버
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (contentRef.current && entry.content) {
      setShowReadMore(entry.content.length > 150);
    }
  }, [entry.content]);

  const handleOpenOptionsMenu = () => optionHandle(entry);
  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };
  const toggleReadMore = () => setIsExpanded((prev) => !prev);
  const toggleAudioPlay = () => setIsAudioPlaying(!isAudioPlaying);

  // 감정 스타일 생성
  const getGradientStyles = () => {
    const emotions = entry.selectedEmotions;

    if (!emotions || emotions.length === 0) {
      return {
        borderBackground: 'var(--color-border)',
        textureBackground: 'transparent',
        separatorColor: 'var(--color-border)',
      };
    }

    const borderColors = emotions.map(e => `var(--emotion-${e.key}-border, var(--color-border))`);
    const textureColors = emotions.map(e => `var(--emotion-${e.key})`);

    const borderGradient = borderColors.length > 1 
      ? `linear-gradient(135deg, ${borderColors.join(', ')})` 
      : borderColors[0];

    const textureGradient = textureColors.length > 1 
      ? `linear-gradient(135deg, ${textureColors.join(', ')})` 
      : textureColors[0];

    return {
      borderBackground: borderGradient,
      textureBackground: textureGradient,
      separatorColor: borderColors[0],
    };
  };

  const styles = getGradientStyles();

  // [최종 UX] '그 날의 기록으로' 링크 (우측 하단)
  // - 모바일 퍼스트: Hover 효과 제거 (항상 보임)
  // - 직관성: '게시 시간(5분 전)'이 아닌 '기록 날짜(9월 26일)'를 표시하여 컨텐츠의 맥락 강조
  // - 감성: 날씨 아이콘을 함께 배치하여 '그 날의 분위기' 암시
  const DateDetailLink = () => (
    <Link 
      href={`/diary/${entry.id}`} 
      scroll={false}
      className="flex items-center py-2 pl-2 active:opacity-70 transition-opacity" // 모바일 터치 피드백(active) 추가
      aria-label={`${entry.dateString} 일기 상세 보기`}
    >
      {/* 날씨 아이콘 (있을 경우) */}
      {entry.weatherIcon && (
        <i className={`${entry.weatherIcon} text-[var(--text-subtle)] mr-1.5 text-sm`}></i>
      )}
      
      {/* 날짜 텍스트 (예: 2025년 9월 26일) */}
      <span className="text-xs font-maru-buri mr-1 text-[var(--text-subtle)] font-medium">
        {entry.dateString}
      </span>
      
      {/* 진입 화살표 */}
      <i className="ri-arrow-right-s-line text-[var(--text-subtle)] text-lg"></i>
    </Link>
  );

  // ---------------------------------------------------------
  // 1. 이미지 또는 비디오 타입 렌더링
  // ---------------------------------------------------------
  if (entry.type === 'image' || entry.type === 'video') {
    return (
      <motion.div
        ref={cardRef}
        layoutId={`diary-card-${entry.id}`}
        className={`relative mb-6 shadow-sm rounded-hand-drawn p-[2px]`}
        style={{ background: styles.borderBackground }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        <div className="relative w-full h-full bg-white rounded-hand-drawn overflow-hidden clip-radius-fix">
            
            <div 
              className="rubbed-pastel-layer" 
              style={{ background: styles.textureBackground }} 
            />

            {/* 상단 미디어 영역 (z-20) */}
            <div className="relative z-20"> 
                <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-[var(--text-main)]/40 to-transparent pointer-events-none">
                    <div className="flex items-center pl-1 pointer-events-auto">
                      <Link href={`/profile/${entry.author.name}`} className="flex items-center">
                          <div className="w-9 h-9 rounded-full border-2 border-white/90 overflow-hidden mr-2 flex-shrink-0 shadow-sm">
                              <Image src={entry.author.profileImage} alt={`${entry.author.name} 프로필`} width={36} height={36} className="w-full h-full object-cover"/>
                          </div>
                          <div>
                              <p className="font-maru-buri font-bold text-white text-sm leading-tight shadow-sm text-shadow-sm">{entry.author.name}</p>
                              {/* 미디어 상단에서는 깔끔하게 이름만 표시 (타임스탬프는 생략하거나 디자인에 따라 추가) */}
                          </div>
                      </Link>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full text-white/90 hover:bg-white/20 transition-colors pointer-events-auto" onClick={handleOpenOptionsMenu}>
                        <i className="ri-more-2-fill ri-lg"></i>
                    </button>
                </div>
                
                <div className="relative w-full aspect-square bg-[var(--color-subtle-bg)]" style={{ borderBottom: `2px solid ${styles.separatorColor}` }}>
                    {entry.type === "image" && entry.imageUrl && (
                    <Image src={entry.imageUrl} alt="게시물 이미지" fill style={{ objectFit: 'cover' }} sizes="(max-width: 600px) 100vw, 600px"/>
                    )}
                    {entry.type === "video" && entry.videoInfo && (
                    <>
                        <Image src={entry.videoInfo.thumbnailImage} alt={`${entry.author}의 영상 일기 썸네일`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 600px) 100vw, 600px"/>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Link href={`/diary/${entry.id}`} scroll={false} className="w-14 h-14 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full cursor-pointer active:scale-95 transition-transform pointer-events-auto">
                              <i className="ri-play-fill ri-2x text-[var(--text-main)] ml-1"></i>
                          </Link>
                        </div>
                    </>
                    )}
                </div>
            </div>

            {/* 하단 텍스트 영역 (z-20) */}
            <div className="relative z-20">
                <div className="relative">
                    <div className="py-4 px-5 bg-white/40 backdrop-blur-[2px]"> 
                        {entry.title && <h3 className="font-gowun-dodum text-[16px] text-[var(--text-main)] mb-2 relative">{entry.title}</h3>}
                        <p ref={contentRef} className={`text-[15px] text-[var(--text-main)] mb-4 leading-relaxed relative ${isExpanded ? "" : "line-clamp-3"}`}>{entry.content}</p>
                        
                        {showReadMore && (
                          <button 
                            onClick={toggleReadMore} 
                            className="text-[var(--text-subtle)] text-sm -mt-2 mb-4 p-1 -ml-1 hover:underline focus:outline-none relative block pointer-events-auto font-medium"
                          >
                            {isExpanded ? "간략히" : "...더 보기"}
                          </button>
                        )}
                        
                        <div className="border-t my-3" style={{ borderColor: styles.separatorColor, opacity: 0.4 }}></div>
                        
                        <div className="flex items-center justify-between relative">
                            {/* 좌측: 소셜 인터랙션 */}
                            <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
                                <button className="flex items-center space-x-1.5 active:opacity-60 transition-opacity pointer-events-auto" onClick={handleLikeToggle}>
                                <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'} ri-lg`}></i>
                                <span>{currentLikes}</span>
                                </button>
                                <button className="flex items-center space-x-1.5 active:opacity-60 transition-opacity pointer-events-auto" onClick={() => repliySlideHandle(entry.id)}>
                                <i className="ri-chat-3-line ri-lg"></i>
                                <span>{entry.comments}</span>
                                </button>
                            </div>

                             {/* ✅ [우측] 기록 날짜로 이동 (DateDetailLink) */}
                             <DateDetailLink />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    );
  }

  // ---------------------------------------------------------
  // 2. 텍스트 또는 오디오 타입 렌더링
  // ---------------------------------------------------------
  return (
    <motion.div 
      ref={cardRef}
      layoutId={`diary-card-${entry.id}`}
      className={`relative mb-6 shadow-sm rounded-hand-drawn p-[2px]`}
      style={{ background: styles.borderBackground }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div className="relative w-full h-full bg-white rounded-hand-drawn overflow-hidden clip-radius-fix">

          <div 
            className="rubbed-pastel-layer" 
            style={{ background: styles.textureBackground }} 
          />

          <div className="relative z-20">
            <div className="relative">
                <div className="relative">
                    <div className="py-5 px-5 bg-white/30 backdrop-blur-[1px]">
                        {/* 상단 프로필 영역 */}
                        <div className="flex items-start justify-between mb-4 relative z-20">
                            <div className="flex items-center pointer-events-auto">
                              <Link href={`/profile/${entry.author.name}`} className="flex items-center">
                                  <div className="w-10 h-10 rounded-full border border-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
                                      <Image src={entry.author.profileImage} alt={`${entry.author.name} 프로필`} className="w-full h-full object-cover" width={40} height={40}/>
                                  </div>
                                  <div>
                                      <p className="font-maru-buri font-bold text-[var(--text-main)] text-[15px] leading-tight">{entry.author.name}</p>
                                      {/* ✅ [게시 시간] 단순 정보로 복귀 (링크 X) */}
                                      <p className="text-xs text-[var(--text-subtle)] mt-0.5">{entry.timestamp}</p>
                                  </div>
                              </Link>
                            </div>
                            <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-[var(--color-subtle-bg)] transition-colors z-20 text-[var(--text-subtle)] pointer-events-auto" onClick={handleOpenOptionsMenu}>
                                <i className="ri-more-2-fill ri-lg"></i>
                            </button>
                        </div>

                        {/* 본문 영역 */}
                        <div className="mb-4 relative z-20">
                            {entry.type === 'text' && entry.title && <p className="font-gowun-dodum font-bold text-base text-[var(--text-main)] mb-3">{entry.title}</p>}
                            
                            {entry.type === "audio" && entry.audioInfo && (
                                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 mb-4 shadow-sm border" style={{ borderColor: styles.separatorColor }}>
                                    {entry.title && <p className="font-gowun-dodum text-sm text-center text-[var(--text-main)] mb-2">{entry.title}</p>}
                                    <div className="flex items-center mb-2">
                                        <button 
                                            className="w-9 h-9 flex items-center justify-center cursor-pointer bg-[var(--color-primary)] text-white rounded-full mr-3 active:opacity-80 transition-opacity relative z-20 shadow-sm pointer-events-auto"
                                            onClick={toggleAudioPlay}
                                            aria-label={isAudioPlaying ? "오디오 일시정지" : "오디오 재생"}
                                        >
                                            <i className={`ri-lg ${isAudioPlaying ? "ri-pause-fill" : "ri-play-fill"} ml-0.5`}></i>
                                        </button>
                                        <div className="flex-1 h-10 flex items-center">
                                            <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
                                            <div className={`bg-[var(--color-primary)] h-full ${entry.audioInfo.progressWidth || "w-0"} rounded-full transition-all duration-300`}></div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-[var(--text-subtle)] ml-3 font-mono">
                                            {entry.audioInfo.duration}
                                        </span>
                                    </div>
                                    <div className="w-full h-8 flex items-center justify-center opacity-60">
                                        <Image
                                            src={entry.audioInfo.waveformImage}
                                            alt="오디오 파형"
                                            className="h-full w-auto object-contain"
                                            width={144}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}

                            <p ref={contentRef} className={`text-[15px] text-[var(--text-main)] leading-relaxed ${isExpanded ? "" : "line-clamp-4"}`}>{entry.content}</p>
                            
                            {showReadMore && (
                              <button 
                                onClick={toggleReadMore} 
                                className="text-[var(--text-subtle)] text-sm mt-2 p-1 -ml-1 hover:underline focus:outline-none relative block pointer-events-auto font-medium"
                              >
                                {isExpanded ? "간략히" : "...더 보기"}
                              </button>
                            )}
                        </div>
                        
                        <div className="border-t my-4" style={{ borderColor: styles.separatorColor, opacity: 0.4 }}></div>
                        
                        <div className="flex items-center justify-between relative z-20">
                            {/* 좌측: 소셜 인터랙션 */}
                            <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
                                <button className="flex items-center space-x-1.5 active:opacity-60 transition-opacity pointer-events-auto" onClick={handleLikeToggle}>
                                <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'} ri-lg`}></i>
                                <span>{currentLikes}</span>
                                </button>
                                <button className="flex items-center space-x-1.5 active:opacity-60 transition-opacity pointer-events-auto" onClick={() => repliySlideHandle(entry.id)}>
                                <i className="ri-chat-3-line ri-lg"></i>
                                <span>{entry.comments}</span>
                                </button>
                            </div>

                             {/* ✅ [우측] 기록 날짜로 이동 */}
                             <DateDetailLink />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiaryCard;