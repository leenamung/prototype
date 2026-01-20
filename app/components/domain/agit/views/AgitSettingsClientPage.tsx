"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AgitInfo, AgitMember } from '@/app/data/agitSampleData';
import AgitSettingsNavigationBar from '../layout/AgitSettingsNavigationBar';

interface AgitSettingsClientPageProps {
  agitData: AgitInfo;
}

// 옵션 상수
const joinTypeOptions = [
  { key: 'free', label: '자유 가입', description: '승인 없이 아지트에 즉시 가입할 수 있어요.' },
  { key: 'approval', label: '가입 신청', description: '리더의 승인을 받아야 아지트에 가입할 수 있어요.' }
];
const maxMembersOptions = [
  { key: '30', label: '소소하게 (최대 30명)', description: '깊은 이야기를 나누는 스터디, 독서 모임에 적합해요.' },
  { key: '100', label: '적당하게 (최대 100명)', description: '취미를 공유하고 정기적인 만남을 갖기에 좋아요.' },
  { key: 'unlimited', label: '자유롭게 (제한 없음)', description: '같은 관심사를 가진 누구나 환영하는 열린 공간이에요.' }
];

// [Sub Component] 멤버 관리용 리스트 아이템
const SettingsMemberItem = ({ 
  member, 
  isMe, 
  onKick, 
  onDelegate 
}: { 
  member: AgitMember; 
  isMe: boolean; 
  onKick: (id: string) => void; 
  onDelegate: (id: string) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <Image src={member.profileImage} alt={member.name} fill className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-[var(--text-main)]">{member.name}</span>
            {member.isAdmin && <i className="ri-vip-crown-fill text-yellow-500 text-xs"></i>}
          </div>
          <span className="text-xs text-[var(--text-subtle)]">{member.joinDate}</span>
        </div>
      </div>

      {!isMe && (
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="px-3 py-1.5 text-xs font-medium text-[var(--text-subtle)] bg-[var(--color-subtle-bg)] rounded-full hover:bg-[var(--color-border)] transition-colors"
          >
            관리
          </button>
          
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-[var(--color-border)] z-20 overflow-hidden py-1">
                <button 
                  onClick={() => { onDelegate(member.id); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-[var(--text-main)] hover:bg-gray-50 flex items-center gap-2"
                >
                  <i className="ri-medal-line"></i> 리더 위임
                </button>
                <button 
                  onClick={() => { onKick(member.id); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-[var(--color-warning)] hover:bg-red-50 flex items-center gap-2"
                >
                  <i className="ri-user-unfollow-line"></i> 추방하기
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const AgitSettingsClientPage: React.FC<AgitSettingsClientPageProps> = ({ agitData }) => {
  const router = useRouter();
  
  // 상태 관리
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
  
  // 멤버 관리용 로컬 상태 (실제로는 API 연동 필요)
  const [members, setMembers] = useState<AgitMember[]>(agitData.members);

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const iconInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  // 현재 사용자 ID (실제로는 Context나 Session에서 가져와야 함)
  const currentUserId = "member1"; 

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

  // 초대 링크 복사
  const handleCopyInviteLink = () => {
    const dummyLink = `https://romisom.com/invite/${agitData.id}`;
    navigator.clipboard.writeText(dummyLink);
    alert("초대 링크가 클립보드에 복사되었습니다!");
  };

  // 카카오톡 초대 (시뮬레이션)
  const handleKakaoInvite = () => {
    alert("카카오톡 실행 (시뮬레이션): 친구에게 초대 메시지를 보냅니다.");
  };

  // 멤버 추방
  const handleKickMember = (memberId: string) => {
    if (confirm("정말 이 멤버를 아지트에서 내보내시겠습니까?")) {
      setMembers(prev => prev.filter(m => m.id !== memberId));
      alert("멤버를 추방했습니다.");
    }
  };

  // 리더 위임
  const handleDelegate = (memberId: string) => {
    if (confirm("이 멤버에게 리더 권한을 위임하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      setMembers(prev => prev.map(m => ({
        ...m,
        isAdmin: m.id === memberId ? true : false
      })));
      alert("리더 권한이 위임되었습니다. 이제 회원님은 일반 멤버가 됩니다.");
      router.push(`/agit/${agitData.id}`); // 권한 상실로 메인으로 이동
    }
  };

  const handleSave = () => {
    if (!isDirty || isSaving) return;
    if (name.trim().length < 2) {
      alert('아지트 이름을 2자 이상 입력해주세요.');
      return;
    }
    setIsSaving(true);
    
    // 저장 시뮬레이션
    const updatedData = {
      name, description, rules: rules.split('\n').filter(r => r.trim() !== ''),
      iconImage, headerImage,
      settings: { isPublic, joinType, maxMembers: maxMembers === 'unlimited' ? null : parseInt(maxMembers, 10) }
    };
    console.log("--- 저장됨 ---", updatedData);
    
    setTimeout(() => {
      alert("설정이 저장되었습니다.");
      setIsSaving(false);
      setIsDirty(false); // 저장 후 상태 초기화
      // router.refresh(); 
    }, 1000);
  };

  const sectionTitleClass = "text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-1.5";
  const inputWrapperClass = "bg-[var(--color-subtle-bg)] rounded-xl p-3 border border-transparent focus-within:bg-white focus-within:border-[var(--color-primary)]/30 focus-within:shadow-sm transition-all";
  const inputClass = "w-full bg-transparent text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none p-0 border-none font-pretendard resize-none";
  const radioClassName = "appearance-none w-4 h-4 rounded-full border border-[var(--color-border)] bg-white checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] transition-all mr-2 relative cursor-pointer checked:after:content-[''] checked:after:w-1.5 checked:after:h-1.5 checked:after:rounded-full checked:after:bg-white checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 네비게이션 바 (저장 버튼 포함) */}
      <AgitSettingsNavigationBar onSave={handleSave} isSaveDisabled={!isDirty || isSaving} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-8 pb-24">
          
          {/* --- 1. 멤버 초대 섹션 (최상단 강조) --- */}
          <section>
            <h3 className={sectionTitleClass}><i className="ri-mail-send-line text-[var(--color-primary)]"></i> 멤버 초대하기</h3>
            <div className="bg-[var(--color-primary)]/5 rounded-2xl p-5 border border-[var(--color-primary)]/10">
               <p className="text-xs text-[var(--text-subtle)] mb-4 leading-relaxed">
                 아지트가 더 활기차질 수 있도록<br/>
                 마음이 맞는 친구들을 초대해보세요!
               </p>
               <div className="flex gap-2">
                 <button onClick={handleKakaoInvite} className="flex-1 bg-[#FAE100] hover:bg-[#F9E000] active:scale-[0.98] text-[#371D1E] py-2.5 rounded-xl text-xs font-bold transition-transform flex items-center justify-center gap-1.5">
                   <i className="ri-kakao-talk-fill text-sm"></i> 카카오톡 초대
                 </button>
                 <button onClick={handleCopyInviteLink} className="flex-1 bg-white border border-[var(--color-border)] hover:bg-gray-50 active:scale-[0.98] text-[var(--text-main)] py-2.5 rounded-xl text-xs font-bold transition-transform flex items-center justify-center gap-1.5">
                   <i className="ri-link text-sm"></i> 링크 복사
                 </button>
               </div>
            </div>
          </section>

          <hr className="border-t border-[var(--color-border)]/50" />

          {/* --- 2. 아지트 꾸미기 (이미지) --- */}
          <section>
            <h3 className={sectionTitleClass}><i className="ri-palette-line"></i> 아지트 꾸미기</h3>
            
            <input type="file" accept="image/*" ref={iconInputRef} onChange={(e) => handleImageChange(e, setIconImage)} className="hidden" />
            <input type="file" accept="image/*" ref={headerInputRef} onChange={(e) => handleImageChange(e, setHeaderImage)} className="hidden" />

            {/* 헤더 & 아이콘 프리뷰 조합 */}
            <div className="relative mb-6">
               {/* 헤더 이미지 */}
               <div className="relative w-full h-32 rounded-t-xl bg-gray-100 overflow-hidden group cursor-pointer border border-[var(--color-border)] border-b-0" onClick={() => headerInputRef.current?.click()}>
                  {headerImage ? (
                    <Image src={headerImage} alt="Header" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-[var(--text-subtle)]">
                      <i className="ri-image-add-line mb-1"></i>
                      <span className="text-[10px]">헤더 배경 추가</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="ri-camera-fill text-white text-xl"></i>
                  </div>
               </div>

               {/* 아이콘 이미지 (겹침) */}
               <div className="absolute -bottom-6 left-4">
                  <div className="relative w-20 h-20 rounded-2xl bg-white p-1 shadow-md cursor-pointer group" onClick={() => iconInputRef.current?.click()}>
                    <div className="relative w-full h-full rounded-xl bg-gray-200 overflow-hidden border border-[var(--color-border)]">
                      {iconImage ? (
                        <Image src={iconImage} alt="Icon" fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[var(--text-subtle)]">
                           <i className="ri-user-smile-line"></i>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <i className="ri-camera-fill text-white"></i>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
            
            {/* 텍스트 정보 입력 */}
            <div className="space-y-4 pt-8">
              <div>
                <label className="text-xs text-[var(--text-subtle)] mb-1 block pl-1">아지트 이름</label>
                <div className={inputWrapperClass}>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="아지트 이름을 입력하세요" />
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--text-subtle)] mb-1 block pl-1">소개글</label>
                <div className={inputWrapperClass}>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass} placeholder="우리 아지트를 소개해주세요." />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-t border-[var(--color-border)]/50" />

          {/* --- 3. 멤버 관리 --- */}
          <section>
            <div className="flex items-center justify-between mb-3">
               <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-1.5"><i className="ri-group-settings-line"></i> 멤버 관리</h3>
               <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full">{members.length}명</span>
            </div>
            
            <div className="bg-white rounded-xl border border-[var(--color-border)] px-4">
              {members.map((member) => (
                <SettingsMemberItem 
                  key={member.id} 
                  member={member} 
                  isMe={member.id === currentUserId} 
                  onKick={handleKickMember}
                  onDelegate={handleDelegate}
                />
              ))}
            </div>
          </section>

          <hr className="border-t border-[var(--color-border)]/50" />

          {/* --- 4. 운영 정책 --- */}
          <section className="space-y-5">
            <h3 className={sectionTitleClass}><i className="ri-settings-4-line"></i> 운영 설정</h3>
            
            {/* 공개 여부 */}
            <div className="bg-[var(--color-subtle-bg)] rounded-xl p-4">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-[var(--text-main)]">공개 설정</span>
               </div>
               <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="isPublic" checked={isPublic === true} onChange={() => setIsPublic(true)} className={radioClassName} />
                    <span className="text-sm text-[var(--text-main)]">공개</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="isPublic" checked={isPublic === false} onChange={() => setIsPublic(false)} className={radioClassName} />
                    <span className="text-sm text-[var(--text-main)]">비공개</span>
                  </label>
               </div>
            </div>

            {/* 가입 방식 */}
            <div className="bg-[var(--color-subtle-bg)] rounded-xl p-4">
               <span className="text-sm font-medium text-[var(--text-main)] block mb-3">가입 방식</span>
               <div className="space-y-3">
                 {joinTypeOptions.map(option => (
                    <label key={option.key} className="flex items-start cursor-pointer">
                      <input type="radio" name="joinType" value={option.key} checked={joinType === option.key} onChange={() => setJoinType(option.key)} className={`${radioClassName} mt-0.5`} />
                      <div>
                        <span className="text-sm text-[var(--text-main)] font-medium block">{option.label}</span>
                        <span className="text-xs text-[var(--text-subtle)]">{option.description}</span>
                      </div>
                    </label>
                 ))}
               </div>
            </div>
            
            {/* 규칙 설정 */}
            <div>
               <label className="text-xs text-[var(--text-subtle)] mb-1 block pl-1">모임 규칙</label>
               <div className={inputWrapperClass}>
                 <textarea value={rules} onChange={(e) => setRules(e.target.value)} rows={4} className={inputClass} placeholder="멤버들이 지켜야 할 규칙을 입력해주세요." />
               </div>
            </div>
          </section>

          <hr className="border-t border-[var(--color-border)]/50" />

          {/* --- 5. 기타 / 위험 구역 --- */}
          <section className="space-y-1">
             <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-xl transition-colors text-left border border-[var(--color-border)]">
                <span className="text-sm text-[var(--text-main)]">알림 설정</span>
                <i className="ri-arrow-right-s-line text-[var(--text-subtle)]"></i>
             </button>
             
             <div className="h-4"></div>

             <button className="w-full p-4 text-center text-sm text-[var(--text-subtle)] hover:text-[var(--text-main)] underline decoration-1 underline-offset-2">
                아지트 나가기
             </button>
             
             <button className="w-full p-4 text-center text-sm font-bold text-[var(--color-warning)] hover:bg-red-50 rounded-xl transition-colors">
                아지트 삭제하기
             </button>
          </section>

        </div>
      </main>
    </div>
  );
};

export default AgitSettingsClientPage;