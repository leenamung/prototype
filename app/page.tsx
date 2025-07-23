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

  useEffect(() => {}, []);

  const handleOpenModal = (entry: DiaryEntry) => {setOptionMenuEntry(entry);setIsModalOpen(true)};
  const handleCloseModal = () => {setOptionMenuEntry(null);setIsModalOpen(false);};

  const handleOpenReplySlide = () => {setIsReplySlideOpen(true)};
  const handleCloseReplySlide = () => {setIsReplySlideOpen(false);};

  return (
    <div className="min-h-screen">
      <NavigationBar
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />

      <main className="content-area px-4">
        <StoryCarousel />
        {entries.map((entry) => (
          <DiaryCard key={entry.id} entry={entry} optionHandle={handleOpenModal} repliySlideHandle={handleOpenReplySlide} />
        ))}
      </main>
      {isReplySlideOpen && <SlideFromBottomReply entry={commentEntriesData} onClose={handleCloseReplySlide} />}
      {isModalOpen && <FloatingOptionMenu
        entry={optionMenuEntry}
        onClose={handleCloseModal} />}
    </div>
  );
}