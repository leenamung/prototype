"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { DiaryEntry } from '@/app/data/diaryEntries';
import { commentEntriesData } from '@/app/data/commentEntries';
import Link from 'next/link';
import SlideFromBottomReply from '../../feed/features/Reply/SlideFromBottomReply';
import DiaryDetailNavigationBar from '../layout/DiaryDetailNavigationBar';
import FloatingOptionMenu from '../../common/FloatingOptionMenu';
import { Emotion } from '@/app/data/emotionData';

// ✨ [추가] 5가지 감정 데이터 정의
const REACTIONS = [
  { id: 'love',    icon: 'ri-heart-3-fill',       color: '#FF8585', label: '좋아요' },
  { id: 'joy',     icon: 'ri-emotion-laugh-fill', color: '#FFB946', label: '웃겨요' },
  { id: 'comfort', icon: 'ri-hand-heart-fill',    color: '#88C0D0', label: '위로해요' }, // 민지 Pick!
  { id: 'cheer',   icon: 'ri-thumb-up-fill',      color: '#A3BE8C', label: '멋져요' },
  { id: 'inspired',icon: 'ri-sparkling-2-fill',   color: '#B48EAD', label: '감동이에요' },
];

// ----------------------------------------------------------------------
// 🎛️ [디자인 설정]
// ----------------------------------------------------------------------
const SHOW_ABSTRACT_GRAPHIC = true; 
const SAMPLE_VIDEO_URL = "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4";

// 📏 [레이아웃 상수]
// 네비게이션 바 높이 (Tailwind h-14 = 56px)
const NAV_HEIGHT = 56; 
// 미디어와 네비게이션 바 사이의 여백 (Top Padding)
const MEDIA_TOP_MARGIN = 14; 
// 미디어 기본 높이 (화면의 55% 정도)
const MEDIA_HEIGHT_VH = 55; 

// ✨ [추가] headerTitle prop 추가 (page.tsx에서 받아옴)
interface DiaryDetailClientProps {
  diary: DiaryEntry;
  headerTitle?: string; 
}

// --- 미디어 컴포넌트들 (변경 없음) ---
const PhotoCarousel = ({ images }: { images: string[] }) => (
  <div className="w-full h-full overflow-x-auto snap-x snap-mandatory flex scrollbar-hide rounded-lg">
    {images.map((src, index) => (
      <div key={index} className="flex-none w-full h-full relative snap-center rounded-lg overflow-hidden">
        <Image src={src} alt={`photo-${index}`} fill className="object-cover" priority={index === 0} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none" />
      </div>
    ))}
  </div>
);

const VideoPlayer = ({ videoUrl, poster }: { videoUrl: string, poster?: string }) => (
  <div className="w-full h-full relative bg-black rounded-lg overflow-hidden">
    <video src={videoUrl} poster={poster} className="w-full h-full object-cover opacity-90" autoPlay muted loop playsInline />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 pointer-events-none" />
    <div className="absolute bottom-4 right-4">
       <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <i className="ri-volume-mute-line ri-lg"></i>
       </button>
    </div>
  </div>
);

