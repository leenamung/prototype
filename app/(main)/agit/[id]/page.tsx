// app/agit/[id]/page.tsx (수정)

import AgitDetailClient from '../components/AgitDetailClient';
import { sampleAgitData } from '../data/agitSampleData';

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션
async function getAgitData(id: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // 실제로는 id를 사용해 데이터를 fetch합니다.
  // ❗️피드가 비어있는 상태를 테스트하려면 feedItems를 빈 배열로 수정하세요.
  // return { ...sampleAgitData, feedItems: [] };
  console.log("요청된 아지트 ID:", id); 
  return sampleAgitData;
}

interface AgitDetailPageProps {
  params: { id: string };
}

export default async function AgitDetailPage({ params }: AgitDetailPageProps) {
  const agitData = await getAgitData(params.id);

  return (
    <div>
      <AgitDetailClient agitData={agitData} />
    </div>
  );
}