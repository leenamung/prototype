// app/agit/[id]/page.tsx

import AgitNavigationBar from '../components/AgitNavigationBar';
import AgitDetailClient from '../components/AgitDetailClient';
import { sampleAgitData } from '../data/agitSampleData';

// ⬇️ 1. params의 타입을 Promise<객체> 형태로 정의합니다.
interface AgitDetailPageProps {
  params: Promise<{ id: string }>;
}

// ⬇️ 2. 컴포넌트를 async 함수로 만들고, 위에서 정의한 타입을 적용합니다.
export default async function AgitDetailPage({ params }: AgitDetailPageProps) {
  
  // ⬇️ 3. await 키워드를 사용해 Promise에서 실제 params 객체를 꺼냅니다.
  const { id } = await params;

  // 'id' 변수가 사용되도록 console.log를 추가합니다. (ESLint 오류 방지)
  console.log("요청된 아지트 ID:", id); 

  // 실제 앱에서는 이 id를 사용해 데이터를 가져오게 됩니다.
  // const agitData = await fetchAgitData(id);
  const agitData = sampleAgitData; 

  return (
    <div className="pt-14"> 
      <AgitNavigationBar 
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />
      <AgitDetailClient agitData={agitData} />
    </div>
  );
}