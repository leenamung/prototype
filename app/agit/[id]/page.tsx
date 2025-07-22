// app/agit/[id]/page.tsx

import AgitNavigationBar from '../components/AgitNavigationBar';
import AgitDetailClient from '../components/AgitDetailClient'; // 위에서 만든 클라이언트 컴포넌트
import { sampleAgitData } from '../data/agitSampleData';

// 이 페이지는 서버 컴포넌트로, URL의 params를 직접 받습니다.
export default function AgitDetailPage({ params }: { params: { id: string } }) {
  
  // 실제 앱에서는 params.id를 사용해 API로 데이터를 가져옵니다.
  // 지금은 샘플 데이터에서 ID가 일치하는 데이터를 찾는 것으로 대체합니다.
  const agitData = sampleAgitData; // id가 "bookClub123"인 샘플 데이터

  return (
    <div className="pt-14"> 
      <AgitNavigationBar 
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />
      {/* 서버 컴포넌트가 데이터(agitData)를 찾아 
        클라이언트 컴포넌트(AgitDetailClient)에 props로 전달합니다.
      */}
      <AgitDetailClient agitData={agitData} />
    </div>
  );
}