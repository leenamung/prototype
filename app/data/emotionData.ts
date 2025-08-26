export interface Emotion {
  key: string;   // 시스템에서 사용할 영문 키
  label: string; // 화면에 표시될 한글 이름
  color: string; // HEX 색상 코드
}

export const emotions: Emotion[] = [
    // 긍정
    { key: "happy",      label: "행복",  color: "#FFD6D6" }, 
    { key: "joy",        label: "기쁨",  color: "#FFEFBA" },
    { key: "love",       label: "사랑",  color: "#F8C8DC" }, 
    { key: "excitement", label: "설렘",  color: "#D8B5E0" }, 
    { key: "satisfied",  label: "만족",  color: "#B5EAD7" }, 
    { key: "proud",      label: "뿌듯",  color: "#A8D8B0" },
    { key: "grateful",   label: "감사",  color: "#FFE5B4" },
    { key: "hope",       label: "희망",  color: "#E2F0CB" },
    // 중립
    { key: "calm",       label: "평온",  color: "#D4F0F0" }, 
    { key: "serene",     label: "차분",  color: "#C7CEEA" }, 
    // 부정
    { key: "sad",        label: "슬픔",  color: "#B4D4E1" }, 
    { key: "miss",       label: "그리움",color: "#E6E6FA" },
    { key: "lonely",     label: "외로움",color: "#C9C9E0" }, 
    { key: "tired",      label: "지침",  color: "#C0C0C0" },
    { key: "lazy",       label: "무기력",color: "#E0E0E0" }, 
    { key: "angry",      label: "화남",  color: "#E57373" },
    { key: "anxious",    label: "불안",  color: "#BCC5D5" },
];