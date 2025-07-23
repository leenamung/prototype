// app/agit/[id]/page.tsx

import AgitNavigationBar from '../components/AgitNavigationBar';
import AgitDetailClient from '../components/AgitDetailClient';
import { sampleAgitData } from '../data/agitSampleData';

export default async function AgitDetailPage({ params }: { params: { id: string } }) {
  
  // params.id will be used in the future to fetch specific agit data
  console.log("Currently viewing agit with ID:", params.id);

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