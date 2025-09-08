import ChatRoom from '../../../components/domain/direct/ChatRoom/ChatRoom';
import { sampleMessageThreads } from '../../../data/messageSampleData';

async function getThreadData(id: string) {
  console.log("요청된 채팅방 ID:", id);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return sampleMessageThreads.find(t => t.id === id);
}

interface ChatRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id } = await params;
  
  const thread = await getThreadData(id);

  if (!thread) {
    return (
      <div className="pt-14 text-center">
        <h1 className="text-lg font-semibold">오류</h1>
        <p className="text-sm text-gray-500">대화방을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return <ChatRoom thread={thread} />;
}