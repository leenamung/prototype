"use client";

import { useState, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SetupProfileClientPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (newNickname.length < 2) {
      setValidationMessage('닉네임은 2자 이상 입력해주세요.');
      setIsNicknameValid(false);
    } else if (newNickname.length > 10) {
      setValidationMessage('닉네임은 10자 이하로 입력해주세요.');
      setIsNicknameValid(false);
    } else {
      // 실제 중복 확인 API 호출 로직이 들어갈 부분
      setValidationMessage('사용할 수 있는 닉네임입니다.');
      setIsNicknameValid(true);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();
  
  const handleSubmit = () => {
    if (isNicknameValid) {
      console.log("프로필 설정 완료:", { nickname, profileImage: !!profileImage });
      router.push('/auth/onboarding'); // 온보딩 페이지로 이동
    }
  };

  return (
    <div className="flex flex-col h-full p-5">
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="font-maru-buri text-xl text-[var(--text-main)]">거의 다 끝났어요!</h2>
          <p className="font-pretendard text-sm text-[var(--text-subtle)] mt-1">닉네임만 입력하면 바로 시작할 수 있어요!</p>
          <p className="font-maru-buri text-2xl font-semibold text-[var(--text-main)] mt-2">어떻게 불러드리면 될까요?</p>
        </motion.div>

        <motion.div
          className="mt-8 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          <button
            onClick={triggerFileSelect}
            className="w-28 h-28 rounded-full border-2 border-dashed border-[var(--color-border)] flex items-center justify-center bg-white/50 hover:border-[var(--color-primary)] transition-colors relative overflow-hidden group"
            aria-label="프로필 사진 변경"
          >
            {profileImage ? (
              <Image src={profileImage} alt="프로필 미리보기" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full bg-[var(--color-subtle-bg)]">
                <i className="ri-user-smile-line text-6xl text-[var(--color-border)]"></i>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
               <i className="ri-camera-line text-3xl text-white"></i>
            </div>
          </button>
          <p className="text-sm text-[var(--text-subtle)] mt-2">프로필 사진 (선택)</p>
        </motion.div>

        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <label htmlFor="nickname" className="text-sm text-left block text-[var(--text-subtle)] mb-1">
            닉네임 <span className="text-[var(--color-warning)]">(필수)</span>
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="예: 감성작가 하늘"
            className="w-full bg-white text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/70 focus:outline-none p-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
          />
          <p className={`text-xs text-left mt-2 ${isNicknameValid ? 'text-green-500' : 'text-[var(--color-warning)]'}`}>
            {validationMessage || '(2~10자, 한글/영문/숫자)'}
          </p>
        </motion.div>
      </main>

      <motion.footer
        className="w-full max-w-sm mx-auto flex-shrink-0 mt-8 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button
          onClick={handleSubmit}
          disabled={!isNicknameValid}
          className="w-full py-3 bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-[var(--rounded-button)] font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:bg-[var(--color-primary-darker)]"
        >
          완료
        </button>
      </motion.footer>
    </div>
  );
}