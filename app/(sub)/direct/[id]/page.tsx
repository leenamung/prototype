// app/direct/[id]/page.tsx (수정)

import ChatRoom from '../components/ChatRoom';
import { sampleMessageThreads } from '../data/messageSampleData';

// 데이터를 2초 뒤에 가져오는 것처럼 시뮬레이션
async function getThreadData(id: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // 실제 앱에서는 id를 사용해 해당 채팅방 데이터를 가져옵니다.
  return sampleMessageThreads.find(t => t.id === id);
}

interface ChatRoomPageProps {
  params: { id: string };
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id } = params;
  const thread = await getThreadData(id);

  if (!thread) {
    return (
        <div className="pt-14 text-center">
            <h1 className="text-lg font-semibold">오류</h1>
            <p className="text-sm text-gray-500">대화방을 찾을 수 없습니다.</p>
        </div>
    );
  }

  // 데이터 조회 후, 실제 UI 렌더링은 클라이언트 컴포넌트인 ChatRoom에 위임합니다.
  return (
    <ChatRoom thread={thread} />
  );
}