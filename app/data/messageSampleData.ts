// app/direct/data/messageSampleData.ts

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'me' | 'participant';
}

export interface MessageThread {
  id: string;
  participant: {
    name: string;
    profileImage: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
  };
  unreadCount: number;
  messages: Message[];
}

export const sampleMessageThreads: MessageThread[] = [
  {
    id: 'thread-1',
    participant: { name: '김철수', profileImage: 'https://i.pravatar.cc/150?img=1' },
    lastMessage: { content: '응, 그때 보자!', timestamp: '오후 2:30' },
    unreadCount: 2,
    messages: [
      { id: 'msg1', content: '안녕! 주말에 뭐해?', sender: 'participant', timestamp: '오후 2:28' },
      { id: 'msg2', content: '나는 친구랑 영화보려구. 너는?', sender: 'me', timestamp: '오후 2:29' },
      { id: 'msg3', content: '오 좋네! 나는 그냥 집에서 쉴 것 같아.', sender: 'participant', timestamp: '오후 2:29' },
      { id: 'msg4', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg5', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg6', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg7', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg8', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg9', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg10', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg11', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg12', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg13', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg14', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg15', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg16', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
      { id: 'msg17', content: '응, 그때 보자!', sender: 'participant', timestamp: '오후 2:30' },
    ]
  },
  {
    id: 'thread-2',
    participant: { name: '박영희', profileImage: 'https://i.pravatar.cc/150?img=2' },
    lastMessage: { content: '사진 너무 잘 나왔다!', timestamp: '어제' },
    unreadCount: 0,
    messages: [
      { id: 'msg5', content: '사진 너무 잘 나왔다!', sender: 'participant', timestamp: '어제' }
    ]
  },
  {
    id: 'thread-3',
    participant: { name: '이민준', profileImage: 'https://i.pravatar.cc/150?img=3' },
    lastMessage: { content: '다음에 또 같이 프로젝트하면 좋겠다.', timestamp: '3일 전' },
    unreadCount: 0,
    messages: [
      { id: 'msg6', content: '다음에 또 같이 프로젝트하면 좋겠다.', sender: 'participant', timestamp: '3일 전' }
    ]
  },
];