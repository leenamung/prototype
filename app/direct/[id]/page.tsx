import ChatRoom from '@/app/components/domain/direct/ChatRoom/ChatRoom';
import { sampleMessageThreads } from '@/app/data/messageSampleData';
import ChatRoomNavigationBar from '@/app/components/domain/direct/ChatRoom/ChatRoomNavigationBar';

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
      <div className="pt-14 text-center">
        <h1 className="text-lg font-semibold">오류</h1>
        <p className="text-sm text-gray-500">대화방을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <ChatRoomNavigationBar 
        participantName={thread.participant.name}
        participantImage={thread.participant.profileImage}
      />

      {/* ✅ [레이아웃 수정]
        - fixed inset-0: 뷰포트 전체 고정
        - pt-14: 상단 헤더 공간 확보
        - pb-16: 하단 탭 바 공간 확보 (입력창 아님! 글로벌 탭바임)
        이 공간 안에서 ChatRoom이 100% 높이를 사용합니다.
      */}
      <div className="fixed inset-0 pt-14 pb-16 bg-[var(--color-component-bg)]">
        <ChatRoom thread={thread} />
      </div>
    </>
  );
}