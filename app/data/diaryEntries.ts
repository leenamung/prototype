import { Emotion } from "./emotionData"; // 1. emotionData에서 EmotionOption 타입을 가져옵니다.

export interface DiaryEntry {
  id: string;
  author: { // 기존 author(string), profileImage(string)를 객체로 통합
    name: string;
    profileImage: string;
  };
  timestamp: string; // "5분 전" 등 피드용 상대 시간
  dateString: string; // "2025년 9월 26일" 등 상세 페이지용 날짜 문자열
  weatherIcon: string; // 상세 페이지 헤더용 날씨 아이콘
  title?: string; // 상세 페이지용 제목 (선택)
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  type: 'text' | 'image' | 'audio' | 'video';
  audioInfo?: {
    waveformImage: string;
    duration: string;
    progressWidth: string;
  };
  videoInfo?: {
    thumbnailImage: string;
    duration: string;
  };
  isInitiallyLiked?: boolean;
  selectedEmotions: Emotion[]; 
}

export const diaryEntriesData: DiaryEntry[] = [
  {
    id: "1",
    author: {
      name: "김지은",
      profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    },
    timestamp: "5분 전",
    dateString: "2025년 9월 26일",
    weatherIcon: "ri-sun-line",
    title: "오늘 하루...",
    content: "오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요. 오후에는 친구들과 만나서 오랜만에 수다도 떨고 맛있는 음식도 먹었어요. 이런 소소한 행복이 모여 오늘은 정말 좋은 하루였어요.오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요. 오후에는 친구들과 만나서 오랜만에 수다도 떨고 맛있는 음식도 먹었어요. 이런 소소한 행복이 모여 오늘은 정말 좋은 하루였어요.오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요. 오후에는 친구들과 만나서 오랜만에 수다도 떨고 맛있는 음식도 먹었어요. 이런 소소한 행복이 모여 오늘은 정말 좋은 하루였어요.",
    likes: 24,
    comments: 8,
    type: 'text',
    isInitiallyLiked: false,
    selectedEmotions: [
      { key: "happy",     label: "행복"},
      { key: "grateful",  label: "감사"},
      { key: "satisfied", label: "만족"},
    ],
  },
  {
    id: "2",
    author: {
      name: "박민준",
      profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=3&orientation=squarish",
    },
    timestamp: "1시간 전",
    dateString: "2025년 9월 26일",
    weatherIcon: "ri-cloudy-2-line",
    title: "아름다운 일몰",
    content: "퇴근 후 바닷가에 잠시 들렀는데, 이렇게 아름다운 일몰을 볼 수 있어서 행운이었어요. 하루의 피로가 싹 풀리는 기분이었습니다. 바다의 잔잔한 파도 소리와 함께...",
    imageUrl: "https://readdy.ai/api/search-image?query=beautiful%20sunset%20over%20the%20ocean%2C%20vibrant%20colors%2C%20peaceful%20atmosphere%2C%20serene%20beach%2C%20golden%20hour%2C%20warm%20tones%2C%20no%20people%2C%20high%20quality%20landscape%20photography&width=375&height=250&seq=4&orientation=landscape",
    likes: 56,
    comments: 12,
    type: 'image',
    isInitiallyLiked: true,
    selectedEmotions: [
      { key: "calm",   label: "평온"},
      { key: "serene", label: "차분"},
    ],
  },
  {
    id: "3",
    author: {
      name: "이수연",
      profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20middle-aged%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=5&orientation=squarish",
    },
    timestamp: "3시간 전",
    dateString: "2025년 9월 25일",
    weatherIcon: "ri-rainy-line",
    title: "아침의 생각들",
    content: "오늘 아침에 일어나서 생각한 것들을 녹음해봤어요. 가끔은 글로 쓰는 것보다 말로 표현하는 게 더 편할 때가 있더라고요...",
    likes: 18,
    comments: 5,
    type: 'audio',
    audioInfo: {
      waveformImage: "https://readdy.ai/api/search-image?query=audio%20waveform%20visualization%2C%20simple%20design%2C%20soft%20colors%2C%20minimalist%2C%20clean%20lines%2C%20abstract%20representation%20of%20sound%20waves%2C%20gentle%20gradient%2C%20centered%20composition&width=300&height=60&seq=6&orientation=landscape",
      duration: "1:24 / 3:45",
      progressWidth: "w-1/3",
    },
    isInitiallyLiked: false,
    selectedEmotions: [
      { key: "hope", label: "희망"},
    ],
  },
  {
    id: "4",
    author: {
      name: "최준호",
      profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%20with%20glasses%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=7&orientation=squarish",
    },
    timestamp: "어제",
    dateString: "2025년 9월 25일",
    weatherIcon: "ri-windy-line",
    title: "새로운 아지트 발견",
    content: "새로 오픈한 카페를 방문했어요. 분위기가 너무 좋아서 영상으로 남겨봤습니다. 커피 맛도 일품이었고, 특히 창가 자리에서 보는 뷰가...",
    likes: 42,
    comments: 15,
    type: 'video',
    videoInfo: {
      thumbnailImage: "https://readdy.ai/api/search-image?query=coffee%20shop%20interior%2C%20cozy%20atmosphere%2C%20warm%20lighting%2C%20people%20chatting%2C%20coffee%20cups%20on%20tables%2C%20urban%20cafe%20culture%2C%20lifestyle%20photography%2C%20high%20quality&width=375&height=210&seq=8&orientation=landscape",
      duration: "2:15",
    },
    isInitiallyLiked: false,
    selectedEmotions: [
        { key: "calm",       label: "평온"},
        { key: "miss",       label: "그리움"},
    ],
  },
  {
    id: "5",
    author: {
      name: "윤서현",
      profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20long%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=9&orientation=squarish",
    },
    timestamp: "어제",
    dateString: "2025년 9월 25일",
    weatherIcon: "ri-cloudy-line",
    content: "오늘은 정말 힘든 하루였어요. 회사에서 프로젝트 마감이 다가와서 야근을 했는데, 생각보다 일이 잘 풀리지 않았습니다. 하지만 동료들과 함께 고민하면서 문제를 해결해나가는 과정에서 많은 것을 배웠어요. 때로는 이런 어려운 순간들이 나를 더 성장시키는 것 같아요...",
    likes: 35,
    comments: 11,
    type: 'text',
    isInitiallyLiked: true,
    selectedEmotions: [
        { key: "tired",    label: "지침"},
        { key: "proud",    label: "뿌듯"},
    ],
  },
  {
    id: "6",
    author: {
      name: "최준호",
      profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%20with%20glasses%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=7&orientation=squarish",
    },
    timestamp: "2일 전",
    dateString: "2025년 9월 24일",
    weatherIcon: "ri-sun-line",
    title: "오늘 하늘.",
    content: "구름 한 점 없이 맑은 하늘을 보고 있으니 마음까지 깨끗해지는 기분이다.",
    imageUrl: "https://readdy.ai/api/search-image?query=beautiful%20sunset%20over%20the%20ocean%2C%20vibrant%20colors%2C%20peaceful%20atmosphere%2C%20serene%20beach%2C%20golden%20hour%2C%20warm%20tones%2C%20no%20people%2C%20high%20quality%20landscape%20photography&width=375&height=250&seq=4&orientation=landscape",
    likes: 42,
    comments: 15,
    type: 'image',
    isInitiallyLiked: false,
    selectedEmotions: [
      { key: "calm", label: "평온"},
    ],
  },
];