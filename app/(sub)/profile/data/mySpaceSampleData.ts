import { MyDiaryEntry } from "./profileSampleData";


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
