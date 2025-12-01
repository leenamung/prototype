"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { AgitInfo } from '@/app/data/agitSampleData';
import AgitSettingsNavigationBar from '../layout/AgitSettingsNavigationBar';

interface AgitSettingsClientPageProps {
  agitData: AgitInfo;
}

// ... (옵션 상수들: joinTypeOptions, maxMembersOptions 등 기존 코드 유지)
const joinTypeOptions = [
  { key: 'free', label: '자유 가입', description: '승인 없이 아지트에 즉시 가입할 수 있어요.' },
  { key: 'approval', label: '가입 신청', description: '리더의 승인을 받아야 아지트에 가입할 수 있어요.' }
];
const maxMembersOptions = [
  { key: '30', label: '소소하게 (최대 30명)', description: '깊은 이야기를 나누는 스터디, 독서 모임에 적합해요.' },
  { key: '100', label: '적당하게 (최대 100명)', description: '취미를 공유하고 정기적인 만남을 갖기에 좋아요.' },
  { key: 'unlimited', label: '자유롭게 (제한 없음)', description: '같은 관심사를 가진 누구나 환영하는 열린 공간이에요.' }
];

const AgitSettingsClientPage: React.FC<AgitSettingsClientPageProps> = ({ agitData }) => {
  
  // ... (useState, useEffect 등 기존 로직 유지) ...
  const [initialData] = useState({
    name: agitData.name,
    description: agitData.description,
    rules: agitData.rules.join('\n'),
    iconImage: agitData.iconImage,
    headerImage: agitData.headerImage || null,
    isPublic: agitData.settings.isPublic,
    joinType: agitData.settings.joinType,
    maxMembers: agitData.settings.maxMembers?.toString() || 'unlimited',
  });

  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [rules, setRules] = useState(initialData.rules);
  const [iconImage, setIconImage] = useState<string | null>(initialData.iconImage);
  const [headerImage, setHeaderImage] = useState<string | null>(initialData.headerImage);
  const [isPublic, setIsPublic] = useState(initialData.isPublic);
  const [joinType, setJoinType] = useState<string>(initialData.joinType);
  const [maxMembers, setMaxMembers] = useState<string>(initialData.maxMembers);

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const iconInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isChanged = 
      name !== initialData.name ||
      description !== initialData.description ||
      rules !== initialData.rules ||
      iconImage !== initialData.iconImage ||
      headerImage !== initialData.headerImage ||
      isPublic !== initialData.isPublic ||
      joinType !== initialData.joinType ||
      maxMembers !== initialData.maxMembers;
    setIsDirty(isChanged);
  }, [name, description, rules, iconImage, headerImage, isPublic, joinType, maxMembers, initialData]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!isDirty || isSaving) return;
    if (name.trim().length < 2) {
      alert('아지트 이름을 2자 이상 입력해주세요.');
      return;
    }
    setIsSaving(true);
    
    // 저장 로직 시뮬레이션
    const updatedData = {
      name, description, rules: rules.split('\n').filter(r => r.trim() !== ''),
      iconImage, headerImage,
      settings: { isPublic, joinType, maxMembers: maxMembers === 'unlimited' ? null : parseInt(maxMembers, 10) }
    };
    console.log("--- 아지트 설정 저장 ---", updatedData);
    
    setTimeout(() => {
      alert("설정이 저장되었습니다.");
      setIsSaving(false);
      // router.refresh(); // 실제 구현 시 데이터 갱신
    }, 1000);
  };
  
  const radioClassName = "appearance-none w-4 h-4 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-component-bg)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] transition-colors mr-2 relative cursor-pointer after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100";
  const inputWrapperClass = "bg-[var(--color-subtle-bg)] rounded-lg p-3 border border-transparent focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 transition-all";
  const inputClass = "w-full bg-transparent text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/70 focus:outline-none p-0 border-none font-pretendard resize-none";

  return (
    <div className="flex flex-col h-full pb-20"> {/* pb-20은 하단 버튼 등을 위해 유지 가능하지만, 스크롤 영역 내부로 이동 고려 */}
      {/* ✅ 설정 페이지는 '저장' 버튼과 입력 폼의 상태가 연결되어야 하므로,
        네비게이션 바를 Client Component 내부에서 렌더링합니다.
      */}
      <AgitSettingsNavigationBar onSave={handleSave} isSaveDisabled={!isDirty || isSaving} />
      
      <main className="flex-1 overflow-y-auto px-5 space-y-8 py-6"> {/* pt-20 대신 py-6 등으로 여백 조정 */}
        {/* --- 1. 이미지 설정 --- */}
        <section className="space-y-6">
          <input type="file" accept="image/*" ref={iconInputRef} onChange={(e) => handleImageChange(e, setIconImage)} className="hidden" />
          <input type="file" accept="image/*" ref={headerInputRef} onChange={(e) => handleImageChange(e, setHeaderImage)} className="hidden" />

          <div>
            <label className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">아지트 아이콘 (필수)</label>
            <div className="flex items-center space-x-4">
              <button onClick={() => iconInputRef.current?.click()} className="w-20 h-20 rounded-xl border border-dashed border-[var(--color-border)] flex items-center justify-center bg-white/50 hover:border-[var(--color-primary)] transition-colors relative overflow-hidden group" aria-label="아지트 아이콘 변경">
                {iconImage ? <Image src={iconImage} alt="아지트 아이콘 미리보기" fill className="object-cover" /> : <i className="ri-image-line ri-2x text-[var(--color-border)]"></i>}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"><i className="ri-camera-line text-2xl text-white"></i></div>
              </button>
              <p className="text-xs text-[var(--text-subtle)]">아지트 목록과 아이콘에<br/>표시되는 대표 이미지입니다.</p>
            </div>
          </div>
          
          <div>
            <label className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">헤더 배경 (선택)</label>
            <div className="flex items-center space-x-4">
              <button onClick={() => headerInputRef.current?.click()} className="w-full aspect-[10/3] rounded-xl border border-dashed border-[var(--color-border)] flex items-center justify-center bg-white/50 hover:border-[var(--color-primary)] transition-colors relative overflow-hidden group" aria-label="헤더 배경 변경">
                {headerImage ? (
                  <Image src={headerImage} alt="헤더 배경 미리보기" fill className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <i className="ri-image-add-line ri-2x text-[var(--color-border)]"></i>
                    <span className="text-xs text-[var(--text-subtle)] mt-1">헤더 배경 추가</span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"><i className="ri-camera-line text-2xl text-white"></i></div>
              </button>
              {headerImage && (
                <button onClick={() => setHeaderImage(null)} className="text-xs text-[var(--color-warning)] hover:underline flex-shrink-0">배경 삭제</button>
              )}
            </div>
            <p className="text-xs text-[var(--text-subtle)] mt-2">아지트 상세 페이지 상단에 표시되는 배경입니다.</p>
          </div>
        </section>

        {/* --- 2. 기본 정보 설정 --- */}
        <section className="space-y-4">
          <div>
            <label htmlFor="agitName" className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">아지트 이름 <span className="text-[var(--color-warning)]">(필수)</span></label>
            <div className={inputWrapperClass}>
              <input id="agitName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 우리 동네 독서 모임" className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="agitDescription" className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">아지트 설명</label>
            <div className={inputWrapperClass}>
              <textarea id="agitDescription" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="아지트의 목표, 활동 방식 등을 자유롭게 설명해주세요." rows={4} className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="agitRules" className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">모임 규칙</label>
            <div className={inputWrapperClass}>
              <textarea id="agitRules" value={rules} onChange={(e) => setRules(e.target.value)} placeholder="한 줄에 하나씩 규칙을 입력해주세요." rows={5} className={inputClass} />
            </div>
          </div>
        </section>
        
        {/* --- 3. 정책 설정 --- */}
        <section className="space-y-6">
          <div>
            <p className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">공개 설정</p>
            <div className="flex space-x-4">
              <label className="flex items-center font-pretendard text-[var(--text-main)]">
                <input type="radio" name="isPublic" checked={isPublic === true} onChange={() => setIsPublic(true)} className={radioClassName} /> 공개
              </label>
              <label className="flex items-center font-pretendard text-[var(--text-main)]">
                <input type="radio" name="isPublic" checked={isPublic === false} onChange={() => setIsPublic(false)} className={radioClassName} /> 비공개
              </label>
            </div>
          </div>
          {/* ... 가입 방식, 규모 설정 (기존 코드와 동일) ... */}
          <div>
            <p className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">가입 방식</p>
            <div className="flex flex-col space-y-3">
              {joinTypeOptions.map(option => (
                <label key={option.key} className="flex items-center font-pretendard text-[var(--text-main)]">
                  <input type="radio" name="joinType" value={option.key} checked={joinType === option.key} onChange={() => setJoinType(option.key)} className={radioClassName} />
                  <div><span className="text-sm">{option.label}</span><p className="font-pretendard text-xs text-[var(--text-subtle)]">{option.description}</p></div>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">아지트 규모</p>
            <div className="flex flex-col space-y-3">
              {maxMembersOptions.map(option => (
                <label key={option.key} className="flex items-center font-pretendard text-[var(--text-main)]">
                  <input type="radio" name="maxMembers" value={option.key} checked={maxMembers === option.key} onChange={() => setMaxMembers(option.key)} className={radioClassName} />
                  <div><span className="text-sm">{option.label}</span><p className="font-pretendard text-xs text-[var(--text-subtle)]">{option.description}</p></div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. 위험 구역 --- */}
        <section className="pt-6 border-t border-[var(--color-border)]">
           <button className="w-full text-left p-4 rounded-lg text-sm font-medium text-[var(--color-warning)] hover:bg-[var(--color-warning-bg)] transition-colors">
              <i className="ri-delete-bin-line ri-lg mr-3 w-6 text-center"></i>아지트 삭제하기
            </button>
        </section>
      </main>
    </div>
  );
};

export default AgitSettingsClientPage;