"use client";
import React, { useState, useRef, useEffect } from 'react';

// [Type] 친구 데이터
interface Friend {
  id: number;
  name: string;
  profileImg?: string; 
}

interface ExchangeGroup {
  id: number;
  name: string;
  members: number;
  lastUpdate: string;
}

// [Mock Data]
const myFriends: Friend[] = Array.from({ length: 15 }).map((_, i) => ({
  id: 100 + i,
  name: i === 0 ? "김민지" : i === 1 ? "이서연" : i === 2 ? "박준형" : `친구 ${i + 1}`,
}));

const ExchangeDiaryOptions = () => {
  const [groups, setGroups] = useState<ExchangeGroup[]>([
    { id: 1, name: "앙주와 비밀친구들", members: 3, lastUpdate: "2일 전" },
    { id: 2, name: "카페 알바 동기", members: 2, lastUpdate: "오늘" },
    { id: 3, name: "스터디 그룹", members: 5, lastUpdate: "어제" }, // 스크롤 테스트용 데이터 추가
    { id: 4, name: "가족 일기장", members: 4, lastUpdate: "1주 전" },
  ]);

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 교환일기 검색용
  const [friendSearchQuery, setFriendSearchQuery] = useState(""); // 친구 검색용
  const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([]);
  
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreating && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isCreating]);

  // 교환일기 검색 필터링
  const filteredGroups = groups.filter(group => 
    group.name.includes(searchQuery)
  );

  // 친구 검색 필터링
  const filteredFriends = myFriends.filter(friend => 
    friend.name.includes(friendSearchQuery)
  );

  const toggleFriend = (id: number) => {
    setSelectedFriendIds(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!newGroupName.trim()) return;

    const newId = Date.now();
    const newGroup: ExchangeGroup = {
      id: newId,
      name: newGroupName,
      members: selectedFriendIds.length + 1,
      lastUpdate: "방금",
    };

    setGroups([newGroup, ...groups]); // 새 그룹을 맨 앞에 추가
    setSelectedGroupId(newId);
    
    setIsCreating(false);
    setNewGroupName("");
    setFriendSearchQuery("");
    setSelectedFriendIds([]);
  };

  return (
    <div className="animate-fadeIn mt-2 px-1">
       {/* 상단 안내 */}
       <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-gowun-dodum text-[var(--color-primary)]">
            어떤 교환일기에 남길까요?
          </span>
       </div>

       <div className="flex flex-col gap-3">
          
          {/* 1. 새 만들기 버튼 / 생성 폼 (항상 최상단에 위치) */}
          {isCreating ? (
            <div className="w-full bg-white rounded-[24px] border border-[var(--color-primary)] shadow-md overflow-hidden animate-slideUpFade flex flex-col mb-2">
                {/* 이름 입력 */}
                <div className="p-4 border-b border-[var(--color-border)]/50 bg-[var(--color-primary)]/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[14px] bg-white text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 shadow-sm">
                            <i className="ri-pencil-fill ri-lg"></i>
                        </div>
                        <input 
                            ref={nameInputRef}
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="일기장 이름을 지어주세요"
                            className="flex-1 bg-transparent border-none outline-none text-base font-maru-buri font-bold placeholder:font-gowun-dodum placeholder:text-[var(--text-subtle)]/50 text-[var(--text-main)]"
                        />
                    </div>
                </div>

                {/* 친구 검색 및 리스트 */}
                <div className="flex-1 bg-white flex flex-col">
                    <div className="px-4 py-3 border-b border-[var(--color-border)]/30">
                        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-subtle-bg)] rounded-xl">
                            <i className="ri-search-line text-[var(--text-subtle)]"></i>
                            <input 
                                type="text"
                                value={friendSearchQuery}
                                onChange={(e) => setFriendSearchQuery(e.target.value)}
                                placeholder="친구 이름 검색..."
                                className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--text-main)] placeholder:text-[var(--text-subtle)]"
                            />
                        </div>
                    </div>
                    <div className="h-[180px] overflow-y-auto p-2 scrollbar-hide">
                        {filteredFriends.map((friend) => {
                            const isSelected = selectedFriendIds.includes(friend.id);
                            return (
                                <div key={friend.id} onClick={() => toggleFriend(friend.id)} className={`flex items-center justify-between p-2.5 rounded-[16px] cursor-pointer transition-colors mb-1 ${isSelected ? 'bg-[var(--color-primary)]/10' : 'hover:bg-[var(--color-subtle-bg)]/50'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border ${isSelected ? 'border-[var(--color-primary)] bg-white' : 'border-[var(--color-border)] bg-[var(--color-subtle-bg)] text-[var(--text-subtle)]'}`}>
                                            <i className="ri-user-3-fill"></i>
                                        </div>
                                        <span className={`text-sm font-medium ${isSelected ? 'text-[var(--color-primary-dark)]' : 'text-[var(--text-main)]'}`}>{friend.name}</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'border-[var(--color-border)] bg-white'}`}>
                                        {isSelected && <i className="ri-check-line text-white text-xs"></i>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="p-3 bg-[var(--color-subtle-bg)]/30 flex items-center justify-between border-t border-[var(--color-border)]/30">
                    <button onClick={() => setIsCreating(false)} className="px-4 py-2 text-xs font-bold text-[var(--text-subtle)] hover:text-[var(--text-main)]">취소</button>
                    <button onClick={handleCreate} disabled={!newGroupName.trim()} className={`px-5 py-2.5 rounded-[14px] text-xs font-bold text-white shadow-sm flex items-center gap-1.5 ${!newGroupName.trim() ? 'bg-[var(--color-border)] opacity-70' : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'}`}>
                        <span>{selectedFriendIds.length > 0 ? `${selectedFriendIds.length}명과 만들기` : '나 혼자 만들기'}</span><i className="ri-arrow-right-s-line"></i>
                    </button>
                </div>
            </div>
          ) : (
            // [Sticky Top Button] 새 만들기 버튼을 리스트 위에 배치
            <button 
                onClick={() => setIsCreating(true)}
                className="w-full p-4 border-2 border-dashed border-[var(--color-border)] rounded-[20px] 
                           flex items-center justify-center gap-2 text-[var(--text-subtle)] 
                           hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 
                           active:scale-[0.98] transition-all duration-200 group min-h-[60px]"
            >
                <div className="w-6 h-6 rounded-full bg-[var(--color-subtle-bg)] group-hover:bg-white flex items-center justify-center transition-colors">
                    <i className="ri-add-line"></i>
                </div>
                <span className="text-sm font-gowun-dodum font-bold pt-0.5">새 교환일기 만들기</span>
            </button>
          )}

          {/* 2. 교환일기 목록 영역 (생성 모드일 때는 숨기거나 흐리게 처리 가능하지만, 공간 확보를 위해 유지) */}
          {!isCreating && (
              <div className="bg-white rounded-[24px] border border-[var(--color-border)] shadow-sm overflow-hidden flex flex-col">
                  {/* 교환일기 검색바 */}
                  <div className="px-4 py-3 border-b border-[var(--color-border)]/30">
                        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-subtle-bg)] rounded-xl">
                            <i className="ri-search-line text-[var(--text-subtle)]"></i>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="일기장 검색..."
                                className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--text-main)] placeholder:text-[var(--text-subtle)]"
                            />
                        </div>
                  </div>

                  {/* 교환일기 리스트 (스크롤) */}
                  <div className="max-h-[220px] overflow-y-auto p-2 scrollbar-hide space-y-2">
                        {filteredGroups.length > 0 ? (
                            filteredGroups.map((group) => {
                                const isSelected = selectedGroupId === group.id;
                                return (
                                <button
                                    key={group.id}
                                    onClick={() => setSelectedGroupId(group.id)}
                                    className={`
                                        group relative flex items-center w-full p-3 rounded-[16px] border transition-all duration-200 text-left active:scale-[0.98]
                                        ${isSelected 
                                        ? 'bg-[var(--color-primary)]/5 border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' 
                                        : 'bg-white border-transparent hover:bg-[var(--color-subtle-bg)]'}
                                    `}
                                >
                                    <div className={`
                                        w-10 h-10 rounded-[12px] flex items-center justify-center text-xl mr-3 transition-colors flex-shrink-0
                                        ${isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] group-hover:text-[var(--color-primary)]'}
                                    `}>
                                        <i className="ri-book-2-fill"></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-bold font-maru-buri mb-0.5 truncate ${isSelected ? 'text-[var(--text-main)]' : 'text-[var(--text-main)]'}`}>
                                            {group.name}
                                        </h4>
                                        <div className="flex items-center text-[10px] text-[var(--text-subtle)] font-pretendard gap-2">
                                            <span className="flex items-center gap-0.5"><i className="ri-user-smile-line"></i> {group.members}명</span>
                                            <span className="w-0.5 h-0.5 bg-[var(--color-border)] rounded-full"></span>
                                            <span>{group.lastUpdate}</span>
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)] animate-scaleIn">
                                            <i className="ri-checkbox-circle-fill text-xl"></i>
                                        </div>
                                    )}
                                </button>
                                );
                            })
                        ) : (
                            <div className="py-6 flex flex-col items-center justify-center text-[var(--text-subtle)] opacity-60">
                                <span className="text-xs">검색된 일기장이 없어요</span>
                            </div>
                        )}
                  </div>
              </div>
          )}
       </div>
    </div>
  );
};

export default ExchangeDiaryOptions;