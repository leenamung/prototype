// 1. 친구 추천 목록 (가로 스크롤용)
export interface RecommendedFriend {
  id: string;
  name: string;
  profileImage: string;
  reason: string; // '내 친구의 친구' 등 추천 사유
}

export const sampleRecommendedFriends: RecommendedFriend[] = [
  { id: 'rec1', name: '김민지', profileImage: 'https://i.pravatar.cc/150?img=11', reason: '내 친구의 친구' },
  { id: 'rec2', name: '이서연', profileImage: 'https://i.pravatar.cc/150?img=12', reason: '관심사 기반 추천' },
  { id: 'rec3', name: '박지현', profileImage: 'https://i.pravatar.cc/150?img=13', reason: '내 친구의 친구' },
  { id: 'rec4', name: '최유나', profileImage: 'https://i.pravatar.cc/150?img=14', reason: '관심사 기반 추천' },
  { id: 'rec5', name: '정다솜', profileImage: 'https://i.pravatar.cc/150?img=15', reason: '내 친구의 친구' },
  { id: 'rec6', name: '김민지', profileImage: 'https://i.pravatar.cc/150?img=11', reason: '내 친구의 친구' },
  { id: 'rec7', name: '이서연', profileImage: 'https://i.pravatar.cc/150?img=12', reason: '관심사 기반 추천' },
  { id: 'rec8', name: '박지현', profileImage: 'https://i.pravatar.cc/150?img=13', reason: '내 친구의 친구' },
  { id: 'rec9', name: '최유나', profileImage: 'https://i.pravatar.cc/150?img=14', reason: '관심사 기반 추천' },
  { id: 'rec10', name: '정다솜', profileImage: 'https://i.pravatar.cc/150?img=15', reason: '내 친구의 친구' },
  { id: 'rec11', name: '김민지', profileImage: 'https://i.pravatar.cc/150?img=11', reason: '내 친구의 친구' },
  { id: 'rec12', name: '이서연', profileImage: 'https://i.pravatar.cc/150?img=12', reason: '관심사 기반 추천' },
  { id: 'rec13', name: '박지현', profileImage: 'https://i.pravatar.cc/150?img=13', reason: '내 친구의 친구' },
  { id: 'rec14', name: '최유나', profileImage: 'https://i.pravatar.cc/150?img=14', reason: '관심사 기반 추천' },
  { id: 'rec15', name: '정다솜', profileImage: 'https://i.pravatar.cc/150?img=15', reason: '내 친구의 친구' },
];

// 2. 내 친구 목록
export interface Friend {
  id: string;
  name: string;
  profileImage: string;
  statusMessage: string;
}

export const sampleMyFriends: Friend[] = [
  { id: 'f1', name: '김철수', profileImage: 'https://i.pravatar.cc/150?img=1', statusMessage: '오늘 하루도 화이팅!' },
  { id: 'f2', name: '박영희', profileImage: 'https://i.pravatar.cc/150?img=2', statusMessage: '제주도 여행 중 ✈️' },
  { id: 'f3', name: '이민준', profileImage: 'https://i.pravatar.cc/150?img=3', statusMessage: '조용한 카페에서 코딩하기' },
];

// 3. 친구 요청 데이터
export interface FriendRequest {
  id: string;
  name: string;
  profileImage: string;
  timestamp: string;
}

// 3-1. 내가 보낸 요청 (상단 표시)
export const sampleSentRequests: FriendRequest[] = [
  { id: 'sent1', name: '강지민', profileImage: 'https://i.pravatar.cc/150?img=16', timestamp: '3일 전' },
];

// 3-2. 내가 받은 요청 (하단 표시)
export const sampleReceivedRequests: FriendRequest[] = [
  { id: 'rec-req1', name: '윤세아', profileImage: 'https://i.pravatar.cc/150?img=17', timestamp: '2시간 전' },
  { id: 'rec-req2', name: '백현우', profileImage: 'https://i.pravatar.cc/150?img=18', timestamp: '1일 전' },
];