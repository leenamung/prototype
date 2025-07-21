// app/profile/data/profileSampleData.ts

// Interface for a user's diary entry (simplified for profile view)
export interface UserDiarySummary {
    id: string;
    date: string; // e.g., "2025년 5월 4일"
    title?: string; // Optional title for list view
    type: 'text' | 'image' | 'video' | 'audio'; // ✨ Added diary type field
    typeIcon: string; // Remixicon class, e.g., 'ri-image-line'
    emotionClass: string; // For grid view background, e.g., 'profile-emotion-blue' or 'bg-[var(--profile-emotion-blue)]'
    // For list view emotion bar
    emotionBarClass?: string; // e.g., 'bg-blue-400' or 'bg-[var(--emotion-sad)]'
  }
  
  // Interface for an agit (group/club) the user belongs to
  export interface UserAgitSummary {
    id: string;
    name: string;
    memberCount: number;
    coverImage: string; // URL for the agit's cover image
  }
  
  // Interface for the user's profile data
  export interface UserProfileData {
    name: string;
    profileImage: string;
    bio: string;
    friendCount: number;
    diaries: UserDiarySummary[];
    agits: UserAgitSummary[];
  }
  
  // Sample data for the profile page
  export const sampleUserProfileData: UserProfileData = {
    name: "김하늘",
    profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20Korean%20woman%20with%20short%20hair%2C%20natural%20makeup%2C%20friendly%20smile%2C%20bright%20lighting%2C%20professional%20headshot%2C%20isolated%20on%20soft%20background&width=200&height=200&seq=profile1&orientation=squarish",
    bio: "매일 조금씩 성장하는 중입니다. 글쓰기와 사진 찍기를 좋아해요. 여행 다니는 것도 좋아합니다. 🌱✈️📷",
    friendCount: 32,
    diaries: [
      { id: "d1", date: "2025년 5월 4일", title: "봄날의 카페 산책", type: "image", typeIcon: "ri-image-line", emotionClass: "profile-emotion-blue", emotionBarClass: "bg-[var(--emotion-sad)]" },
      { id: "d2", date: "2025년 5월 2일", title: "오늘의 작은 성취들", type: "text", typeIcon: "ri-file-text-line", emotionClass: "profile-emotion-yellow", emotionBarClass: "bg-[var(--emotion-happy)]" },
      { id: "d3", date: "2025년 4월 30일", title: "한강 벚꽃 영상", type: "video", typeIcon: "ri-vidicon-line", emotionClass: "profile-emotion-red", emotionBarClass: "bg-[var(--emotion-angry)]" },
      { id: "d4", date: "2025년 4월 28일", title: "새로운 취미 시작하기", type: "text", typeIcon: "ri-file-text-line", emotionClass: "profile-emotion-green", emotionBarClass: "bg-[var(--emotion-calm)]" },
      { id: "d5", date: "2025년 4월 25일", title: "오늘의 생각 녹음", type: "audio", typeIcon: "ri-mic-line", emotionClass: "profile-emotion-purple", emotionBarClass: "bg-[var(--emotion-anxious)]" },
      { id: "d6", date: "2025년 4월 22일", title: "제주도 푸른 바다", type: "image", typeIcon: "ri-image-line", emotionClass: "profile-emotion-blue", emotionBarClass: "bg-[var(--emotion-sad)]" },
      { id: "d7", date: "2025년 4월 19일", title: "코딩 일지 #12", type: "text", typeIcon: "ri-file-text-line", emotionClass: "profile-emotion-yellow", emotionBarClass: "bg-[var(--emotion-happy)]" },
      { id: "d8", date: "2025년 4월 16일", title: "주말 요리 기록", type: "text", typeIcon: "ri-file-text-line", emotionClass: "profile-emotion-green", emotionBarClass: "bg-[var(--emotion-calm)]" },
    ],
    agits: [
      { id: "a1", name: "책벌레들의 모임", memberCount: 28, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20book%20club%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit1&orientation=squarish" },
      { id: "a2", name: "일상 사진 공유방", memberCount: 45, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20camera%2C%20photography%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit2&orientation=squarish" },
      { id: "a3", name: "서울 카페 탐방", memberCount: 63, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20coffee%20cup%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit3&orientation=squarish" },
      { id: "a4", name: "주말 등산 모임", memberCount: 32, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20hiking%20boots%2C%20mountain%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit4&orientation=squarish" },
      { id: "a5", name: "영화 감상 일기", memberCount: 51, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20movie%20film%20reel%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit5&orientation=squarish" },
    ],
  };
  