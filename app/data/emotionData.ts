export interface Emotion {
  key: string;   // 시스템용 키 (예: happy)
  label: string; // 표시용 이름 (예: 행복)
}

export const emotions: Emotion[] = [
    { key: "happy",      label: "행복" }, 
    { key: "joy",        label: "기쁨" },
    { key: "love",       label: "사랑" }, 
    { key: "excitement", label: "설렘" }, 
    { key: "satisfied",  label: "만족" }, 
    { key: "proud",      label: "뿌듯" },
    { key: "grateful",   label: "감사" },
    { key: "hope",       label: "희망" },
    { key: "calm",       label: "평온" }, 
    { key: "serene",     label: "차분" }, 
    { key: "sad",        label: "슬픔" }, 
    { key: "miss",       label: "그리움" },
    { key: "lonely",     label: "외로움" }, 
    { key: "tired",      label: "지침" },
    { key: "lazy",       label: "무기력" }, 
    { key: "angry",      label: "화남" },
    { key: "anxious",    label: "불안" },
];