"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import DiaryCard from "./components/DiaryCard";
import { diaryEntriesData, DiaryEntry } from "./data/diaryEntries";
import FloatingOptionMenu from "./components/FloatingOptionMenu";
import SlideFromBottomReply from "./components/Comment/SlideFromBottomReply";
import { commentEntriesData } from "./data/commentEntries";
import StoryCarousel from "./components/StoryCarousel/StoryCarousel";
import EmptyFeed from "./components/EmptyFeed";

export default function FeedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplySlideOpen, setIsReplySlideOpen] = useState(false);
  
  const [entries, setEntries] = useState<DiaryEntry[]>([]); 
  const [optionMenuEntry, setOptionMenuEntry] = useState<DiaryEntry|null>(null);

  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);
  
  // 실제 앱에서는 이 부분에서 API를 호출하여 데이터를 가져옵니다.
  useEffect(() => {
    // 실제 앱에서는 API 응답에 따라 데이터가 없을 수 있습니다.
    setEntries(diaryEntriesData); // 데이터가 있을 경우
    // setEntries([]); // 데이터가 없을 경우 (테스트용)
  }, []);

  const handleOpenModal = (entry: DiaryEntry) => {setOptionMenuEntry(entry);setIsModalOpen(true)};
  const handleCloseModal = () => {setOptionMenuEntry(null);setIsModalOpen(false);};

  const handleOpenReplySlide = (diaryId: string) => {
    setSelectedDiaryId(diaryId);
    setIsReplySlideOpen(true)
  };

  const handleCloseReplySlide = () => {
    setIsReplySlideOpen(false);
    setSelectedDiaryId(null);
  };

  return (
    <div className="min-h-screen">
      <NavigationBar
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />

      <main className="pt-20 px-5 pb-5">
        <StoryCarousel />
        
        {entries.length > 0 ? (
          <div className="mt-4 space-y-4">
            {entries.map((entry) => (
              <DiaryCard 
                key={entry.id} 
                entry={entry} 
                optionHandle={handleOpenModal} 
                repliySlideHandle={handleOpenReplySlide}
              />
            ))}
          </div>
        ) : (
          <EmptyFeed />
        )}
      </main>

      {isReplySlideOpen && <SlideFromBottomReply diaryId={selectedDiaryId} entry={commentEntriesData} onClose={handleCloseReplySlide} />}
      
      {isModalOpen && <FloatingOptionMenu
        entry={optionMenuEntry}
        onClose={handleCloseModal} />}
    </div>
  );
}