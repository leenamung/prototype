"use client";

import React, { useState, useEffect, useRef } from "react";
// 경로 수정: app/components/ 에서 app/data/ 로 이동하려면 ../data/ 를 사용합니다.
import type { DiaryEntry } from "../data/diaryEntries";
import Image from "next/image";

interface DiaryCardProps {
  entry: DiaryEntry;
  optionHandle: (entry: DiaryEntry) => void;
  repliySlideHandle: (diaryId: string) => void;
}

const DiaryCard: React.FC<DiaryCardProps> = ({
  entry,
  optionHandle,
  repliySlideHandle,
}) => {
  const [isLiked, setIsLiked] = useState(entry.isInitiallyLiked || false);
  const [currentLikes, setCurrentLikes] = useState(entry.likes);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // 오디오 재생 상태

  const contentRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false); // 옵션 메뉴 상태

  useEffect(() => {
    if (contentRef.current) {
      // "더보기" 버튼 표시 여부 결정 로직
      // 실제로는 line-clamp-3 클래스가 적용된 후 실제 넘침 여부를 판단하는 것이 더 정확합니다.
      // 이 예시에서는 내용 길이로 간소화합니다.
      if (entry.content && entry.content.length > 150) {
        setShowReadMore(true);
      } else {
        setShowReadMore(false); // 내용이 짧으면 더보기 버튼 숨김
      }
    }
  }, [entry.content]);

  // 옵션 메뉴 토글 함수
  const handleOpenOptionsMenu = () => {
    setIsOptionsMenuOpen((prev) => !prev);
    optionHandle(entry);
    // entry 파라미터는 이미 클로저를 통해 접근 가능하므로, 명시적으로 넘길 필요는 없습니다.
    // 필요하다면 console.log(entry.id) 등으로 활용 가능
  };

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
    // TODO: API 호출로 서버에 좋아요 상태 업데이트
  };

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleAudioPlay = () => {
    setIsAudioPlaying(!isAudioPlaying);
    // TODO: 실제 오디오 재생/일시정지 로직 구현
  };

  // 안전한 작성자 이름 및 프로필 이미지 접근
  const authorName = entry.author;
  const authorProfileImage = entry.profileImage;
  const placeholderImage = "https://placehold.co/40x40/E2E8F0/A0AEC0?text=U";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = placeholderImage;
  };

  const diaryTitleForAria = authorName + "의 일기";

  return (
    <div className={`relative bg-[var(--color-component-bg)] rounded-lg shadow-sm mb-4 overflow-hidden border border-[var(--color-border)] ${entry.emotionOverlayClass || ""}`}>
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--color-border)] overflow-hidden mr-3 flex-shrink-0">
              <Image src={authorProfileImage} alt={`${authorName} 프로필`} onError={handleImageError} className="w-full h-full object-cover" width={40} height={40} />
            </div>
            <div>
              <p className="font-bold text-[var(--text-main)] text-sm">
                {authorName}
              </p>
              <p className="text-xs text-[var(--text-subtle)]">
                {entry.timestamp}
              </p>
            </div>
          </div>
          <div className="relative">
            {" "}
            {/* 팝업 메뉴의 위치 기준점 */}
            <button // div 대신 button 태그 사용 권장
              className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full"
              aria-haspopup="true"
              aria-expanded={isOptionsMenuOpen}
              aria-label={`${diaryTitleForAria} 더보기 옵션`}
              onClick={handleOpenOptionsMenu} // entry를 넘길 필요 없음 (클로저로 접근 가능)
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleOpenOptionsMenu();
              }}
            >
              <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
            </button>
          </div>
        </div>

        {/* 일기 타입별 콘텐츠 렌더링 */}
        <div className="mb-3">
          {entry.type === "image" && entry.imageUrl && (
            <div className="mb-3 rounded-md overflow-hidden">
              <Image
                src={entry.imageUrl}
                alt={`${authorName}의 사진 일기`}
                width={500} // ⭐️ 원본 이미지의 너비 (비율 계산용)
                height={375} // ⭐️ 원본 이미지의 높이 (비율 계산용)
                className="w-full h-auto object-cover"
                sizes="(max-width: 640px) 100vw, 640px"
              />
            </div>
          )}

          {entry.type === "video" && entry.videoInfo && (
            <div className="mb-3 rounded-md overflow-hidden relative">
              <Image
                src={entry.videoInfo.thumbnailImage}
                alt={`${authorName}의 영상 일기 썸네일`}
                width={513}  // ⭐️ 원본 이미지의 너비 (비율 계산용)
                height={288} // ⭐️ 원본 이미지의 높이 (비율 계산용)
                className="w-full h-auto object-cover"
                sizes="(max-width: 640px) 100vw, 640px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-component-bg)]/80 rounded-full cursor-pointer">
                  <i className="ri-play-fill ri-2x text-[var(--color-primary)]"></i>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                {entry.videoInfo.duration}
              </div>
            </div>
          )}

          {entry.type === "audio" && entry.audioInfo && (
            <div className="bg-[var(--color-component-bg)] rounded-lg p-3 mb-3 shadow-sm border border-[var(--color-border)]">
              {" "}
              {/* 오디오 플레이어 배경 및 그림자 추가 */}
              <div className="flex items-center mb-2">
                <button // div 대신 button 태그 사용
                  className="w-8 h-8 flex items-center justify-center cursor-pointer bg-[var(--color-primary)] border border-[var(--color-primary-dark)] rounded-full mr-3 hover:opacity-80 transition-opacity"
                  onClick={toggleAudioPlay}
                  aria-label={
                    isAudioPlaying ? "오디오 일시정지" : "오디오 재생"
                  }
                >
                  <i
                    className={`ri-lg text-white ${
                      isAudioPlaying ? "ri-pause-fill" : "ri-play-fill"
                    }`}
                  ></i>
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
          <p
            ref={contentRef}
            className={`text-[var(--text-main)] leading-relaxed text-sm ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {entry.content}
          </p>
          {showReadMore && (
            <p
              onClick={toggleReadMore}
              className="text-[var(--color-primary)] text-xs mt-1 cursor-pointer hover:underline"
            >
              {isExpanded ? "접기" : "더보기"}
            </p>
          )}
        </div>

        {/* 하단 액션: 좋아요, 댓글 */}
        <div className="flex items-center space-x-4 text-[var(--text-subtle)]">
          <button // div 대신 button 태그 사용
            className="flex items-center cursor-pointer hover:text-[var(--color-primary)] transition-colors"
            onClick={handleLikeToggle}
            aria-label="좋아요 버튼"
          >
            <div className="w-6 h-6 flex items-center justify-center mr-1">
              <i
                className={`${
                  isLiked
                    ? "ri-heart-fill text-[var(--color-primary)]"
                    : "ri-heart-line"
                } ri-lg`}
              ></i>
            </div>
            <span className="text-xs">{currentLikes}</span>
          </button>
          <button // div 대신 button 태그 사용
            className="flex items-center cursor-pointer hover:text-[var(--color-primary)] transition-colors"
            aria-label="댓글 보기"
            onClick={() => {
              repliySlideHandle(entry.id);
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center mr-1">
              <i className="ri-chat-1-line ri-lg"></i>
            </div>
            <span className="text-xs">{entry.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;
