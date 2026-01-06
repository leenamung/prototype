"use client";
import React, { useState } from 'react';

const myAgits = [
  { id: 1, name: "냥냥 집사 모임", members: 156, desc: "고양이 자랑하는 공간 🐱" },
  { id: 2, name: "새벽 감성 글귀", members: 42, desc: "서로의 글을 읽어주어요" },
  { id: 3, name: "맛집 탐험대", members: 8, desc: "이번 주 어디 갈까?" },
  { id: 4, name: "개발자 스터디", members: 23, desc: "TIL 공유방" },
  { id: 5, name: "영화 토론방", members: 12, desc: "스포일러 주의!" },
  { id: 6, name: "독서 모임", members: 5, desc: "한 달에 한 권" }, // 스크롤 테스트용
  { id: 7, name: "운동 인증", members: 30, desc: "오운완!" },
];

const AgitOptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgitId, setSelectedAgitId] = useState<number | null>(null);

  const filteredAgits = myAgits.filter(agit => 
    agit.name.includes(searchQuery)
  );

  return (
    <div className="animate-fadeIn mt-2 px-1">
       {/* 상단 안내 */}
       <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-gowun-dodum text-[var(--color-primary)]">
            어떤 아지트에 이야기를 들려줄까요?
          </span>
       </div>

       {/* 목록 컨테이너 (교환일기와 디자인 통일) */}
       <div className="bg-white rounded-[24px] border border-[var(--color-border)] shadow-sm overflow-hidden flex flex-col">
           
           {/* 검색바 */}
           <div className="px-4 py-3 border-b border-[var(--color-border)]/30">
                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-subtle-bg)] rounded-xl">
                    <i className="ri-search-line text-[var(--text-subtle)]"></i>
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="아지트 이름 검색..."
                        className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--text-main)] placeholder:text-[var(--text-subtle)]"
                    />
                </div>
           </div>

           {/* 리스트 (스크롤 영역 확장) */}
           <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide space-y-1">
                {filteredAgits.length > 0 ? (
                    filteredAgits.map((agit) => {
                        const isSelected = selectedAgitId === agit.id;
                        return (
                            <button
                                key={agit.id}
                                onClick={() => setSelectedAgitId(agit.id)}
                                className={`
                                    w-full flex items-center justify-between p-3 rounded-[16px] cursor-pointer transition-all text-left group
                                    ${isSelected 
                                        ? 'bg-[var(--color-primary)]/5 border border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' 
                                        : 'border border-transparent hover:bg-[var(--color-subtle-bg)]'}
                                `}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {/* 아지트 아이콘 */}
                                    <div className={`
                                        w-10 h-10 rounded-[12px] flex items-center justify-center text-lg flex-shrink-0 transition-colors
                                        ${isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] group-hover:text-[var(--color-primary)]'}
                                    `}>
                                        <i className="ri-community-fill"></i>
                                    </div>
                                    
                                    {/* 정보 */}
                                    <div className="flex flex-col min-w-0">
                                        <span className={`text-sm font-bold truncate ${isSelected ? 'text-[var(--text-main)]' : 'text-[var(--text-main)]'}`}>
                                            {agit.name}
                                        </span>
                                        <span className="text-[10px] text-[var(--text-subtle)] truncate font-gowun-dodum">
                                            멤버 {agit.members}명 · {agit.desc}
                                        </span>
                                    </div>
                                </div>

                                {/* 체크박스 UI */}
                                <div className={`
                                    w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ml-2
                                    ${isSelected 
                                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' 
                                        : 'border-[var(--color-border)] bg-white'}
                                `}>
                                    {isSelected && <i className="ri-check-line text-white text-xs"></i>}
                                </div>
                            </button>
                        );
                    })
                ) : (
                    <div className="py-8 flex flex-col items-center justify-center text-[var(--text-subtle)] opacity-60">
                        <i className="ri-file-search-line text-2xl mb-1"></i>
                        <span className="text-xs">찾으시는 아지트가 없어요</span>
                    </div>
                )}
           </div>
       </div>
    </div>
  );
};

export default AgitOptions;