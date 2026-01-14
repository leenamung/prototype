"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  const [backLayerText, setBackLayerText] = useState("온전히 느껴볼까요");

  useEffect(() => {
    const phrases = ["오롯이 집중해볼까요", "온전히 느껴볼까요"];
    setBackLayerText(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

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
  const toggleVideoPlay = () => setIsVideoPlaying(!isVideoPlaying);
  const toggleAudioPlay = () => setIsAudioPlaying(!isAudioPlaying);

  const getGradientStyles = () => {
    const emotions = entry.selectedEmotions;
    if (!emotions || emotions.length === 0) {
      return {
        borderBackground: 'var(--color-border)',
        textureBackground: 'transparent',
        separatorColor: 'var(--color-border)',
        emotionColor: 'var(--color-primary)', 
      };
    }
    const borderColors = emotions.map(e => `var(--emotion-${e.key}-border, var(--color-border))`);
    const borderGradient = borderColors.length > 1 
      ? `linear-gradient(135deg, ${borderColors.join(', ')})` 
      : borderColors[0];
    const textureColors = emotions.map(e => `var(--emotion-${e.key})`);
    const textureGradient = textureColors.length > 1 
      ? `linear-gradient(135deg, ${textureColors.join(', ')})` 
      : textureColors[0];
    return {
      borderBackground: borderGradient,
      textureBackground: textureGradient,
      separatorColor: borderColors[0],
      emotionColor: `var(--emotion-${emotions[0].key})`,
    };
  };

  const styles = getGradientStyles();

  // [BackLayer] 상세 페이지 이동 버튼
  const BackLayer = () => (
    <Link 
        href={`/diary/${entry.id}`} 
        scroll={false}
        className="absolute inset-x-1 bottom-[-22px] h-full rounded-hand-drawn z-0 transform rotate-1 cursor-pointer border shadow-sm transition-transform duration-200 active:translate-y-[3px]"
        style={{ 
            background: styles.borderBackground,
            opacity: 0.6,
            borderColor: styles.separatorColor,
        }}
        aria-label="상세 페이지로 이동"
    >
        <div className="absolute inset-0 rounded-hand-drawn opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[4px] right-5 flex items-center space-x-1.5 opacity-90">
            <span className="font-maru-buri text-[11px] text-[var(--text-main)] font-bold tracking-widest">
                {backLayerText}
            </span>
            <i className="ri-arrow-right-line text-[11px] text-[var(--text-main)] mt-[1px]"></i>
        </div>
    </Link>
  );

  return (
    <div className="relative mb-10">
      <BackLayer />
      
      {/* 카드 메인 컨테이너 */}
      <div 
        className={`relative z-10 shadow-sm rounded-hand-drawn p-[2px] bg-white`}
        style={{ background: styles.borderBackground }}
      >
        <div className="relative w-full h-full bg-white rounded-hand-drawn overflow-hidden clip-radius-fix">
            {/* 질감 레이어 */}
            <div 
                className="rubbed-pastel-layer" 
                style={{ background: styles.textureBackground }} 
            />
            
            <div className="relative z-20">
                
                {/* 1. Header (프로필 & 옵션) - 이제 독립된 배경을 가짐 */}
                <div className="pt-5 px-5 flex items-start justify-between relative z-20">
                    <div className="flex items-center pointer-events-auto">
                        <Link href={`/profile/${entry.author.name}`} className="flex items-center active:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-full border border-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0 bg-white/50">
                                <Image src={entry.author.profileImage} alt={`${entry.author.name} 프로필`} className="w-full h-full object-cover" width={40} height={40}/>
                            </div>
                            <div>
                                <p className="font-maru-buri font-bold text-[var(--text-main)] text-[15px] leading-tight">{entry.author.name}</p>
                                <div className="flex items-center mt-1 opacity-70">
                                    <span className="text-xs text-[var(--text-subtle)] font-maru-buri">{entry.dateString}</span>
                                    <i className={`${entry.weatherIcon} ri-xs text-[var(--text-subtle)] ml-1.5`}></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-[var(--color-subtle-bg)] transition-colors z-20 text-[var(--text-subtle)] pointer-events-auto" onClick={handleOpenOptionsMenu}>
                        <i className="ri-more-2-fill ri-lg"></i>
                    </button>
                </div>

                {/* 2. Media (이미지 / 비디오) - 헤더 바로 아래, 좌우 여백 없음(Full Bleed) */}
                <div className="mt-4 w-full relative z-20 pointer-events-auto">
                    {/* Case A: Image */}
                    {entry.type === "image" && entry.imageUrl && (
                        <div className="w-full relative border-t border-b border-[var(--color-border)] bg-gray-50">
                            {/* aspect-ratio는 이미지 비율에 따라 유동적이거나 고정할 수 있습니다. 여기서는 원본 비율 유지를 위해 relative만 사용하거나 aspect-square 등을 쓸 수 있습니다. 
                                기존 코드처럼 aspect-square를 유지합니다. */}
                            <div className="w-full aspect-square relative">
                                <Image 
                                    src={entry.imageUrl} 
                                    alt="게시물 이미지" 
                                    fill 
                                    style={{ objectFit: 'cover' }} 
                                    sizes="(max-width: 600px) 100vw, 600px"
                                />
                            </div>
                        </div>
                    )}

                    {/* Case B: Video */}
                    {entry.type === "video" && entry.videoInfo && (
                        <div className="w-full relative border-t border-b border-[var(--color-border)] bg-black">
                             <div className="w-full aspect-video relative">
                                <Image 
                                    src={entry.videoInfo.thumbnailImage} 
                                    alt="영상 썸네일" 
                                    fill 
                                    style={{ objectFit: 'cover' }} 
                                    sizes="(max-width: 600px) 100vw, 600px"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <button 
                                        onClick={toggleVideoPlay}
                                        className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full cursor-pointer active:scale-95 transition-transform shadow-lg"
                                        aria-label={isVideoPlaying ? "비디오 일시정지" : "비디오 재생"}
                                    >
                                        <i className={`${isVideoPlaying ? "ri-pause-fill" : "ri-play-fill"} ri-xl text-[var(--text-main)] ml-`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Content (오디오 / 텍스트 / 하단 정보) */}
                <div className="pt-4 pb-4 px-5 relative z-20">
                    
                    {/* Case C: Audio (오디오는 텍스트와 함께 내부에 배치) */}
                    {entry.type === "audio" && entry.audioInfo && (
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 mb-4 shadow-sm border" style={{ borderColor: styles.separatorColor }}>
                            {entry.title && <p className="font-gowun-dodum text-sm text-center text-[var(--text-main)] mb-2">{entry.title}</p>}
                            <div className="flex items-center mb-2">
                                <button 
                                    className="w-9 h-9 flex items-center justify-center cursor-pointer bg-[var(--color-primary)] text-white rounded-full mr-3 active:opacity-80 transition-opacity shadow-sm"
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

                    {/* 텍스트 컨텐츠 */}
                    <div className="mb-2">
                        {/* 이미지/비디오가 아닌 경우에만 제목을 본문에 표시 (이미지/비디오는 시각 정보가 우선이므로) */}
                        {entry.type !== 'image' && entry.type !== 'video' && entry.title && (
                            <p className="font-gowun-dodum font-bold text-base text-[var(--text-main)] mb-3">{entry.title}</p>
                        )}
                        
                        {/* 이미지/비디오가 있을 때 제목을 표시하고 싶다면 아래 주석을 해제하거나 위치를 조정하세요 */}
                        {(entry.type === 'image' || entry.type === 'video') && entry.title && (
                             <p className="font-gowun-dodum font-bold text-base text-[var(--text-main)] mb-2">{entry.title}</p>
                        )}

                        <p ref={contentRef} className={`text-[15px] text-[var(--text-main)] leading-relaxed ${isExpanded ? "" : "line-clamp-4"}`}>{entry.content}</p>
                        
                        {showReadMore && (
                        <button onClick={toggleReadMore} className="text-[var(--text-subtle)] text-sm mt-2 p-1 -ml-1 active:opacity-60 transition-opacity relative block pointer-events-auto font-medium">
                            {isExpanded ? "간략히" : "...더 보기"}
                        </button>
                        )}
                    </div>
                    
                    {/* 구분선 */}
                    <div className="border-t my-3" style={{ borderColor: styles.separatorColor, opacity: 0.4 }}></div>

                    {/* 4. Footer (소셜 인터랙션) */}
                    <div className="flex items-center justify-between relative z-20">
                        <div className="flex items-center space-x-6 text-[var(--text-subtle)] text-sm">
                            <button className="flex items-center space-x-1.5 active:scale-90 transition-transform pointer-events-auto p-2 -ml-2" onClick={handleLikeToggle}>
                            <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'} ri-xl`}></i>
                            <span className="font-medium">{currentLikes}</span>
                            </button>
                            <button className="flex items-center space-x-1.5 active:scale-90 transition-transform pointer-events-auto p-2" onClick={() => repliySlideHandle(entry.id)}>
                            <i className="ri-chat-3-line ri-xl"></i>
                            <span className="font-medium">{entry.comments}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;