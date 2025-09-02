// app/notifications/data/notificationSampleData.ts

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'agit_invite';
  user: {
    name: string;
    profileImage: string;
  };
  content?: string; // 댓글 내용, 아지트 이름 등
  timestamp: string; // "15분 전", "3시간 전" 등
  timeGroup: 'Today' | 'This Week' | 'This Month';
  postThumbnail?: string; // 연관된 게시물 썸네일 (옵션)
}

export const sampleNotifications: Notification[] = [
  // Today
  {
    id: '1',
    type: 'like',
    user: { name: '이민준', profileImage: 'https://i.pravatar.cc/150?img=3' },
    timestamp: '15분 전',
    timeGroup: 'Today',
    postThumbnail: 'https://readdy.ai/api/search-image?query=beautiful%20sunset%20over%20the%20ocean%2C%20vibrant%20colors%2C%20peaceful%20atmosphere%2C%20serene%20beach%2C%20golden%20hour%2C%20warm%20tones%2C%20no%20people%2C%20high%20quality%20landscape%20photography&width=375&height=250&seq=4&orientation=landscape'
  },
  {
    id: '2',
    type: 'comment',
    user: { name: '박서연', profileImage: 'https://i.pravatar.cc/150?img=4' },
    content: '사진 너무 예뻐요! 어디인가요?',
    timestamp: '1시간 전',
    timeGroup: 'Today',
    postThumbnail: 'https://readdy.ai/api/search-image?query=beautiful%20sunset%20over%20the%20ocean%2C%20vibrant%20colors%2C%20peaceful%20atmosphere%2C%20serene%20beach%2C%20golden%20hour%2C%20warm%20tones%2C%20no%20people%2C%20high%20quality%20landscape%20photography&width=375&height=250&seq=4&orientation=landscape'
  },
  {
    id: '3',
    type: 'follow',
    user: { name: '최지우', profileImage: 'https://i.pravatar.cc/150?img=5' },
    timestamp: '3시간 전',
    timeGroup: 'Today',
  },
  // This Week
  {
    id: '4',
    type: 'agit_invite',
    user: { name: '김철수', profileImage: 'https://i.pravatar.cc/150?img=1' },
    content: '주말 맛집 탐험대',
    timestamp: '어제',
    timeGroup: 'This Week',
  },
  {
    id: '5',
    type: 'like',
    user: { name: '박영희', profileImage: 'https://i.pravatar.cc/150?img=2' },
    timestamp: '2일 전',
    timeGroup: 'This Week',
    postThumbnail: 'https://readdy.ai/api/search-image?query=audio%20waveform%20visualization%2C%20simple%20design%2C%20soft%20colors%2C%20minimalist%2C%20clean%20lines%2C%20abstract%20representation%20of%20sound%20waves%2C%20gentle%20gradient%2C%20centered%20composition&width=300&height=60&seq=6&orientation=landscape'
  },
  // This Month
  {
    id: '6',
    type: 'follow',
    user: { name: '정다솜', profileImage: 'https://i.pravatar.cc/150?img=6' },
    timestamp: '2주 전',
    timeGroup: 'This Month',
  },
];

// 데이터를 시간 그룹으로 묶는 헬퍼 함수
export const groupNotificationsByTime = (notifications: Notification[]) => {
  const groups: { [key: string]: Notification[] } = {
    "오늘": [],
    "이번 주": [],
    "이번 달": [],
  };

  notifications.forEach(n => {
    if (n.timeGroup === 'Today') groups['오늘'].push(n);
    else if (n.timeGroup === 'This Week') groups['이번 주'].push(n);
    else if (n.timeGroup === 'This Month') groups['이번 달'].push(n);
  });
  
  // 비어있는 그룹은 제거
  if (groups['오늘'].length === 0) delete groups['오늘'];
  if (groups['이번 주'].length === 0) delete groups['이번 주'];
  if (groups['이번 달'].length === 0) delete groups['이번 달'];

  return groups;
};