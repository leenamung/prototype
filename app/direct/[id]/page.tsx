import ChatRoom from '@/app/components/domain/direct/views/ChatRoomClientPage';
import { sampleMessageThreads } from '@/app/data/messageSampleData';
import ChatRoomNavigationBar from '@/app/components/domain/direct/layout/ChatRoomNavigationBar';

async function getThreadData(id: string) {
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
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-semibold">오류</h1>
          <p className="text-sm text-gray-500">대화방을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    // ✅ [수정] flex-col h-full
    <div className="flex flex-col h-full bg-[var(--color-component-bg)]">
      {/* 1. 네비게이션 바 (flex-none) */}
      <ChatRoomNavigationBar 
        participantName={thread.participant.name}
        participantImage={thread.participant.profileImage}
      />

      {/* 2. 채팅룸 콘텐츠 (flex-1) */}
      {/* fixed inset-0, pt-14, pb-16 등 모두 제거 */}
      {/* ChatRoom 컴포넌트 자체가 h-full flex flex-col 구조를 가지고 있으므로 
          flex-1 래퍼 안에 넣으면 남은 공간을 꽉 채우게 됩니다. */}
      <div className="flex-1 overflow-hidden">
        <ChatRoom thread={thread} />
      </div>
    </div>
  );
}