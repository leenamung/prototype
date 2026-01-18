"use client";

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CreateDiaryForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [agitName, setAgitName] = useState('');
  const [agitDescription, setAgitDescription] = useState('');
  const [agitImage, setAgitImage] = useState<string | null>(null);

  const isFormValid = agitName.trim().length >= 2;

  const inputContainerClass = "flex flex-col bg-[var(--color-subtle-bg)] rounded-lg border border-transparent focus-within:ring-2 focus-within:ring-[var(--agit-diary-primary)]/50 transition-all p-3";
  const inputClass = "outline-none w-full text-base bg-transparent placeholder:text-[var(--text-subtle)]/50 text-[var(--text-main)] font-pretendard";

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
    console.log("[일기장 생성]", { agitName });
    alert(`'${agitName}' 일기장이 만들어졌어요!`);
    router.push('/agit');
  };

  return (
    <motion.div
      key="diary-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col h-full overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-4">
         {/* 헤더 */}
         <div className="text-center mb-8">
            <span className="inline-block bg-[var(--agit-diary-tag-bg)] text-[var(--agit-diary-tag-text)] text-xs font-bold px-2 py-1 rounded-full mb-2">
                교환일기 만들기
            </span>
            <p className="font-maru-buri text-xl font-semibold text-[var(--text-main)]">
                우리만의 비밀 일기장
            </p>
        </div>

        {/* 1. 표지 */}
        <div className="mb-8 flex justify-center">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-44 rounded-r-xl rounded-l-md shadow-md flex flex-col items-center justify-center relative overflow-hidden group transition-transform hover:-translate-y-1"
              style={{ 
                  backgroundColor: '#FFFAF0', 
                  borderLeft: '12px solid var(--agit-diary-spine)',
                  borderTop: '1px solid #E8DCC6',
                  borderRight: '1px solid #E8DCC6',
                  borderBottom: '1px solid #E8DCC6',
              }}
            >
              <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
              
              {agitImage ? (
                <Image src={agitImage} alt="Cover Preview" fill className="object-cover" />
              ) : (
                <div className="text-[var(--text-subtle)] text-center p-2">
                   <i className="ri-image-edit-line text-2xl mb-1 block opacity-50"></i>
                   <span className="text-xs font-maru-buri">표지 꾸미기</span>
                </div>
              )}
            </button>
        </div>

        {/* 2. 이름 */}
        <div className="mb-6">
            <label className="font-maru-buri text-sm text-[var(--text-subtle)] mb-2 block">
              일기장 이름 <span className="text-[var(--color-warning)]">*</span>
            </label>
            <div className={inputContainerClass}>
                <input type="text" value={agitName} onChange={(e) => setAgitName(e.target.value)} placeholder="예: 우정 일기, 비밀 노트" className={inputClass} />
            </div>
        </div>

        {/* 3. 문구 */}
        <div className="mb-6">
            <label className="font-maru-buri text-sm text-[var(--text-subtle)] mb-2 block">첫 페이지 문구</label>
            <div className={inputContainerClass}>
                <textarea value={agitDescription} onChange={(e) => setAgitDescription(e.target.value)} placeholder="함께 기록할 친구에게 남길 말을 적어보세요." rows={3} className={`${inputClass} resize-none font-maru-buri`} />
            </div>
        </div>

        {/* 안내 */}
        <div className="bg-[#FFFAF0] p-4 rounded-xl border border-[#E8DCC6]">
            <div className="flex items-start gap-2">
                <i className="ri-lock-2-fill text-[var(--agit-diary-tag-text)] mt-0.5"></i>
                <div>
                    <p className="text-xs font-bold text-[var(--agit-diary-tag-text)] mb-1">비공개로 생성됩니다</p>
                    <p className="text-xs text-[var(--text-subtle)] leading-relaxed">
                        교환일기는 초대한 친구들만 볼 수 있는 프라이빗한 공간입니다.
                    </p>
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
                    ${isFormValid ? 'bg-[var(--agit-diary-primary)] active:bg-[var(--color-primary-darker)]' : ''}
                `}
            >
                일기장 만들기
            </button>
        </div>
      </footer>
    </motion.div>
  );
}