import AgitDetailClient from '@/app/components/domain/agit/views/AgitDetailClientPage';
import { sampleAgitData } from '@/app/data/agitSampleData';
import AgitDetailNavigationBar from '@/app/components/domain/agit/layout/AgitDetailNavigationBar';

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

  return (
    <div className="flex flex-col h-full">
       {/* 헤더 (flex-none) */}
      <AgitDetailNavigationBar 
        agitName={agitData.name} 
      />

      {/* 콘텐츠 (flex-1 overflow-y-auto) */}
      {/* pt-14 제거 */}
      <div className="flex-1 overflow-y-auto bg-[var(--color-background)]">
        <AgitDetailClient agitData={agitData} />
      </div>
    </div>
  );
}