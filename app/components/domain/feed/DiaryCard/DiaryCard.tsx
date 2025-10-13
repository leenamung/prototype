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
      { threshold: 0.5 }
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
  
  const getEmotionBackgroundStyle = () => {
    const colors = entry.selectedEmotions.map(e => e.color);
    if (colors.length === 0) return { backgroundColor: 'transparent' };
    if (colors.length === 1) return { backgroundColor: colors[0] };
    return { backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})` };
  };
  
  const getEmotionBorderStyle = () => {
    const colors = entry.selectedEmotions.map(e => e.color);
    if (colors.length === 0) return { backgroundColor: 'transparent' };
    if (colors.length === 1) return { backgroundColor: colors[0] };
    return { backgroundImage: `linear-gradient(to bottom, ${colors.join(', ')})` };
  };

  if (entry.type === 'image' || entry.type === 'video') {
    return (
      <motion.div
        ref={cardRef}
        layoutId={`diary-card-${entry.id}`}
        className="card-base overflow-hidden p-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        {/* ✅ [수정] 터치 영역 w-6(24px), z-10 */}
        <Link href={`/diary/${entry.id}`} aria-label={`${entry.title || '일기'} 자세히 보기`} className="absolute top-0 left-0 bottom-0 w-4 z-10 cursor-pointer" scroll={false}>
            <div 
              className={`emotion-border-element h-full ${hasAnimated ? 'animate-breathe' : ''}`} 
              style={getEmotionBorderStyle()} 
            />
        </Link>
        
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-[var(--text-main)]/30 to-transparent">
                {/* ✅ [수정] 프로필 링크 추가 및 z-index 보장 */}
                <Link href={`/profile/${entry.author.name}`} className="relative z-20 flex items-center pl-2">
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--text-on-primary)]/80 overflow-hidden mr-2 flex-shrink-0">
                        <Image src={entry.author.profileImage} alt={`${entry.author.name} 프로필`} width={32} height={32} className="w-full h-full object-cover"/>
                    </div>
                    <div>
                        <p className="font-maru-buri font-bold text-[var(--text-on-primary)] text-sm leading-tight shadow-sm">{entry.author.name}</p>
                    </div>
                </Link>
                <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full text-[var(--text-on-primary)]/90 hover:bg-[var(--text-on-primary)]/20 transition-colors z-20" onClick={handleOpenOptionsMenu}>
                    <i className="ri-more-2-fill ri-lg"></i>
                </button>
            </div>
            <div className="relative w-full aspect-square bg-[var(--color-border)]">
                {entry.type === "image" && entry.imageUrl && (<Image src={entry.imageUrl} alt="게시물 이미지" fill style={{ objectFit: 'cover' }} sizes="(max-width: 600px) 100vw, 600px"/>)}
                {entry.type === "video" && entry.videoInfo && (
                <>
                    <Image src={entry.videoInfo.thumbnailImage} alt={`${entry.author}의 영상 일기 썸네일`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 600px) 100vw, 600px"/>
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--text-main)]/20">
                    <button className="w-14 h-14 flex items-center justify-center bg-[var(--color-component-bg)]/80 rounded-full cursor-pointer"><i className="ri-play-fill ri-2x text-[var(--color-primary)]"></i></button>
                    </div>
                </>
                )}
            </div>
        </div>

        <div className="relative">
            <div className="absolute inset-0 opacity-[0.15] z-0" style={getEmotionBackgroundStyle()}></div>
            <div className="relative">
                {/* ✅ [수정] 패딩 통일: py-5 pr-5 pl-6 */}
                <div className="py-5 pr-5 pl-6 backdrop-blur-sm">
                    {entry.title && <h3 className="font-gowun-dodum text-[16px] text-[var(--text-main)] mb-2">{entry.title}</h3>}
                    <p ref={contentRef} className={`text-[15px] text-[var(--text-main)] mb-4 ${isExpanded ? "" : "line-clamp-3"}`}>{entry.content}</p>
                    {showReadMore && <button onClick={toggleReadMore} className="text-[var(--text-subtle)] text-sm -mt-3 mb-3 hover:underline focus:outline-none">{isExpanded ? "간략히" : "더보기"}</button>}
                    <div className="border-t border-[var(--color-divider)] my-3"></div>
                    <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
                        <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={handleLikeToggle}><i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i><span>{currentLikes}</span></button>
                        <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={() => repliySlideHandle(entry.id)}><i className="ri-chat-3-line"></i><span>{entry.comments}</span></button>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      ref={cardRef}
      layoutId={`diary-card-${entry.id}`}
      className="card-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div className="relative">
        {/* ✅ [수정] 터치 영역 w-6(24px), z-10 */}
        <Link href={`/diary/${entry.id}`} aria-label={`${entry.title || '일기'} 자세히 보기`} className="absolute top-0 left-0 bottom-0 w-4 z-10 cursor-pointer" scroll={false}>
          <div
            className={`emotion-border-element h-full ${hasAnimated ? 'animate-breathe' : ''}`}
            style={getEmotionBorderStyle()}
          />
        </Link>
        
        <div className="relative">
            <div className="absolute inset-0 opacity-[0.15] z-0" style={getEmotionBackgroundStyle()}></div>
            <div className="relative">
                {/* ✅ [수정] 패딩 값 통일: py-5 pr-5 pl-6 */}
                <div className="py-5 pr-5 pl-6 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                        {/* ✅ [수정] 프로필 링크 추가 및 z-index 보장 */}
                        <Link href={`/profile/${entry.author.name}`} className="relative z-20 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
                                <Image src={entry.author.profileImage} alt={`${entry.author.name} 프로필`} className="w-full h-full object-cover" width={40} height={40}/>
                            </div>
                            <div>
                                <p className="font-maru-buri font-bold text-[var(--text-main)] text-[15px] leading-tight">{entry.author.name}</p>
                                <p className="text-xs text-[var(--text-subtle)]">{entry.timestamp}</p>
                            </div>
                        </Link>
                        <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-[var(--color-subtle-bg)] transition-colors z-20" onClick={handleOpenOptionsMenu}>
                            <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
                        </button>
                    </div>
                    <div className="mb-4">
                        {entry.type === 'text' && entry.title && <p className="font-maru-buri text-sm text-[var(--text-subtle)] mb-3">`&apos;`{entry.title}`&apos;`</p>}
                        {entry.type === "audio" && entry.audioInfo && (
                            <div className="bg-[var(--color-component-bg)] rounded-lg p-3 mb-4 shadow-sm border border-[var(--color-border)]">
                                {entry.title && <p className="font-gowun-dodum text-sm text-center text-[var(--text-subtle)] mb-2">{entry.title}</p>}
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
                        <p ref={contentRef} className={`text-[15px] text-[var(--text-main)] ${isExpanded ? "" : "line-clamp-4"}`}>{entry.content}</p>
                        {showReadMore && <button onClick={toggleReadMore} className="text-[var(--text-subtle)] text-sm mt-1 hover:underline focus:outline-none">{isExpanded ? "간략히" : "더보기"}</button>}
                    </div>
                    <div className="border-t border-[var(--color-divider)] my-4"></div>
                    <div className="flex items-center space-x-5 text-[var(--text-subtle)] text-sm">
                        <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={handleLikeToggle}><i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'}`}></i><span>{currentLikes}</span></button>
                        <button className="flex items-center space-x-1.5 hover:text-[var(--text-main)] transition-colors" onClick={() => repliySlideHandle(entry.id)}><i className="ri-chat-3-line"></i><span>{entry.comments}</span></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiaryCard;