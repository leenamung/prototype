// app/myspace/data/mySpaceSampleData.ts

// Define the structure for a diary entry
export interface MyDiaryEntry {
  id: string;
  dateString: string; // Display-friendly date string (e.g., "2025년 5월 4일 일요일")
  dateObject: Date;   // Date object for filtering and calculations
  shortDate?: string; // Short date for grid/calendar (e.g., "5월 4일" or "4")
  time?: string; // Time for list view (e.g., "오전 10:23")
  title: string;
  contentSnippet: string;
  emotion: 'happy' | 'sad' | 'angry' | 'calm' | 'anxious' | 'neutral'; // Emotion type
  privacy: 'private' | 'friends' | 'group' | 'public'; // Privacy setting
  type: 'text' | 'image' | 'video' | 'audio'; // Diary type
  privacyIcon: string; // Remixicon class name for privacy
  typeIcon: string; // Remixicon class name for type
  
  // For Grid View styling
  gridEmotionClass?: string; // Tailwind background class (e.g., 'bg-[var(--emotion-happy)]/15')
  
  // For Calendar View styling
  calendarEmotionClass?: string; // CSS class for emotion dot (e.g., 'has-diary-happy')
  isToday?: boolean; // Flag if the entry is for the current day
}

// Helper function to create Date objects (handles JS month indexing)
const createDate = (year: number, month: number, day: number): Date => {
  // JavaScript months are 0-indexed (0 = January, 11 = December)
  return new Date(year, month - 1, day); 
};

// Helper function to check if a date is today
const checkIsToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};


