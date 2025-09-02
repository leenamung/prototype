// app/agit/[id]/page.tsx (수정)

import AgitDetailClient from '../components/AgitDetailClient';
import { sampleAgitData } from '../data/agitSampleData';

// 데이터를 가져오는 함수
async function getAgitData(id: string) {
  console.log("요청된 아지트 ID:", id); 
  await new Promise(resolve => setTimeout(resolve, 2000));
  return sampleAgitData;
}

export default async function AgitDetailPage({ params }: { params: { id: string } }) {
  const agitData = await getAgitData(params.id);

  return (
    <AgitDetailClient agitData={agitData} />
  );
}