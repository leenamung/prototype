// app/agit/[id]/page.tsx (수정)

import AgitDetailClient from '../components/AgitDetailClient';
import { sampleAgitData } from '../data/agitSampleData';

async function getAgitData(id: string) {
  console.log("요청된 아지트 ID:", id);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return sampleAgitData;
}

interface AgitDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AgitDetailPage({ params }: AgitDetailPageProps) {
  const { id } = await params;
  
  const agitData = await getAgitData(id);

  return <AgitDetailClient agitData={agitData} />;
}