// Sample diary entries with updated structure (8 items restored)
export const sampleMySpaceDiaries: MyDiaryEntry[] = [
  { 
    id: '1', 
    dateString: '2025년 5월 4일 일요일', 
    dateObject: createDate(2025, 5, 4), 
    shortDate: '5월 4일',
    time: '오전 10:23', 
    title: '오늘의 산책, 그리고 행복한 발견', 
    contentSnippet: '오늘은 날씨가 정말 좋아서 한강공원으로 산책을 나갔다. 벚꽃이 흩날리는 모습이 너무 예뻤고, 오랜만에 마음의 여유를 느낄 수 있었다. 강가에 앉아 책을 읽으며...', 
    emotion: 'happy', 
    privacy: 'private', privacyIcon: 'ri-lock-line', 
    type: 'text', typeIcon: 'ri-file-text-line', 
    gridEmotionClass: 'bg-[var(--emotion-happy)]/15', 
    calendarEmotionClass: 'has-diary-happy', 
    isToday: checkIsToday(createDate(2025, 5, 4))
  },
  { 
    id: '2', 
    dateString: '2025년 5월 3일 토요일', 
    dateObject: createDate(2025, 5, 3), 
    shortDate: '5월 3일',
    title: '그리움의 순간들', 
    contentSnippet: '오랜만에 옛 사진첩을 뒤적이다가 대학 시절 친구들과 찍은 사진을 발견했다. 그때는 정말 행복했는데, 지금은 다들 연락이 뜸해져서 아쉽다. 특히 민지와는...', 
    emotion: 'sad', 
    privacy: 'friends', privacyIcon: 'ri-user-shared-line', 
    type: 'image', typeIcon: 'ri-image-line', 
    gridEmotionClass: 'bg-[var(--emotion-sad)]/15',
    calendarEmotionClass: 'has-diary-sad',
    isToday: checkIsToday(createDate(2025, 5, 3))
  },
  { 
    id: '3', 
    dateString: '2025년 5월 2일 금요일', 
    dateObject: createDate(2025, 5, 2), 
    shortDate: '5월 2일',
    title: '명상과 차 한잔의 여유', 
    contentSnippet: '오늘은 아침부터 명상으로 하루를 시작했다. 15분간의 명상 후 녹차 한 잔을 마시며 창밖을 바라보았다. 비가 내리는 창밖 풍경이 마음을 차분하게 해주었다...', 
    emotion: 'calm', 
    privacy: 'group', privacyIcon: 'ri-home-4-line', 
    type: 'text', typeIcon: 'ri-file-text-line', 
    gridEmotionClass: 'bg-[var(--emotion-calm)]/15',
    calendarEmotionClass: 'has-diary-calm',
    isToday: checkIsToday(createDate(2025, 5, 2))
  },
  { 
    id: '4', 
    dateString: '2025년 5월 1일 목요일', 
    dateObject: createDate(2025, 5, 1), 
    shortDate: '5월 1일',
    title: '오늘의 실수와 반성', 
    contentSnippet: '프로젝트 마감일을 착각해서 팀원들에게 피해를 줬다. 내 실수로 모두가 야근을 해야 했고 정말 미안했다. 앞으로는 일정 관리를 더 철저히 해야겠다...', 
    emotion: 'angry', 
    privacy: 'private', privacyIcon: 'ri-lock-line', 
    type: 'text', typeIcon: 'ri-file-text-line', 
    gridEmotionClass: 'bg-[var(--emotion-angry)]/15',
    calendarEmotionClass: 'has-diary-angry',
    isToday: checkIsToday(createDate(2025, 5, 1))
  },
  { 
    id: '5', 
    dateString: '2025년 4월 30일 수요일', 
    dateObject: createDate(2025, 4, 30), 
    shortDate: '4월 30일',
    title: '발표 전날의 불안', 
    contentSnippet: '내일 중요한 발표가 있어서 계속 연습 중이다. 잘할 수 있을지 걱정되고 밤새 불안하다. 발표 자료는 완성했지만 질문에 제대로 답할 수 있을지 걱정된다...', 
    emotion: 'anxious', 
    privacy: 'public', privacyIcon: 'ri-global-line', 
    type: 'audio', typeIcon: 'ri-mic-line', 
    gridEmotionClass: 'bg-[var(--emotion-anxious)]/15',
    calendarEmotionClass: 'has-diary-anxious',
    isToday: checkIsToday(createDate(2025, 4, 30))
  },
  { 
    id: '6', 
    dateString: '2025년 4월 29일 화요일', 
    dateObject: createDate(2025, 4, 29), 
    shortDate: '4월 29일',
    title: '오랜만의 친구 모임', 
    contentSnippet: '고등학교 친구들과 5년 만에 모였다. 다들 각자의 자리에서 열심히 살고 있었고, 변한 것 없이 웃고 떠들었다. 우리의 우정은 시간이 지나도 변함없다...', 
    emotion: 'happy', 
    privacy: 'friends', privacyIcon: 'ri-user-shared-line', 
    type: 'video', typeIcon: 'ri-video-line', 
    gridEmotionClass: 'bg-[var(--emotion-happy)]/15',
    calendarEmotionClass: 'has-diary-happy',
    isToday: checkIsToday(createDate(2025, 4, 29))
  },
  { 
    id: '7', 
    dateString: '2025년 4월 28일 월요일', 
    dateObject: createDate(2025, 4, 28), 
    shortDate: '4월 28일',
    title: '새로운 취미, 베이킹', 
    contentSnippet: '오늘은 처음으로 쿠키를 구워봤다. 레시피를 따라하는 것이 생각보다 어려웠지만, 완성된 쿠키의 맛이 나쁘지 않았다. 다음에는 머핀에 도전해봐야겠다...', 
    emotion: 'calm', 
    privacy: 'group', privacyIcon: 'ri-home-4-line', 
    type: 'image', typeIcon: 'ri-image-line', 
    gridEmotionClass: 'bg-[var(--emotion-calm)]/15',
    calendarEmotionClass: 'has-diary-calm',
    isToday: checkIsToday(createDate(2025, 4, 28))
  },
   { 
    id: '8', 
    dateString: '2025년 4월 27일 일요일', 
    dateObject: createDate(2025, 4, 27), 
    shortDate: '4월 27일',
    title: '이별 후의 생각들', 
    contentSnippet: '이별은 언제나 힘들지만, 이번에는 유독 더 그런 것 같다. 함께 했던 시간들이 주마등처럼 스쳐 지나간다. 그 애는 잘 지내고 있을까? 문득 궁금해진다.', 
    emotion: 'sad', 
    privacy: 'private', privacyIcon: 'ri-lock-line', 
    type: 'text', typeIcon: 'ri-file-text-line', 
    gridEmotionClass: 'bg-[var(--emotion-sad)]/15',
    calendarEmotionClass: 'has-diary-sad',
    isToday: checkIsToday(createDate(2025, 4, 27))
  },
];

// Helper function to map privacy filter string ('비공개') to privacy type ('private')
export const mapPrivacyStringToType = (privacyString: string): MyDiaryEntry['privacy'] | undefined => {
  switch (privacyString) {
    case '비공개': return 'private';
    case '친구 공개': return 'friends';
    case '아지트 공개': return 'group';
    case '전체 공개': return 'public';
    default: return undefined; // Handle '전체' or unknown cases
  }
};

// Helper function to map diary type filter string ('텍스트') to type type ('text')
export const mapDiaryTypeStringToType = (typeString: string): MyDiaryEntry['type'] | undefined => {
    switch (typeString) {
      case '텍스트': return 'text';
      case '사진': return 'image';
      case '영상': return 'video';
      case '음성': return 'audio';
      default: return undefined; // Handle unknown cases
    }
  };
