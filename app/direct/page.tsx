import DirectNavigationBar from './components/DirectNavigationBar';
import MessageList from './components/MessageList';
import { MessageThread, sampleMessageThreads } from './data/messageSampleData';
import EmptyMessageList from './components/EmptyMessageList';

export default function DirectPage() {
  const threads: MessageThread[] = sampleMessageThreads;

  return (
    <div className="pt-14">
      <DirectNavigationBar />
      
      {threads.length > 0 ? (
        <MessageList threads={threads} />
      ) : (
        <EmptyMessageList />
      )}
    </div>
  );
}