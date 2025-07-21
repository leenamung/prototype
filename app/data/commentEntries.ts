export interface CommentEntry {
  id: string;
  profileImage: string;
  author: string;
  timestamp: string;
  content: string;
  imageUrl?: string; // For image diaries
  likes: number;
  comments: number; // 대댓글
  
  isInitiallyLiked?: boolean; // To set initial like state for demo
}

export const commentEntriesData: CommentEntry[] = [
  {
    id: "1",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 8,
    isInitiallyLiked: false,
  },
    {
    id: "2",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 0,
    isInitiallyLiked: false,
  },
    {
    id: "3",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 8,
    isInitiallyLiked: false,
  },
    {
    id: "4",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 8,
    isInitiallyLiked: false,
  },
    {
    id: "5",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 8,
    isInitiallyLiked: false,
  },
    {
    id: "6",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 8,
    isInitiallyLiked: false,
  },
    {
    id: "7",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 8,
    isInitiallyLiked: false,
  },
    {
    id: "8",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%20with%20short%20hair%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=2&orientation=squarish",
    author: "김지은",
    timestamp: "5분 전",
    content: "어머 좋은일이 있었구나 정말 잘된것 같아.",
    likes: 24,
    comments: 8,
    isInitiallyLiked: false,
  },
]