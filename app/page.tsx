// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import DiaryCard from "./components/DiaryCard";
import { diaryEntriesData, DiaryEntry } from "./data/diaryEntries";
import FloatingOptionMenu from "./components/FloatingOptionMenu";
import SlideFromBottomReply from "./components/Comment/SlideFromBottomReply";
import { commentEntriesData } from "./data/commentEntries";
import StoryCarousel from "./components/StoryCarousel/StoryCarousel";

export default function FeedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplySlideOpen, setIsReplySlideOpen] = useState(false);
  
  const [entries] = useState<DiaryEntry[]>(diaryEntriesData);
  const [optionMenuEntry, setOptionMenuEntry] = useState<DiaryEntry|null>(null);

  // ⬇️ 1. 어떤 다이어리의 댓글창을 열었는지 ID를 저장할 state 추가
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);

  const handleOpenModal = (entry: DiaryEntry) => {setOptionMenuEntry(entry);setIsModalOpen(true)};
  const handleCloseModal = () => {setOptionMenuEntry(null);setIsModalOpen(false);};

  // ⬇️ 2. diaryId를 받아서 state에 저장하고, 댓글창을 열도록 함수 수정
  const handleOpenReplySlide = (diaryId: string) => {
    console.log(`${diaryId} 게시물의 댓글을 엽니다.`); // diaryId를 사용
    setSelectedDiaryId(diaryId);
    setIsReplySlideOpen(true)
  };

  // ⬇️ 3. 댓글창을 닫을 때 ID도 초기화
  const handleCloseReplySlide = () => {
    setIsReplySlideOpen(false);
    setSelectedDiaryId(null);
  };

  return (
    <div className="min-h-screen">
      <NavigationBar
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />

      <main className="pt-20 px-5 pb-5 space-y-4">
        <StoryCarousel />
        {entries.map((entry) => (
          <DiaryCard 
            key={entry.id} 
            entry={entry} 
            optionHandle={handleOpenModal} 
            repliySlideHandle={handleOpenReplySlide} // 수정된 함수 전달
          />
        ))}
      </main>

      {/* 나중에는 selectedDiaryId를 SlideFromBottomReply 컴포넌트에 넘겨주어
        해당 ID에 맞는 댓글만 불러오도록 확장할 수 있습니다.
        예: <SlideFromBottomReply diaryId={selectedDiaryId} ... />
      */}
      {isReplySlideOpen && <SlideFromBottomReply diaryId={selectedDiaryId} entry={commentEntriesData} onClose={handleCloseReplySlide} />}
      
      {isModalOpen && <FloatingOptionMenu
        entry={optionMenuEntry}
        onClose={handleCloseModal} />}
    </div>
  );
}