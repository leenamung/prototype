import ChatRoom from '../components/ChatRoom';
import { sampleMessageThreads } from '../data/messageSampleData';

interface ChatRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id } = await params;
  const thread = sampleMessageThreads.find(t => t.id === id);

  if (!thread) {
    return (
        <div className="pt-14 text-center">
            <h1 className="text-lg font-semibold text-[var(--text-main)]">오류</h1>
            <p className="text-sm text-[var(--text-subtle)]">대화방을 찾을 수 없습니다.</p>
        </div>
    );
  }

  return <ChatRoom thread={thread} />;
}