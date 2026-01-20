"use client";
import React, { useState } from 'react';
// [Import] 실제 경로에서 타입과 컴포넌트 로드
import type { DiaryEntry } from '@/app/data/diaryEntries'; 
import DiaryCard from '@/app/components/domain/feed/features/Card/DiaryCard';

interface AgitPostListProps {
  type: 'diary' | 'club';
}

export default function AgitPostList({ type }: AgitPostListProps) {
  const [activeFilter, setActiveFilter] = useState('latest');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const CLUB_TAGS = ["#책리뷰", "#질문있어요", "#가입인사", "#정모후기", "#일상"];

  // ----------------------------------------------------------------
  // 1. [Handler] DiaryCard에 넘겨줄 필수 함수들
  // ----------------------------------------------------------------
  const handleOptionClick = (entry: DiaryEntry) => {
    console.log("옵션 메뉴 클릭:", entry.id);
    // 추후 바텀시트/모달 호출 로직 연결
  };

  const handleReplyClick = (diaryId: string) => {
    console.log("댓글창 호출:", diaryId);
    // 추후 댓글 슬라이드 호출 로직 연결
  };

  // ----------------------------------------------------------------
  // 2. [Mock Data] DiaryEntry 인터페이스 완벽 준수 (Emotion에 color 없음)
  // ----------------------------------------------------------------
  const MOCK_POSTS: DiaryEntry[] = [
    {
      id: "1",
      author: {
        name: "김지은",
        profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
      },
      timestamp: "5분 전",
      dateString: "2026년 1월 20일",
      weatherIcon: "ri-sun-line",
      title: "오늘 하루...",
      content: "오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요.",
      likes: 24,
      comments: 8,
      type: 'text',
      isInitiallyLiked: false,
      selectedEmotions: [
        { key: "happy",     label: "행복"},
        { key: "grateful",  label: "감사"},
        { key: "satisfied", label: "만족"},
      ],
    },
    {
      id: "2",
      author: {
        name: "박민준",
        profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=3&orientation=squarish",
      },
      timestamp: "3시간 전",
      dateString: "2026년 1월 20일",
      weatherIcon: "ri-cloudy-2-line",
      // title 생략 (선택값)
      content: "퇴근 후 바닷가에 잠시 들렀는데, 이렇게 아름다운 일몰을 볼 수 있어서 행운이었어요. 하루의 피로가 싹 풀리는 기분이었습니다.",
      imageUrl: "https://readdy.ai/api/search-image?query=beautiful%20sunset%20over%20the%20ocean%2C%20vibrant%20colors%2C%20peaceful%20atmosphere%2C%20serene%20beach%2C%20golden%20hour%2C%20warm%20tones%2C%20no%20people%2C%20high%20quality%20landscape%20photography&width=375&height=250&seq=4&orientation=landscape",
      likes: 56,
      comments: 12,
      type: 'image',
      isInitiallyLiked: true,
      selectedEmotions: [
        { key: "calm",   label: "평온"},
        { key: "serene", label: "차분"},
      ],
    },
    {
      id: "3",
      author: {
        name: "이수연",
        profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20middle-aged%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=5&orientation=squarish",
      },
      timestamp: "어제",
      dateString: "2026년 1월 19일",
      weatherIcon: "ri-rainy-line",
      title: "아침의 생각들",
      content: "오늘 아침에 일어나서 생각한 것들을 녹음해봤어요. 가끔은 글로 쓰는 것보다 말로 표현하는 게 더 편할 때가 있더라고요...",
      likes: 18,
      comments: 5,
      type: 'audio',
      audioInfo: {
        waveformImage: "https://readdy.ai/api/search-image?query=audio%20waveform%20visualization%2C%20simple%20design%2C%20soft%20colors%2C%20minimalist%2C%20clean%20lines%2C%20abstract%20representation%20of%20sound%20waves%2C%20gentle%20gradient%2C%20centered%20composition&width=300&height=60&seq=6&orientation=landscape",
        duration: "1:24 / 3:45",
        progressWidth: "w-1/3",
      },
      isInitiallyLiked: false,
      selectedEmotions: [
        { key: "hope", label: "희망"},
      ],
    },
    {
      id: "4",
      author: {
        name: "최준호",
        profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%20with%20glasses%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=7&orientation=squarish",
      },
      timestamp: "2일 전",
      dateString: "2026년 1월 18일",
      weatherIcon: "ri-windy-line",
      title: "새로운 아지트 발견",
      content: "새로 오픈한 카페를 방문했어요. 분위기가 너무 좋아서 영상으로 남겨봤습니다.",
      likes: 42,
      comments: 15,
      type: 'video',
      videoInfo: {
        thumbnailImage: "https://readdy.ai/api/search-image?query=coffee%20shop%20interior%2C%20cozy%20atmosphere%2C%20warm%20lighting%2C%20people%20chatting%2C%20coffee%20cups%20on%20tables%2C%20urban%20cafe%20culture%2C%20lifestyle%20photography%2C%20high%20quality&width=375&height=210&seq=8&orientation=landscape",
        duration: "2:15",
      },
      isInitiallyLiked: false,
      selectedEmotions: [
          { key: "calm",       label: "평온"},
          { key: "miss",       label: "그리움"},
      ],
    },
  ];

  // ----------------------------------------------------------------
  // 🎨 [A] 교환일기: 타임라인 + DiaryCard
  // ----------------------------------------------------------------
  if (type === 'diary') {
    return (
      <div className="px-5 pt-4 pb-20 relative">
        {/* 타임라인 선 */}
        <div className="absolute left-[34px] top-0 bottom-0 w-[2px] bg-[var(--agit-diary-spine)]/20"></div>

        <div className="space-y-8">
          {MOCK_POSTS.map((post) => (
            <div key={post.id} className="relative pl-10">
              
              {/* 타임라인 점 */}
              <div className="absolute left-[9px] top-[26px] w-3 h-3 rounded-full bg-[var(--agit-diary-tag-text)] border-2 border-[var(--agit-diary-bg)] z-10"></div>
              
              {/* 날짜 헤더 (DiaryEntry의 dateString 활용) */}
              <div className="mb-3">
                 <span className="text-sm font-maru-buri font-bold text-[var(--agit-diary-tag-text)]">
                    {post.dateString}의 기록
                 </span>
              </div>
              
              {/* [Real Component] DiaryCard 렌더링 */}
              <div className="shadow-sm rounded-3xl">
                  <DiaryCard 
                    entry={post} 
                    optionHandle={handleOptionClick}
                    repliySlideHandle={handleReplyClick}
                  />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // 🎨 [B] 모임: 필터 + DiaryCard
  // ----------------------------------------------------------------
  return (
    <div className="pb-20 relative z-10">
      
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-[var(--color-border)] pt-3 pb-3 px-4 shadow-sm transition-all">
         <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
                <button onClick={() => setActiveFilter('latest')} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activeFilter === 'latest' ? 'bg-gray-800 text-white font-bold' : 'bg-gray-100 text-gray-500'}`}>최신순</button>
                <button onClick={() => setActiveFilter('popular')} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activeFilter === 'popular' ? 'bg-gray-800 text-white font-bold' : 'bg-gray-100 text-gray-500'}`}>인기순</button>
            </div>
            <button className="text-xs text-[var(--text-subtle)] flex items-center gap-1"><i className="ri-checkbox-blank-circle-line"></i> 내 글만 보기</button>
         </div>

         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button onClick={() => setActiveTag(null)} className={`flex-shrink-0 text-xs px-3 py-1 rounded-md border ${activeTag === null ? 'border-[var(--agit-club-primary)] text-[var(--agit-club-primary)] bg-[var(--agit-club-primary)]/10 font-bold' : 'border-gray-200 text-gray-500'}`}>전체</button>
            {CLUB_TAGS.map((tag) => (
                <button key={tag} onClick={() => setActiveTag(tag)} className={`flex-shrink-0 text-xs px-3 py-1 rounded-md border transition-colors ${activeTag === tag ? 'border-[var(--agit-club-primary)] text-[var(--agit-club-primary)] bg-[var(--agit-club-primary)]/10 font-bold' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>{tag}</button>
            ))}
         </div>
      </div>

      {/* 리스트 영역 */}
      <div className="px-4 py-4 space-y-6 min-h-[500px]">
          {MOCK_POSTS.map((post) => (
             <div key={post.id} className="shadow-sm rounded-3xl">
                <DiaryCard 
                  entry={post} 
                  optionHandle={handleOptionClick}
                  repliySlideHandle={handleReplyClick}
                />
             </div>
          ))}
      </div>
    </div>
  );
}