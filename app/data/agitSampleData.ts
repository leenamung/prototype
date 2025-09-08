// app/agit/data/agitSampleData.ts

import { Emotion } from "@/app/data/emotionData"; // ⬅️ Emotion 타입을 가져옵니다.


// Interface for a single feed item in the agit
export interface AgitFeedItem {
  id: string;
  author: {
    name: string;
    profileImage: string;
  };
  timestamp: string;
  content: string;
  imageUrl?: string; // Optional image for the feed item
  likes: number;
  comments: number;
  selectedEmotions: Emotion[];
}

// Interface for a member in the agit
export interface AgitMember {
  id: string;
  name: string;
  profileImage: string;
  joinDate: string;
  isAdmin?: boolean;
}

// Interface for the Agit (group/club) itself
export interface AgitInfo {
  id: string; // Would come from dynamic route, e.g., agit/[id]
  name: string;
  coverImage: string;
  memberCount: number;
  description: string;
  rules: string[];
  admin: {
    name: string;
    profileImage: string;
    adminSince: string;
  };
  creationDate: string;
  meetingCycle: string;
  notice?: {
    title: string;
    content: string;
  };
  feedItems: AgitFeedItem[];
  members: AgitMember[];
}

// Sample data for a single agit page
export const sampleAgitData: AgitInfo = {
  id: "bookClub123",
  name: "퇴근 후 독서 모임",
  coverImage: "https://readdy.ai/api/search-image?query=A%20cozy%20reading%20space%20with%20bookshelves%2C%20comfortable%20chairs%2C%20warm%20lighting%2C%20and%20a%20few%20books%20scattered%20on%20a%20wooden%20table.%20The%20scene%20should%20evoke%20a%20peaceful%20and%20intellectual%20atmosphere%2C%20perfect%20for%20a%20book%20club%20gathering%20after%20work.&width=375&height=150&seq=1&orientation=landscape",
  memberCount: 32,
  description: "퇴근 후 함께 책을 읽고 이야기 나누는 독서 모임입니다. 매월 한 권의 책을 선정하여 읽고, 한 달에 한 번 오프라인으로 만나 토론합니다. 바쁜 일상 속에서도 책을 통해 새로운 세계를 경험하고 다양한 관점을 나누며 함께 성장하는 것이 목표입니다.",
  rules: [
    "선정된 책은 모임 전까지 완독해 오세요.",
    "모임에 참석하지 못할 경우 최소 3일 전에 알려주세요.",
    "토론 시 다른 사람의 의견을 존중해주세요.",
    "책에 대한 다양한 해석과 의견을 환영합니다.",
    "모임 후 간단한 후기나 생각을 아지트에 공유해주세요.",
  ],
  admin: {
    name: "박준호",
    profileImage: "https://readdy.ai/api/search-image?query=Professional%20Korean%20man%20in%20his%2030s%20with%20glasses%2C%20business%20casual%20attire%2C%20confident%20expression%2C%20high%20quality%20portrait&width=48&height=48&seq=7&orientation=squarish",
    adminSince: "2023년 3월부터 관리자",
  },
  creationDate: "2023년 3월 15일",
  meetingCycle: "매월 셋째 주 토요일",
  notice: {
    title: "5월 독서 모임 일정 안내",
    content: "5월 18일 토요일 오후 3시, 강남 카페 '북소리'에서 모임이 있습니다. '김영하의 살인자의 기억법'을 읽고 오세요.",
  },
  feedItems: [
    {
      id: "feed1",
      author: {
        name: "김지연",
        profileImage: "https://readdy.ai/api/search-image?query=Professional%20Korean%20woman%20in%20her%2030s%20with%20short%20hair%2C%20simple%20portrait%20photo%20with%20neutral%20expression%2C%20high%20quality%2C%20realistic&width=40&height=40&seq=2&orientation=squarish",
      },
      timestamp: "2025년 5월 3일 · 오후 7:32",
      content: "지난 모임에서 논의했던 '김초엽의 우리가 빛의 속도로 갈 수 없다면'에 대한 제 생각을 정리해봤어요. 과학적 상상력과 인간의 감정이 어우러진 이 소설집은 SF라는 장르를 통해 현대 사회의 문제와 인간 존재의 본질을 탐구하고 있다고 느꼈습니다. 특히 '관내 분실'은 기술 발전과 인간성 상실에 대한 우려를 잘 담아냈다고 생각해요. 다른 분들은 어떻게 느끼셨나요?",
      likes: 12,
      comments: 8,
      selectedEmotions: [
        { key: "calm", label: "평온", color: "#D4F0F0" },
        { key: "serene", label: "차분", color: "#C7CEEA" },
      ],
    },
    {
      id: "feed2",
      author: {
        name: "박준호",
        profileImage: "https://readdy.ai/api/search-image?query=Korean%20man%20in%20his%2040s%20with%20glasses%2C%20casual%20style%2C%20professional%20portrait%20photo%2C%20neutral%20expression%2C%20high%20quality&width=40&height=40&seq=3&orientation=squarish",
      },
      timestamp: "2025년 5월 2일 · 오전 11:15",
      content: "다음 모임에서 읽을 책으로 '김영하의 살인자의 기억법'이 선정되었습니다. 알츠하이머에 걸린 연쇄살인범의 이야기를 통해 기억과 자아에 대한 질문을 던지는 작품입니다. 모두 5월 18일까지 읽어오시길 바랍니다.",
      imageUrl: "https://readdy.ai/api/search-image?query=Book%20cover%20of%20A%20Murderers%20Guide%20to%20Memorization%20by%20Kim%20Young-ha%2C%20Korean%20novel%2C%20professional%20book%20photography%20on%20wooden%20table%2C%20high%20quality&width=375&height=200&seq=4&orientation=landscape",
      likes: 24,
      comments: 5,
      selectedEmotions: [
        { key: "happy", label: "행복", color: "#FFD6D6" },
        { key: "excitement", label: "설렘", color: "#D8B5E0" },
      ],
    },
    {
      id: "feed3",
      author: {
        name: "이수진",
        profileImage: "https://readdy.ai/api/search-image?query=Young%20Korean%20woman%20in%20her%2020s%20with%20long%20hair%2C%20casual%20style%2C%20smiling%2C%20professional%20portrait%20photo%2C%20high%20quality&width=40&height=40&seq=5&orientation=squarish",
      },
      timestamp: "2025년 5월 1일 · 오후 6:45",
      content: "지난 모임 사진 공유합니다! 다들 열정적인 토론 감사했어요. 특히 '우리가 빛의 속도로 갈 수 없다면'에 대한 다양한 해석이 인상적이었습니다. 다음 모임도 기대돼요! 📚✨",
      imageUrl: "https://readdy.ai/api/search-image?query=Group%20of%20diverse%20Korean%20people%20in%20their%2020s-40s%20sitting%20in%20a%20cozy%20cafe%2C%20discussing%20books%2C%20coffee%20cups%20and%20books%20on%20table%2C%20warm%20lighting%2C%20candid%20moment%20of%20book%20club%20meeting&width=375&height=250&seq=6&orientation=landscape",
      likes: 31,
      comments: 12,
      selectedEmotions: [
      ],
    },
  ],
  members: [
    { id: "member1", name: "박준호", profileImage: "https://readdy.ai/api/search-image?query=Professional%20Korean%20man%20in%20his%2030s%20with%20glasses%2C%20business%20casual%20attire%2C%20confident%20expression%2C%20high%20quality%20portrait&width=40&height=40&seq=8&orientation=squarish", joinDate: "2023년 3월 15일 가입", isAdmin: true },
    { id: "member2", name: "김지연", profileImage: "https://readdy.ai/api/search-image?query=Professional%20Korean%20woman%20in%20her%2030s%20with%20short%20hair%2C%20simple%20portrait%20photo%20with%20neutral%20expression%2C%20high%20quality%2C%20realistic&width=40&height=40&seq=9&orientation=squarish", joinDate: "2023년 4월 2일 가입" },
    { id: "member3", name: "이수진", profileImage: "https://readdy.ai/api/search-image?query=Young%20Korean%20woman%20in%20her%2020s%20with%20long%20hair%2C%20casual%20style%2C%20smiling%2C%20professional%20portrait%20photo%2C%20high%20quality&width=40&height=40&seq=10&orientation=squarish", joinDate: "2023년 4월 10일 가입" },
    { id: "member4", name: "최민준", profileImage: "https://readdy.ai/api/search-image?query=Korean%20man%20in%20his%2020s%2C%20casual%20style%2C%20neutral%20expression%2C%20professional%20portrait%20photo%2C%20high%20quality&width=40&height=40&seq=11&orientation=squarish", joinDate: "2023년 5월 5일 가입" },
    { id: "member5", name: "정혜원", profileImage: "https://readdy.ai/api/search-image?query=Korean%20woman%20in%20her%2040s%2C%20professional%20look%2C%20neutral%20expression%2C%20high%20quality%20portrait%20photo&width=40&height=40&seq=12&orientation=squarish", joinDate: "2023년 6월 12일 가입" },
  ],
};
