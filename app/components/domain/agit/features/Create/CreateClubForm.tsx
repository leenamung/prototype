"use client";

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CreateClubForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [agitName, setAgitName] = useState('');
  const [agitDescription, setAgitDescription] = useState('');
  const [agitImage, setAgitImage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [joinType, setJoinType] = useState('free');
  const [maxMembers, setMaxMembers] = useState('30');

  const isFormValid = agitName.trim().length >= 2;

  const inputContainerClass = "flex flex-col bg-[var(--color-subtle-bg)] rounded-lg border border-transparent focus-within:ring-2 focus-within:ring-[var(--agit-club-primary)]/50 transition-all p-3";
  const inputClass = "outline-none w-full text-base bg-transparent placeholder:text-[var(--text-subtle)]/50 text-[var(--text-main)] font-pretendard";
  const radioClassName = "appearance-none w-4 h-4 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-component-bg)] checked:bg-[var(--agit-club-primary)] checked:border-[var(--agit-club-primary)] transition-colors mr-2 relative cursor-pointer after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100";

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAgitImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log("[모임 생성]", { agitName, isPublic, joinType, maxMembers });
    alert(`'${agitName}' 모임이 개설되었습니다!`);
    router.push('/agit');
  };

  return (
    <motion.div
      key="club-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col h-full overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
            <span className="inline-block bg-[var(--agit-club-tag-bg)] text-[var(--agit-club-tag-text)] text-xs font-bold px-2 py-1 rounded-full mb-2">
                모임 만들기
            </span>
            <p className="font-maru-buri text-xl font-semibold text-[var(--text-main)]">
                어떤 모임을 만들까요?
            </p>
        </div>

        {/* 1. 이미지 업로드 */}
        <div className="mb-8 text-center">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-[var(--color-border)] flex items-center justify-center bg-white hover:border-[var(--agit-club-primary)] transition-colors relative overflow-hidden group"
            >
              {agitImage ? (
                <Image src={agitImage} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-[var(--text-subtle)]">
                    <i className="ri-image-add-line text-2xl"></i>
                    <span className="text-xs">대표 이미지</span>
                </div>
              )}
            </button>
        </div>

        {/* 2. 이름 */}
        <div className="mb-6">
            <label className="font-pretendard text-sm text-[var(--text-subtle)] mb-2 block">
              모임 이름 <span className="text-[var(--color-warning)]">*</span>
            </label>
            <div className={inputContainerClass}>
              <input type="text" value={agitName} onChange={(e) => setAgitName(e.target.value)} placeholder="예: 우리 동네 독서 모임" className={inputClass} />
            </div>
        </div>

        {/* 3. 설명 */}
        <div className="mb-6">
            <label className="font-pretendard text-sm text-[var(--text-subtle)] mb-2 block">모임 소개</label>
            <div className={inputContainerClass}>
                <textarea value={agitDescription} onChange={(e) => setAgitDescription(e.target.value)} placeholder="어떤 활동을 하는 모임인지 알려주세요." rows={4} className={`${inputClass} resize-none`} />
            </div>
        </div>

        {/* 4. 공개 설정 */}
        <div className="mb-6 bg-white p-4 rounded-xl border border-[var(--color-border)]">
            <p className="font-bold text-sm text-[var(--text-main)] mb-3">공개 설정</p>
            <div className="flex gap-4">
              <label className="flex items-center text-sm cursor-pointer">
                <input type="radio" checked={isPublic} onChange={() => setIsPublic(true)} className={radioClassName} />
                공개
              </label>
              <label className="flex items-center text-sm cursor-pointer">
                <input type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} className={radioClassName} />
                비공개
              </label>
            </div>
        </div>

        {/* 5. 운영 방식 */}
        <div className="mb-6 bg-white p-4 rounded-xl border border-[var(--color-border)]">
            <p className="font-bold text-sm text-[var(--text-main)] mb-3">운영 방식</p>
            <div className="mb-4">
                <p className="text-xs text-[var(--text-subtle)] mb-2">가입 방식</p>
                <div className="flex gap-4">
                    <label className="flex items-center text-sm cursor-pointer">
                        <input type="radio" checked={joinType === 'free'} onChange={() => setJoinType('free')} className={radioClassName} />
                        자유 가입
                    </label>
                    <label className="flex items-center text-sm cursor-pointer">
                        <input type="radio" checked={joinType === 'approval'} onChange={() => setJoinType('approval')} className={radioClassName} />
                        승인제
                    </label>
                </div>
            </div>
            <div>
                <p className="text-xs text-[var(--text-subtle)] mb-2">최대 인원</p>
                <div className={inputContainerClass.replace('p-3', 'p-2')}>
                    <select value={maxMembers} onChange={(e) => setMaxMembers(e.target.value)} className="w-full bg-transparent text-sm border-none outline-none text-[var(--text-main)]">
                        <option value="30">소소하게 (30명)</option>
                        <option value="100">적당하게 (100명)</option>
                        <option value="unlimited">제한 없음</option>
                    </select>
                </div>
            </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[var(--color-component-bg)]/95 backdrop-blur-sm border-t border-[var(--color-border)] p-4 z-20 safe-area-bottom">
        <div className="max-w-screen-md mx-auto">
            <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`
                    w-full py-3 text-white rounded-[var(--rounded-button)] font-semibold transition-all font-pretendard shadow-md
                    ${!isFormValid ? 'opacity-50 cursor-not-allowed bg-[var(--text-subtle)]' : ''}
                    ${isFormValid ? 'bg-[var(--agit-club-primary)] active:brightness-90' : ''}
                `}
            >
                모임 개설하기
            </button>
        </div>
      </footer>
    </motion.div>
  );
}