const VoiceVisualizer = ({ emotionColor }: { emotionColor: string }) => {
  const AbstractGraphic = () => (
    <div className="w-full h-full relative overflow-hidden bg-white/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
      <div className="absolute inset-0 opacity-40" style={{ backgroundColor: emotionColor }} />
      <div className="relative w-[250px] h-[250px]">
        <div className="absolute inset-0 rounded-full blur-[50px] animate-pulse-slow opacity-60 mix-blend-multiply" style={{ backgroundColor: emotionColor, animationDuration: '4s' }} />
        <div className="absolute inset-10 rounded-full blur-[40px] animate-pulse-slow opacity-80 mix-blend-overlay" style={{ backgroundColor: '#FFFFFF', animationDuration: '3s', animationDelay: '0.5s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <button className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
          <i className="ri-play-fill text-3xl ml-1"></i>
        </button>
      </div>
    </div>
  );

  const WaveformGraphic = () => (
    <div className="w-full h-full relative bg-white/50 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center border border-white/20">
      <div className="flex items-center gap-1 h-24 z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-1.5 rounded-full animate-music-bar" style={{ backgroundColor: emotionColor, height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s`, opacity: 0.8 }} />
        ))}
      </div>
       <button className="mt-6 w-12 h-12 rounded-full bg-[var(--text-main)] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform">
          <i className="ri-play-fill text-xl ml-1"></i>
        </button>
    </div>
  );

  return SHOW_ABSTRACT_GRAPHIC ? <AbstractGraphic /> : <WaveformGraphic />;
};


// --- 메인 컴포넌트 ---
const DiaryDetailClient = ({ diary, headerTitle }: DiaryDetailClientProps) => {
  const [isReplySlideOpen, setIsReplySlideOpen] = useState(false);
  // ✨ [수정] 좋아요 상태를 '감정 상태'로 고도화
  // null = 선택 안함, string = 선택된 감정 ID
  const [selectedReaction, setSelectedReaction] = useState<string | null>(diary.isInitiallyLiked ? 'love' : null);
  const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(diary.likes);

  // ✨ [추가] 옵션 메뉴 상태 관리
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mediaLayerRef = useRef<HTMLDivElement>(null);

  const images = diary.imageUrl ? [diary.imageUrl] : [];
  const voiceEmotionColor = diary.selectedEmotions?.[0] ? `var(--emotion-${diary.selectedEmotions[0].key})` : 'var(--color-primary)';

  // ✨ [수정] 감정 선택 핸들러
  const handleReactionSelect = (reactionId: string) => {
    if (selectedReaction === reactionId) {
      // 이미 선택된 것을 누르면 취소 (Toggle Off)
      setSelectedReaction(null);
      setLikesCount(prev => prev - 1);
    } else {
      // 새로운 감정 선택 (기존에 없었으면 +1, 있었으면 변경만)
      if (!selectedReaction) {
        setLikesCount(prev => prev + 1);
      }
      setSelectedReaction(reactionId);
    }
    // 메뉴 닫기
    setIsReactionMenuOpen(false);
  };

  // 메인 버튼 클릭 핸들러
  const handleMainBtnClick = () => {
    setIsReactionMenuOpen(!isReactionMenuOpen);
  };

  // 현재 선택된 감정의 데이터 찾기
  const currentReactionData = REACTIONS.find(r => r.id === selectedReaction);

  // 그라데이션 스타일 로직
  const getGradientStyles = () => {
    const emotions = diary.selectedEmotions;
    if (!emotions || emotions.length === 0) {
      return { borderBackground: 'var(--color-border)', textureBackground: 'transparent' };
    }
    const borderColors = emotions.map(e => `var(--emotion-${e.key}-border, var(--color-border))`);
    const textureColors = emotions.map(e => `var(--emotion-${e.key})`);
    
    return {
      borderBackground: borderColors.length > 1 ? `linear-gradient(135deg, ${borderColors.join(', ')})` : borderColors[0],
      textureBackground: textureColors.length > 1 ? `linear-gradient(135deg, ${textureColors.join(', ')})` : textureColors[0],
    };
  };
  const styles = getGradientStyles();

  // 배경 앰비언트 (전체 분위기)
  const getAmbientGradientStyle = (emotions: DiaryEntry['selectedEmotions']) => {
    const colors = emotions.map(e => `var(--emotion-${e.key})`);
    if (colors.length === 0) return { backgroundColor: 'var(--color-background)' };
    return { backgroundImage: `linear-gradient(180deg, ${colors[0]}33 0%, transparent 60%)` };
  };

  // Parallax Effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    const mediaLayer = mediaLayerRef.current;
    if (!container || !mediaLayer || diary.type === 'text') return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      mediaLayer.style.transform = `translate3d(0, -${scrollTop * 0.6}px, 0)`;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [diary.type]);

  // Drag-to-Scroll 핸들러
  const handleDragStart = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const startY = e.clientY;
    const startScrollTop = container.scrollTop;
    const handleDragMove = (moveEvent: MouseEvent) => {
      container.scrollTop = startScrollTop - (moveEvent.clientY - startY);
    };
    const handleDragEnd = () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      document.body.style.userSelect = '';
    };
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
  };

  return (
    // ✨ [수정] 스크롤 컨테이너의 위치를 네비게이션 바 아래로 고정
    // mt-14 (56px): 네비 높이만큼 내림
    // h-[calc(100dvh-3.5rem)]: 전체 화면에서 네비 높이를 뺀 만큼만 스크롤 영역으로 잡음
    <div 
      ref={scrollContainerRef}
      className="relative mt-14 h-[calc(100dvh-3.5rem)] overflow-y-auto overflow-x-hidden scrollbar-hide"
    >
      {/* ✨ [추가] 네비게이션 바를 Client Component 내부로 이동 */}
      {/* fixed 위치를 잡기 위해 포탈처럼 동작하거나 상단에 고정 */}
      <DiaryDetailNavigationBar
        headerTitle={headerTitle} 
        onOptionClick={() => setIsOptionMenuOpen(true)} 
      />

      {/* 배경 앰비언트 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50" style={getAmbientGradientStyle(diary.selectedEmotions)} />

      {/* 2. Media Layer (Parallax) */}
      {/* fixed지만 z-index 0으로 뒤에 배치 */}
      {diary.type !== 'text' && (
        <div 
          ref={mediaLayerRef}
          // ✨ [수정] px-6: 미디어 영역을 텍스트보다 더 좁게 만듦
          className="fixed left-0 right-0 z-0 will-change-transform px-6"
          style={{ 
            top: NAV_HEIGHT + MEDIA_TOP_MARGIN, // 네비 아래부터 시작 + 약간의 여백
            height: `${MEDIA_HEIGHT_VH}vh` 
          }}
        >
          {/* 미디어 컨테이너 */}
          <div className="w-full h-full shadow-lg rounded-lg overflow-hidden relative">
             {diary.type === 'image' && images.length > 0 && <PhotoCarousel images={images} />}
             {diary.type === 'video' && <VideoPlayer videoUrl={SAMPLE_VIDEO_URL} poster={diary.videoInfo?.thumbnailImage} />}
             {diary.type === 'audio' && <VoiceVisualizer emotionColor={voiceEmotionColor} />}
          </div>
        </div>
      )}

      {/* 3. Content Layer (Scrolling Body) */}
      {/* ✨ [수정] px-3: 텍스트 영역을 미디어(px-6)보다 넓게 만듦 */}
      <div 
        className="relative z-10 w-full pb-32 px-3 transition-all duration-300 ease-out"
        style={{ 
          // 텍스트 카드가 시작되는 위치 계산 (스크롤 영역 내부 기준)
          // 텍스트만 있을 때: 20px
          // 미디어 있을 때: 미디어 높이 + 여백만큼 아래에서 시작
          marginTop: diary.type === 'text' 
            ? `20px` 
            : `calc(${MEDIA_HEIGHT_VH}vh + ${MEDIA_TOP_MARGIN}px + 12px)` 
        }}
      >
        
        {/* 텍스트 카드 */}
        <div 
            className="relative shadow-sm rounded-hand-drawn p-[2px]" 
            style={{ background: styles.borderBackground }}
        >
            <div className="relative w-full h-full bg-[#FFFAF0] rounded-hand-drawn overflow-hidden min-h-[60vh]">
                
                <div 
                  className="rubbed-pastel-layer absolute inset-0 opacity-50 mix-blend-multiply pointer-events-none" 
                  style={{ background: styles.textureBackground }} 
                />

                <div className="relative z-20">
                    
                    {/* ✨ [수정] 드래그 핸들 (Hover/Active 효과 제거) */}
                    <div 
                      onMouseDown={handleDragStart}
                      className="w-full flex items-center justify-center py-5 cursor-ns-resize" // group 클래스 제거
                      aria-label="스크롤 핸들"
                    >
                      {/* 순수한 형태 유지 */}
                      <div className="w-12 h-1.5 bg-[var(--color-border-dark)]/20 rounded-full" />
                    </div>

                    <div className="px-5 pb-10">
                        {/* 헤더 정보 */}
                        <div className="flex items-center justify-between text-xs text-[var(--text-subtle)] mb-4 font-medium tracking-wider opacity-80">
                            <span className="font-maru-buri">{diary.dateString}</span>
                            <i className={`${diary.weatherIcon} ri-lg text-[var(--text-subtle)]`}></i>
                        </div>

                        {diary.title && (
                            <h1 className="font-gowun-dodum text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-6 leading-snug">
                            {diary.title}
                            </h1>
                        )}

                        {/* 감정 태그 */}
                        {diary.selectedEmotions && diary.selectedEmotions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                            {diary.selectedEmotions.map((emotion: Emotion) => (
                                <span 
                                key={emotion.key}
                                className="px-2.5 py-1 rounded-full text-[11px] font-medium border text-[var(--text-subtle)] bg-white/60 backdrop-blur-sm"
                                style={{ borderColor: `var(--emotion-${emotion.key}-border, var(--color-border))` }}
                                >
                                {emotion.label || emotion.key}
                                </span>
                            ))}
                            </div>
                        )}

                        {/* 본문 */}
                        <div className="relative mb-12">
                            <p className="text-[var(--text-main)] text-[16px] leading-loose tracking-wide whitespace-pre-wrap font-pretendard text-justify break-keep">
                            {diary.content}
                            </p>
                        </div>

                        {/* 작성자 프로필 */}
                        <div className="border-t border-[var(--color-divider)] pt-6 flex justify-end">
                            <Link href={`/profile/${diary.author.name}`} className="flex items-center group opacity-80 active:opacity-100 transition-opacity">
                            <div className="text-right mr-3">
                                <span className="block font-maru-buri font-bold text-sm text-[var(--text-main)] underline-offset-4 decoration-[var(--color-primary)]">{diary.author.name}</span>
                                <span className="text-[10px] text-[var(--text-subtle)]">작가의 서재 방문하기</span>
                            </div>
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm">
                                <Image src={diary.author.profileImage} alt={diary.author.name} width={40} height={40} className="object-cover" />
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 4. 하단 인터랙션 바 (수정됨) */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        
        {/* ✨ 감정 표현 메뉴 (Gooey Expansion Effect) */}
        {/* 메뉴가 열렸을 때 뒷배경 클릭 시 닫히도록 하는 투명 레이어 */}
        {isReactionMenuOpen && (
          <div 
            className="fixed inset-0 pointer-events-auto z-40" 
            onClick={() => setIsReactionMenuOpen(false)} 
          />
        )}

        <div className="relative pointer-events-auto z-50">
          
          {/* 펼쳐지는 감정 버튼들 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end justify-center">
             {REACTIONS.map((reaction, index) => {
               const isOpen = isReactionMenuOpen;
               // 부채꼴 형태로 펼쳐지기 위한 좌표 계산
               // index 0~4. 중앙(2)을 기준으로 좌우 대칭
               const xOffset = (index - 2) * 50; // 가로 간격
               const yOffset = Math.abs(index - 2) * 10 + 60; // 중앙이 높고 양끝이 낮은 아치형 or 위로 60px 이동
               
               return (
                 <button
                   key={reaction.id}
                   onClick={() => handleReactionSelect(reaction.id)}
                   className={`absolute w-11 h-11 rounded-full bg-white shadow-lg border flex items-center justify-center transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${
                     isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
                   }`}
                   style={{
                     transform: isOpen 
                       ? `translate(calc(-50% + ${xOffset}px), -${yOffset}px)` 
                       : `translate(-50%, 0px)`, // 닫혔을 땐 중앙 하단으로 모임
                     borderColor: selectedReaction === reaction.id ? reaction.color : 'transparent',
                     zIndex: isOpen ? 50 : 0,
                   }}
                   aria-label={reaction.label}
                 >
                   <i 
                    className={`${reaction.icon} text-xl transition-transform active:scale-90`}
                    style={{ color: reaction.color }}
                   ></i>
                 </button>
               );
             })}
          </div>

          {/* 메인 인터랙션 바 (Container) */}
          <div className="h-12 px-6 flex items-center gap-6 bg-[#FFFAF0]/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/50 ring-1 ring-[var(--color-inset-border)] transition-all duration-300">
              
              {/* 감정 표현 버튼 (Trigger) */}
              <button 
                onClick={handleMainBtnClick} 
                className="flex items-center gap-2 transition-transform duration-100 active:scale-95"
                aria-label="감정 표현하기"
              >
                {/* 아이콘: 선택된 감정이 있으면 그 아이콘, 없으면 빈 하트 */}
                <i 
                  className={`text-xl transition-all duration-300 ${
                    currentReactionData 
                      ? `${currentReactionData.icon} scale-110` 
                      : `ri-heart-3-line text-[var(--text-subtle)]`
                  }`}
                  style={{ color: currentReactionData?.color }}
                ></i>
                
                {/* 숫자: 선택되면 해당 색상, 아니면 기본 색상 */}
                <span 
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: currentReactionData ? currentReactionData.color : 'var(--text-subtle)' }}
                >
                  {likesCount}
                </span>
              </button>
              
              <div className="w-px h-4 bg-[var(--color-border-dark)]/30"></div>
              
              {/* 댓글 버튼 (기존 유지) */}
              <button 
                onClick={() => setIsReplySlideOpen(true)} 
                className="flex items-center gap-2 text-[var(--text-main)] active:scale-95 transition-transform duration-100"
                aria-label="댓글 열기"
              >
                <i className="ri-chat-3-line text-xl text-[var(--text-subtle)]"></i>
                <span className="text-sm font-medium text-[var(--text-subtle)]">{diary.comments}</span>
              </button>
          </div>
        </div>
      </div>

      {isReplySlideOpen && (
        <SlideFromBottomReply diaryId={diary.id} entry={commentEntriesData} onClose={() => setIsReplySlideOpen(false)} />
      )}

      {/* ✨ [추가] Floating Option Menu */}
      {isOptionMenuOpen && (
        <FloatingOptionMenu
          entry={diary}
          onClose={() => setIsOptionMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DiaryDetailClient;