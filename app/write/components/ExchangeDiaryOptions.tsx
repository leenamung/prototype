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
    <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm p-4 -mt-3 border-x border-b border-[var(--color-border)] animate-modalShowUp">
      <div className="relative mb-4">
        <div className="flex items-center bg-[var(--color-subtle-bg)] rounded-lg px-3 py-2">
          <i className="ri-search-line text-[var(--text-subtle)] mr-2 w-5 h-5"></i>
          <input 
            type="text" 
            placeholder="친구 검색" 
            className="w-full bg-transparent text-sm outline-none text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/70"
          />
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-xs text-[var(--text-subtle)] mb-2">최근 교류한 친구</h4>
        <div className="space-y-2">
          {recentFriends.map(friend => (
            <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-[var(--color-subtle-bg)] rounded-lg cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[var(--color-border)] mr-2"></div>
                <div>
                  <p className="text-sm text-[var(--text-main)]">{friend.name}</p>
                  <p className="text-xs text-[var(--text-subtle)]">{friend.lastInteraction}</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                className="w-4 h-4 accent-[var(--color-primary)] rounded border-[var(--color-border)] focus:ring-1 focus:ring-[var(--color-primary)]" 
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <h4 className="text-xs text-[var(--text-subtle)] mb-2">교환 주기</h4>
        <div className="grid grid-cols-3 gap-2">
          {cycles.map(cycle => (
             <button 
                key={cycle} 
                onClick={() => setSelectedCycle(cycle)}
                className={`py-2 px-1 text-xs border rounded-lg transition-colors duration-150 ${selectedCycle === cycle ? 'bg-[var(--color-primary)] text-[var(--text-on-primary)] border-[var(--color-primary-dark)]' : 'border-[var(--color-border)] text-[var(--text-subtle)] hover:border-[var(--color-primary-dark)] hover:text-[var(--text-main)]'}`}
              >
               {cycle}
             </button>
          ))}
        </div>
      </div>
       <div className="flex justify-between items-center mt-3 pt-3 border-t border-[var(--color-border)]">
            <div className="flex items-center">
                <i className="ri-notification-line ri-md mr-2 text-[var(--text-subtle)]"></i>
                <span className="text-sm text-[var(--text-main)]">알림 설정</span>
            </div>
            <ToggleSwitch id="exchange-notification-toggle" checked={props.notificationsEnabled ?? true} onChange={() => {}} />
        </div>
    </div>
  );
};

export default ExchangeDiaryOptions;
