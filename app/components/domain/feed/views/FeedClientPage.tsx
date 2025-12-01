"use client";

import React, { useState } from "react";
import { DiaryEntry } from "@/app/data/diaryEntries";
import { commentEntriesData } from "@/app/data/commentEntries";
import StoryCarousel from "../features/Story/StoryCarousel";
import DiaryCard from "../features/Card/DiaryCard";
import EmptyFeed from "../ui/empty/EmptyFeed";
import SlideFromBottomReply from "../features/Reply/SlideFromBottomReply";
import FloatingOptionMenu from "../../common/FloatingOptionMenu";

interface FeedClientPageProps {
  initialEntries: DiaryEntry[];
}

export default function FeedClientPage({ initialEntries }: FeedClientPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplySlideOpen, setIsReplySlideOpen] = useState(false);
  const [entries] = useState<DiaryEntry[]>(initialEntries);
  const [optionMenuEntry, setOptionMenuEntry] = useState<DiaryEntry|null>(null);
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);

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

  const isFeedEmpty = entries.length === 0;

  return (
    <>
      <main className="px-5 py-5">
        <StoryCarousel />
        <div className="mt-4 space-y-4">
        {!isFeedEmpty? (
            entries.map((entry) => (
              <DiaryCard 
                key={entry.id} 
                entry={entry} 
                optionHandle={handleOpenModal} 
                repliySlideHandle={handleOpenReplySlide}
              />
            ))
          ) : (
            <EmptyFeed />
          )}
        </div>
      </main>

      {isReplySlideOpen && <SlideFromBottomReply diaryId={selectedDiaryId} entry={commentEntriesData} onClose={handleCloseReplySlide} />}
      
      {isModalOpen && <FloatingOptionMenu
        entry={optionMenuEntry}
        onClose={handleCloseModal} />}
    </>
  );
}