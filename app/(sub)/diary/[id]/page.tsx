import { diaryEntriesData } from "@/app/data/diaryEntries";
import DiaryDetailClient from "@/app/components/domain/diary/DiaryDetailClient";
import { commentEntriesData } from "@/app/data/commentEntries";

// 실제로는 params.id를 사용하여 DB에서 해당 일기 데이터를 가져옵니다.
async function getDiaryData(id: string) {
  console.log("요청된 일기 ID:", id);
  await new Promise(resolve => setTimeout(resolve, 1500)); // 데이터 로딩 시뮬레이션
  // 현재는 샘플 데이터의 첫 번째 항목을 반환합니다.
  const diaryEntry = diaryEntriesData.find(entry => entry.id === id) || diaryEntriesData[0];
  const comments = commentEntriesData;
  return { diaryEntry, comments };
}

interface DiaryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DiaryDetailPage({ params }: DiaryDetailPageProps) {
  const { id } = await params;
  const { diaryEntry, comments } = await getDiaryData(id);

  return <DiaryDetailClient diary={diaryEntry} initialComments={comments} />;
}