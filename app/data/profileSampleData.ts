// app/data/profileSampleData.ts
// import { Friend } from './sampleFriendData'; // Friend 타입 import 시 주석 해제 필요

// 1. mySpace의 MyDiaryEntry 인터페이스를 가져왔어요.
// 이제 프로필에서도 상세한 일기 정보를 사용할 수 있어요.
export interface MyDiaryEntry {
  id: string;
  dateString: string;
  dateObject: Date;
  shortDate?: string;
  time?: string;
  title: string;
  contentSnippet: string;
  emotion: 'happy' | 'sad' | 'angry' | 'calm' | 'anxious' | 'neutral'; // 감정 종류 확장 가능
  privacy: 'private' | 'friends' | 'group' | 'public';
  type: 'text' | 'image' | 'video' | 'audio';
  privacyIcon: string;
  typeIcon: string;
  gridEmotionClass?: string;
  calendarEmotionClass?: string;
  isToday?: boolean;
}

// UserAgitSummary 인터페이스는 그대로 유지됩니다.
export interface UserAgitSummary {
  id: string;
  name: string;
  memberCount: number;
  coverImage: string;
}

// 2. 관계 상태 타입을 추가합니다. (예시)
export type RelationshipStatus = 'none' | 'friend_request_sent' | 'friend_request_received' | 'friend' | 'self';

// 3. UserProfileData 인터페이스 확장
export interface UserProfileData {
  userId: string; // 사용자 ID 필드 추가
  name: string;
  profileImage: string;
  bio: string;
  friendCount: number;
  diaries: MyDiaryEntry[];
  agits: UserAgitSummary[]; // 사용자가 가입한 (공개된) 아지트 전체 목록
  relationshipStatus: RelationshipStatus; // 나와의 관계 상태
  mutualFriendIds?: string[]; // 함께 아는 친구 ID 목록 (옵션)
  mutualAgitIds?: string[]; // 함께 소속된 아지트 ID 목록 (옵션)
}


// MyDiaryEntry 데이터를 만들기 위한 헬퍼 함수들
const createDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day);
};

const checkIsToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

// --- 샘플 데이터 ---

