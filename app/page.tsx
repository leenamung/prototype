import React from "react";
import { diaryEntriesData } from "@/app/data/diaryEntries";
import FeedClientPage from "@/app/components/domain/feed/FeedClientPage"; // 새로 만든 클라이언트 컴포넌트
import NavigationBar from "@/app/components/layout/NavigationBar";

// 데이터를 일부러 2초 뒤에 가져오는 것처럼 시뮬레이션합니다.
async function getDiaryEntries() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
  return diaryEntriesData;
}

export default async function FeedPage() {
  const entries = await getDiaryEntries();

  return (
    <>
      {/* 1. 헤더 영역 */}
      <NavigationBar 
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />
      
      {/* 2. 콘텐츠 영역 (헤더 높이만큼 pt-14 부여) */}
      <div className="pt-14">
        <FeedClientPage initialEntries={entries} />
      </div>
    </>
  );
}