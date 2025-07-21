"use client";

import React from 'react';
import ToggleSwitch from './ToggleSwitch';

interface ExchangeDiaryOptionsProps {
  // Props for friend search, selection, cycle, notification settings
  // For simplicity, this component will be mostly static UI for now
  onFriendSearch?: (term: string) => void;
  selectedFriends?: string[]; // IDs of selected friends
  onFriendSelect?: (friendId: string) => void;
  exchangeCycle?: string;
  onCycleChange?: (cycle: string) => void;
  notificationsEnabled?: boolean;
  onNotificationToggle?: (enabled: boolean) => void;
}

const ExchangeDiaryOptions: React.FC<ExchangeDiaryOptionsProps> = (props) => {
  // Placeholder data for recent friends
  const recentFriends = [
    { id: 'f1', name: '김민지', lastInteraction: '어제' },
    { id: 'f2', name: '이서연', lastInteraction: '2일 전' },
    { id: 'f3', name: '박지현', lastInteraction: '3일 전' },
  ];
  const cycles = ['매일', '격일', '주 1회'];
  const [selectedCycle, setSelectedCycle] = React.useState<string | null>(null); // Example state for cycle

  return (
    // 카드 배경색 변경
    <div className="bg-white rounded-lg shadow-sm p-4 -mt-3 border-t border-gray-50 animate-modalShowUp">
      {/* 친구 검색 */}
      <div className="relative mb-4">
        {/* 입력 필드 배경 및 텍스트 색상 변경 */}
        <div className="flex items-center bg-[var(--color-sub-beige)] rounded-lg px-3 py-2">
          <i className="ri-search-line text-[var(--text-subtle)] mr-2 w-5 h-5 flex items-center justify-center"></i>
          <input 
            type="text" 
            placeholder="친구 검색" 
            className="w-full bg-transparent text-sm outline-none text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/70"
            onChange={(e) => props.onFriendSearch && props.onFriendSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 최근 교류한 친구 */}
      <div className="mb-4">
        {/* 제목 텍스트 색상 변경 */}
        <h4 className="text-xs text-[var(--text-subtle)] mb-2">최근 교류한 친구</h4>
        <div className="space-y-2">
          {recentFriends.map(friend => (
            <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-[var(--color-sub-beige)]/50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div> {/* Placeholder image */}
                <div>
                  {/* 친구 이름 텍스트 색상 변경 */}
                  <p className="text-sm text-[var(--text-main)]">{friend.name}</p>
                  {/* 마지막 교류 텍스트 색상 변경 */}
                  <p className="text-xs text-[var(--text-subtle)]">{friend.lastInteraction}</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                className="w-4 h-4 accent-[var(--color-primary)] rounded border-gray-300 focus:ring-1 focus:ring-[var(--color-primary)]" 
                // checked={props.selectedFriends?.includes(friend.id)}
                // onChange={() => props.onFriendSelect && props.onFriendSelect(friend.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 교환 주기 */}
      <div className="mb-2">
        {/* 제목 텍스트 색상 변경 */}
        <h4 className="text-xs text-[var(--text-subtle)] mb-2">교환 주기</h4>
        <div className="grid grid-cols-3 gap-2">
          {cycles.map(cycle => (
             <button 
                key={cycle} 
                onClick={() => setSelectedCycle(cycle)} // Example: props.onCycleChange && props.onCycleChange(cycle)
                className={`py-2 px-1 text-xs border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]
                            ${selectedCycle === cycle 
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' 
                                // 버튼 텍스트 및 테두리 색상 변경
                                : 'border-[var(--color-sub-light-gray)] text-[var(--text-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                            }`}
              >
               {cycle}
             </button>
          ))}
        </div>
      </div>

      {/* 알림 설정 */}
       <div className="flex justify-between items-center mt-3 pt-3 border-t border-[var(--color-sub-light-gray)]/50"> {/* 구분선 색상 변경 */}
            <div className="flex items-center">
                {/* 아이콘 색상 변경 */}
                <i className="ri-notification-line ri-md mr-2 text-[var(--text-subtle)]"></i>
                {/* 텍스트 색상 변경 */}
                <span className="text-sm text-[var(--text-main)]">알림 설정</span>
            </div>
            <ToggleSwitch
                id="exchange-notification-toggle" 
                checked={props.notificationsEnabled ?? true} // 기본값 true로 설정 (예시)
                onChange={(checked) => props.onNotificationToggle && props.onNotificationToggle(checked)} 
                ariaLabel="교환일기 알림 설정" 
            />
        </div>
    </div>
  );
};

export default ExchangeDiaryOptions;
