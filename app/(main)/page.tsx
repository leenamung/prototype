import React from "react";
import { diaryEntriesData } from "../data/diaryEntries";
import FeedClientPage from "../components/FeedClientPage"; // 새로 만든 클라이언트 컴포넌트

// 데이터를 일부러 2초 뒤에 가져오는 것처럼 시뮬레이션합니다.
async function getDiaryEntries() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
  return diaryEntriesData;
}

export default async function FeedPage() {
  const entries = await getDiaryEntries();

  return <FeedClientPage initialEntries={entries} />;
}