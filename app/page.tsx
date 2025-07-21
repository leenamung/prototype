"use client";

import React, { useState, useEffect } from "react";
// 컴포넌트 가져오기 경로 수정: app/components 폴더를 기준으로 합니다.
import NavigationBar from "./components/NavigationBar";
import DiaryCard from "./components/DiaryCard";
import FloatingActionButton from "./components/FloatingActionButton";
import DiaryTypeModal from "./components/DiaryTypeModal";
import { diaryEntriesData, DiaryEntry } from "./data/diaryEntries"; // 샘플 데이터 경로 (app/data 기준)
import FloatingOptionMenu from "./components/FloatingOptionMenu";
import SlideFromBottomReply from "./components/Comment/SlideFromBottomReply";
import { commentEntriesData } from "./data/commentEntries";
import StoryCarousel from "./components/StoryCarousel/StoryCarousel";

export default function FeedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplySlideOpen, setIsReplySlideOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("전체");
  
  const [entries, setEntries] = useState<DiaryEntry[]>(diaryEntriesData);
  const [optionMenuEntry, setOptionMenuEntry] = useState<DiaryEntry|null>(null);


  useEffect(() => {
    // console.log("FeedPage mounted and diary entries are ready.");
  }, []);

  const handleOpenModal = (entry: DiaryEntry) => {setOptionMenuEntry(entry);setIsModalOpen(true)};
  const handleCloseModal = () => {setOptionMenuEntry(null);setIsModalOpen(false);};

  const handleOpenReplySlide = (diaryId: string) => {setIsReplySlideOpen(true)};
  const handleCloseReplySlide = () => {setIsReplySlideOpen(false);};

  const handleFilterChange = (filterName: string) => {
    setActiveFilter(filterName);
    console.log("Selected filter:", filterName);
    // 실제 필터링 로직 추가
    // 예:
    // const filteredEntries = diaryEntriesData.filter(entry => {
    //   if (filterName === "친구") return entry.author === "김지은"; // 예시 조건
    //   if (filterName === "아지트") return entry.type === "image"; // 예시 조건
    //   return true; // "전체" 또는 기타
    // });
    // setEntries(filteredEntries);
  };

  return (
    <div className="min-h-screen">
      <NavigationBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />

      <main className="content-area px-4">
        <StoryCarousel></StoryCarousel>
        {entries.map((entry) => (
          <DiaryCard key={entry.id} entry={entry} optionHandle={handleOpenModal} repliySlideHandle={handleOpenReplySlide} />
        ))}
      </main>
      {isReplySlideOpen && <SlideFromBottomReply entry={commentEntriesData} onClose={handleCloseReplySlide}></SlideFromBottomReply>}
      {isModalOpen && <FloatingOptionMenu
        entry={optionMenuEntry}
        onClose={handleCloseModal} />}
      {/* <FloatingActionButton onClick={handleOpenModal} />
      <DiaryTypeModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </div>
  );
}
