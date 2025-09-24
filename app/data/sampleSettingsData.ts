export interface BlockedUser {
  id: string;
  name: string;
  profileImage: string;
}

export const sampleBlockedUsers: BlockedUser[] = [
  { id: 'user101', name: '김익명', profileImage: 'https://i.pravatar.cc/150?img=51' },
  { id: 'user102', name: '박테스트', profileImage: 'https://i.pravatar.cc/150?img=52' },
];