// 내 프로필 데이터 (김하늘)
export const sampleMyProfileData: UserProfileData = {
  userId: "user_me_sky",
  name: "김하늘",
  profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20Korean%20woman%20with%20short%20hair%2C%20natural%20makeup%2C%20friendly%20smile%2C%20bright%20lighting%2C%20professional%20headshot%2C%20isolated%20on%20soft%20background&width=200&height=200&seq=profile1&orientation=squarish",
  bio: "매일 조금씩 성장하는 중입니다. 글쓰기와 사진 찍기를 좋아해요. 여행 다니는 것도 좋아합니다. 🌱✈️📷",
  friendCount: 32,
  relationshipStatus: 'self',
  diaries: [
    {
      id: '1', dateString: '2025년 5월 4일 일요일', dateObject: createDate(2025, 5, 4), shortDate: '5월 4일', time: '오전 10:23',
      title: '오늘의 산책, 그리고 행복한 발견', contentSnippet: '오늘은 날씨가 정말 좋아서 한강공원으로 산책을 나갔다. 벚꽃이 흩날리는 모습이 너무 예뻤고, 오랜만에 마음의 여유를 느낄 수 있었다. 강가에 앉아 책을 읽으며...',
      emotion: 'happy', privacy: 'friends', privacyIcon: 'ri-user-shared-line', type: 'text', typeIcon: 'ri-file-text-line',
      gridEmotionClass: 'bg-[var(--emotion-happy)]/15', calendarEmotionClass: 'has-diary-happy', isToday: checkIsToday(createDate(2025, 5, 4))
    },
    {
      id: '2', dateString: '2025년 5월 3일 토요일', dateObject: createDate(2025, 5, 3), shortDate: '5월 3일',
      title: '그리움의 순간들', contentSnippet: '오랜만에 옛 사진첩을 뒤적이다가 대학 시절 친구들과 찍은 사진을 발견했다. 그때는 정말 행복했는데, 지금은 다들 연락이 뜸해져서 아쉽다. 특히 민지와는...',
      emotion: 'sad', privacy: 'public', privacyIcon: 'ri-global-line', type: 'image', typeIcon: 'ri-image-line',
      gridEmotionClass: 'bg-[var(--emotion-sad)]/15', calendarEmotionClass: 'has-diary-sad', isToday: checkIsToday(createDate(2025, 5, 3))
    },
    {
      id: '3', dateString: '2025년 5월 2일 금요일', dateObject: createDate(2025, 5, 2), shortDate: '5월 2일',
      title: '명상과 차 한잔의 여유', contentSnippet: '오늘은 아침부터 명상으로 하루를 시작했다. 15분간의 명상 후 녹차 한 잔을 마시며 창밖을 바라보았다. 비가 내리는 창밖 풍경이 마음을 차분하게 해주었다...',
      emotion: 'calm', privacy: 'group', privacyIcon: 'ri-home-4-line', type: 'text', typeIcon: 'ri-file-text-line',
      gridEmotionClass: 'bg-[var(--emotion-calm)]/15', calendarEmotionClass: 'has-diary-calm', isToday: checkIsToday(createDate(2025, 5, 2))
    },
    {
      id: '4', dateString: '2025년 5월 1일 목요일', dateObject: createDate(2025, 5, 1), shortDate: '5월 1일',
      title: '오늘의 실수와 반성', contentSnippet: '프로젝트 마감일을 착각해서 팀원들에게 피해를 줬다. 내 실수로 모두가 야근을 해야 했고 정말 미안했다. 앞으로는 일정 관리를 더 철저히 해야겠다...',
      emotion: 'angry', privacy: 'private', privacyIcon: 'ri-lock-line', type: 'text', typeIcon: 'ri-file-text-line',
      gridEmotionClass: 'bg-[var(--emotion-angry)]/15', calendarEmotionClass: 'has-diary-angry', isToday: checkIsToday(createDate(2025, 5, 1))
    },
    {
      id: '5', dateString: '2025년 4월 30일 수요일', dateObject: createDate(2025, 4, 30), shortDate: '4월 30일',
      title: '발표 전날의 불안', contentSnippet: '내일 중요한 발표가 있어서 계속 연습 중이다. 잘할 수 있을지 걱정되고 밤새 불안하다. 발표 자료는 완성했지만 질문에 제대로 답할 수 있을지 걱정된다...',
      emotion: 'anxious', privacy: 'public', privacyIcon: 'ri-global-line', type: 'audio', typeIcon: 'ri-mic-line',
      gridEmotionClass: 'bg-[var(--emotion-anxious)]/15', calendarEmotionClass: 'has-diary-anxious', isToday: checkIsToday(createDate(2025, 4, 30))
    },
    {
      id: '6', dateString: '2025년 4월 29일 화요일', dateObject: createDate(2025, 4, 29), shortDate: '4월 29일',
      title: '오랜만의 친구 모임', contentSnippet: '고등학교 친구들과 5년 만에 모였다. 다들 각자의 자리에서 열심히 살고 있었고, 변한 것 없이 웃고 떠들었다. 우리의 우정은 시간이 지나도 변함없다...',
      emotion: 'happy', privacy: 'friends', privacyIcon: 'ri-user-shared-line', type: 'video', typeIcon: 'ri-video-line',
      gridEmotionClass: 'bg-[var(--emotion-happy)]/15', calendarEmotionClass: 'has-diary-happy', isToday: checkIsToday(createDate(2025, 4, 29))
    },
    {
      id: '7', dateString: '2025년 4월 28일 월요일', dateObject: createDate(2025, 4, 28), shortDate: '4월 28일',
      title: '새로운 취미, 베이킹', contentSnippet: '오늘은 처음으로 쿠키를 구워봤다. 레시피를 따라하는 것이 생각보다 어려웠지만, 완성된 쿠키의 맛이 나쁘지 않았다. 다음에는 머핀에 도전해봐야겠다...',
      emotion: 'calm', privacy: 'group', privacyIcon: 'ri-home-4-line', type: 'image', typeIcon: 'ri-image-line',
      gridEmotionClass: 'bg-[var(--emotion-calm)]/15', calendarEmotionClass: 'has-diary-calm', isToday: checkIsToday(createDate(2025, 4, 28))
    },
    {
      id: '8', dateString: '2025년 4월 27일 일요일', dateObject: createDate(2025, 4, 27), shortDate: '4월 27일',
      title: '이별 후의 생각들', contentSnippet: '이별은 언제나 힘들지만, 이번에는 유독 더 그런 것 같다. 함께 했던 시간들이 주마등처럼 스쳐 지나간다. 그 애는 잘 지내고 있을까? 문득 궁금해진다.',
      emotion: 'sad', privacy: 'private', privacyIcon: 'ri-lock-line', type: 'text', typeIcon: 'ri-file-text-line',
      gridEmotionClass: 'bg-[var(--emotion-sad)]/15', calendarEmotionClass: 'has-diary-sad', isToday: checkIsToday(createDate(2025, 4, 27))
    },
  ],
  agits: [
    { id: "a1", name: "책벌레들의 모임", memberCount: 28, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20book%20club%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit1&orientation=squarish" },
    { id: "a2", name: "일상 사진 공유방", memberCount: 45, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20camera%2C%20photography%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit2&orientation=squarish" },
    { id: "a3", name: "서울 카페 탐방", memberCount: 63, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20coffee%20cup%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit3&orientation=squarish" },
    { id: "a4", name: "주말 등산 모임", memberCount: 32, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20hiking%20boots%2C%20mountain%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit4&orientation=squarish" },
    { id: "a5", name: "영화 감상 일기", memberCount: 51, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20movie%20film%20reel%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit5&orientation=squarish" },
  ],
};

// 상대방 프로필 데이터 예시 1: 친구 (박민준)
export const sampleFriendProfileData: UserProfileData = {
  userId: "user_friend_minjun",
  name: "박민준",
  profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20friendly%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=3&orientation=squarish",
  bio: "음악과 커피를 사랑하는 개발자 ☕️🎧",
  friendCount: 58,
  relationshipStatus: 'friend',
  diaries: [
    {
      id: 'mj_diary_1', dateString: '2025년 5월 5일 월요일', dateObject: createDate(2025, 5, 5), shortDate: '5월 5일',
      title: '코딩 후 휴식', contentSnippet: '오늘은 하루종일 코딩만 했더니 머리가 아프다. 잠시 쉬면서 좋아하는 음악 듣는 중...',
      emotion: 'calm', privacy: 'friends', privacyIcon: 'ri-user-shared-line', type: 'audio', typeIcon: 'ri-mic-line',
      isToday: checkIsToday(createDate(2025, 5, 5))
    },
    {
      id: 'mj_diary_2', dateString: '2025년 5월 2일 금요일', dateObject: createDate(2025, 5, 2), shortDate: '5월 2일',
      title: '새로운 카페 발견!', contentSnippet: '동네에 새로 생긴 카페인데 분위기가 정말 좋다. 앞으로 자주 올 것 같다.',
      emotion: 'happy', privacy: 'public', privacyIcon: 'ri-global-line', type: 'image', typeIcon: 'ri-image-line',
      isToday: checkIsToday(createDate(2025, 5, 2))
    },
     {
      id: 'mj_diary_3', dateString: '2025년 4월 30일 수요일', dateObject: createDate(2025, 4, 30), shortDate: '4월 30일',
      title: '비밀 프로젝트', contentSnippet: '요즘 진행 중인 개인 프로젝트에 대한 기록... (이 일기는 비공개)',
      emotion: 'anxious', privacy: 'private', privacyIcon: 'ri-lock-line', type: 'text', typeIcon: 'ri-file-text-line',
      isToday: checkIsToday(createDate(2025, 4, 30))
    },     {
      id: 'mj_diary_4', dateString: '2025년 4월 30일 수요일', dateObject: createDate(2025, 4, 30), shortDate: '4월 30일',
      title: '비밀 프로젝트', contentSnippet: '요즘 진행 중인 개인 프로젝트에 대한 기록... (이 일기는 비공개)',
      emotion: 'anxious', privacy: 'group', privacyIcon: 'ri-lock-line', type: 'text', typeIcon: 'ri-file-text-line',
      isToday: checkIsToday(createDate(2025, 4, 30))
    },
  ],
  agits: [
    { id: "a3", name: "서울 카페 탐방", memberCount: 63, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20coffee%20cup%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit3&orientation=squarish" },
    { id: "a6", name: "함께 성장하는 코딩 스터디", memberCount: 78, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20laptop%2C%20coding%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit6&orientation=squarish"},
  ],
  mutualFriendIds: ['f3'], // 가정: 김하늘과 박민준은 'f3(이민준)'을 공통 친구로 둠
  mutualAgitIds: ['a3'], // 가정: 김하늘과 박민준은 'a3(서울 카페 탐방)' 아지트에 함께 소속됨
};

// 상대방 프로필 데이터 예시 2: 친구 아님 (이수연)
export const sampleNonFriendProfileData: UserProfileData = {
  userId: "user_nonfriend_suyeon",
  name: "이수연",
  profileImage: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20middle-aged%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=5&orientation=squarish",
  bio: "여행과 고양이를 좋아하는 집사입니다 ✈️🐈",
  friendCount: 120,
  relationshipStatus: 'none',
  diaries: [
     {
      id: 'sy_diary_1', dateString: '2025년 5월 1일 목요일', dateObject: createDate(2025, 5, 1), shortDate: '5월 1일',
      title: '고양이 낮잠', contentSnippet: '우리 냥이 자는 모습은 언제 봐도 천사같다.',
      emotion: 'happy', privacy: 'public', privacyIcon: 'ri-global-line', type: 'image', typeIcon: 'ri-image-line',
      isToday: checkIsToday(createDate(2025, 5, 1))
    },
    {
      id: 'sy_diary_2', dateString: '2025년 4월 28일 월요일', dateObject: createDate(2025, 4, 28), shortDate: '4월 28일',
      title: '친구들과의 수다', contentSnippet: '오랜만에 만난 친구들과 시간 가는 줄 모르고 이야기했다. 역시 친구가 최고!',
      emotion: 'happy', privacy: 'friends', privacyIcon: 'ri-user-shared-line', type: 'text', typeIcon: 'ri-file-text-line',
      isToday: checkIsToday(createDate(2025, 4, 28)) // 친구 공개 일기 (친구 아니므로 안 보여야 함)
    },
     {
      id: 'sy_diary_3', dateString: '2025년 4월 25일 금요일', dateObject: createDate(2025, 4, 25), shortDate: '4월 25일',
      title: '제주도 여행 계획', contentSnippet: '다음 달 제주도 여행 계획 세우는 중! 맛집 리스트업 완료!',
      emotion: 'happy', privacy: 'public', privacyIcon: 'ri-global-line', type: 'text', typeIcon: 'ri-file-text-line',
      isToday: checkIsToday(createDate(2025, 4, 25))
    },
  ],
  agits: [
    { id: "a7", name: "주말 맛집 탐험대", memberCount: 102, coverImage: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20dining%2C%20food%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=100&height=100&seq=agit7&orientation=squarish"},
  ],
  mutualFriendIds: [], // 공통 친구 없음
  mutualAgitIds: [], // 공통 아지트 없음
};

// 실제 페이지에서 사용할 데이터를 선택하는 함수 (시뮬레이션용)
export const getProfileDataForUser = (userId: string, currentUserId: string = "user_me_sky"): UserProfileData | null => {
  if (userId === currentUserId) {
    return { ...sampleMyProfileData, relationshipStatus: 'self' };
  }
  if (userId === "user_friend_minjun") {
    return { ...sampleFriendProfileData, relationshipStatus: 'friend' };
  }
  if (userId === "user_nonfriend_suyeon") {
    return { ...sampleNonFriendProfileData, relationshipStatus: 'none' };
  }
  // 필요하다면 다른 사용자 데이터 및 관계 상태 추가
  return null;
};