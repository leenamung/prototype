import AgitDetailClient from '@/app/components/domain/agit/AgitDetailClient';
import { sampleAgitData } from '@/app/data/agitSampleData';
import AgitDetailNavigationBar from '@/app/components/domain/agit/AgitDetailNavigationBar';

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
    <>
       {/* 1. 헤더 영역 */}
       {/* onMoreClick은 클라이언트 인터랙션이 필요하므로, 
           여기서 빈 함수를 넘기거나, 네비게이션 바만 Client Component로 분리해서 사용하는 패턴도 가능합니다. 
           우선은 AgitDetailClient 내부 로직과 분리된 순수 네비게이션 바 렌더링을 보여드립니다. */}
      <AgitDetailNavigationBar 
        agitName={agitData.name} 
      />

      {/* 2. 콘텐츠 영역 (pt-14) */}
      <div className="pt-14">
        <AgitDetailClient agitData={agitData} />
      </div>
    </>
  );
}