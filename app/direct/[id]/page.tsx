// app/direct/[id]/page.tsx

import ChatRoom from '../components/ChatRoom';
import { sampleMessageThreads } from '../data/messageSampleData';

// ⬇️ 1. params의 타입을 Promise<객체> 형태로 정의합니다.
interface ChatRoomPageProps {
  params: Promise<{ id: string }>;
}

// ⬇️ 2. 컴포넌트를 async 함수로 만들고, 위에서 정의한 타입을 적용합니다.
export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  
  // ⬇️ 3. await 키워드를 사용해 Promise에서 실제 id 값을 꺼냅니다.
  const { id } = await params;

  // 실제 앱에서는 이 id를 사용해 해당 채팅방 데이터를 가져옵니다.
  const thread = sampleMessageThreads.find(t => t.id === id);

  if (!thread) {
    // ⬇️ 서버 컴포넌트에서는 useRouter를 사용할 수 없으므로, 간단한 UI로 처리합니다.
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