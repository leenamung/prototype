// app/data/diaryEntries.ts
// Defines the DiaryEntry interface and provides sample data.

export interface DiaryEntry {
  id: string;
  profileImage: string;
  author: string;
  timestamp: string;
  content: string;
  imageUrl?: string; // For image diaries
  likes: number;
  comments: number;
  emotionOverlayClass: string;
  type: 'text' | 'image' | 'audio' | 'video';
  audioInfo?: {
    waveformImage: string;
    duration: string;
    progressWidth: string; // e.g., "w-1/3"
  };
  videoInfo?: {
    thumbnailImage: string;
    duration: string;
  };
  isInitiallyLiked?: boolean; // To set initial like state for demo
}

export const diaryEntriesData: DiaryEntry[] = [
  {
    id: "1",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요. 오후에는 친구들과 만나서 오랜만에 수다도 떨고 맛있는 음식도 먹었어요. 이런 소소한 행복이 모여 오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요. 오후에는 친구들과 만나서 오랜만에 수다도 떨고 맛있는 음식도 먹었어요. 이런 소소한 행복이 모여 오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요. 오후에는 친구들과 만나서 오랜만에 수다도 떨고 맛있는 음식도 먹었어요. 이런 소소한 행복이 모여 오늘은 정말 좋은 하루였어요. 아침에 일어나서 오랜만에 여유롭게 커피 한 잔 마시며 책을 읽었습니다. 햇살이 정말 좋아서 기분도 좋았어요. 오후에는 친구들과 만나서 오랜만에 수다도 떨고 맛있는 음식도 먹었어요. 이런 소소한 행복이 모여",
    likes: 24,
    comments: 8,
    emotionOverlayClass: "emotion-overlay-pink",
    type: 'text',
    isInitiallyLiked: false,
  },
  {
    id: "2",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=3&orientation=squarish",
    author: "박민준",
    timestamp: "1시간 전",
    content: "퇴근 후 바닷가에 잠시 들렀는데, 이렇게 아름다운 일몰을 볼 수 있어서 행운이었어요. 하루의 피로가 싹 풀리는 기분이었습니다. 바다의 잔잔한 파도 소리와 함께...퇴근 후 바닷가에 잠시 들렀는데, 이렇게 아름다운 일몰을 볼 수 있어서 행운이었어요. 하루의 피로가 싹 풀리는 기분이었습니다. 바다의 잔잔한 파도 소리와 함께...퇴근 후 바닷가에 잠시 들렀는데, 이렇게 아름다운 일몰을 볼 수 있어서 행운이었어요. 하루의 피로가 싹 풀리는 기분이었습니다. 바다의 잔잔한 파도 소리와 함께...",
    imageUrl: "https://readdy.ai/api/search-image?query=beautiful%20sunset%20over%20the%20ocean%2C%20vibrant%20colors%2C%20peaceful%20atmosphere%2C%20serene%20beach%2C%20golden%20hour%2C%20warm%20tones%2C%20no%20people%2C%20high%20quality%20landscape%20photography&width=375&height=250&seq=4&orientation=landscape",
    likes: 56,
    comments: 12,
    emotionOverlayClass: "emotion-overlay-blue",
    type: 'image',
    isInitiallyLiked: true,
  },
  {
    id: "3",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20middle-aged%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=5&orientation=squarish",
    author: "이수연",
    timestamp: "3시간 전",
    content: "오늘 아침에 일어나서 생각한 것들을 녹음해봤어요. 가끔은 글로 쓰는 것보다 말로 표현하는 게 더 편할 때가 있더라고요...",
    likes: 18,
    comments: 5,
    emotionOverlayClass: "emotion-overlay-yellow",
    type: 'audio',
    audioInfo: {
      waveformImage: "https://readdy.ai/api/search-image?query=audio%20waveform%20visualization%2C%20simple%20design%2C%20soft%20colors%2C%20minimalist%2C%20clean%20lines%2C%20abstract%20representation%20of%20sound%20waves%2C%20gentle%20gradient%2C%20centered%20composition&width=300&height=60&seq=6&orientation=landscape",
      duration: "1:24 / 3:45",
      progressWidth: "w-1/3",
    },
    isInitiallyLiked: false,
  },
  {
    id: "4",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%20with%20glasses%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=7&orientation=squarish",
    author: "최준호",
    timestamp: "어제",
    content: "새로 오픈한 카페를 방문했어요. 분위기가 너무 좋아서 영상으로 남겨봤습니다. 커피 맛도 일품이었고, 특히 창가 자리에서 보는 뷰가...",
    likes: 42,
    comments: 15,
    emotionOverlayClass: "emotion-overlay-green",
    type: 'video',
    videoInfo: {
      thumbnailImage: "https://readdy.ai/api/search-image?query=coffee%20shop%20interior%2C%20cozy%20atmosphere%2C%20warm%20lighting%2C%20people%20chatting%2C%20coffee%20cups%20on%20tables%2C%20urban%20cafe%20culture%2C%20lifestyle%20photography%2C%20high%20quality&width=375&height=210&seq=8&orientation=landscape",
      duration: "2:15",
    },
    isInitiallyLiked: false,
  },
  {
    id: "5",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20long%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=9&orientation=squarish",
    author: "윤서현",
    timestamp: "어제",
    content: "오늘은 정말 힘든 하루였어요. 회사에서 프로젝트 마감이 다가와서 야근을 했는데, 생각보다 일이 잘 풀리지 않았습니다. 하지만 동료들과 함께 고민하면서 문제를 해결해나가는 과정에서 많은 것을 배웠어요. 때로는 이런 어려운 순간들이 나를 더 성장시키는 것 같아요...",
    likes: 35,
    comments: 11,
    emotionOverlayClass: "emotion-overlay-purple",
    type: 'text',
    isInitiallyLiked: true,
  },
];
