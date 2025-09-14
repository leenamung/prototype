"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // 약관 동의 상태
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // 모든 조건이 충족되었는지 확인하는 변수
  const isFormValid = email && password && confirmPassword && (password === confirmPassword) && agreeTerms && agreePrivacy;

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("가입 정보:", { email, password });
      // 모든 검증 통과 시, 프로필 설정 페이지로 이동
      router.push('/auth/setup-profile');
    }
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen flex flex-col p-5">
      <header className="flex-shrink-0">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-[var(--text-main)]">
          <i className="ri-arrow-left-s-line ri-xl"></i>
        </button>
      </header>

      <motion.main 
        className="flex-grow flex flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-maru-buri text-2xl font-semibold text-[var(--text-main)] mb-8">
          이메일로 가입하기
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-[var(--text-subtle)] mb-1 block">이메일</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white text-base text-[var(--text-main)] p-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:outline-none transition-all" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-[var(--text-subtle)] mb-1 block">비밀번호</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white text-base text-[var(--text-main)] p-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:outline-none transition-all" />
            <p className="text-xs text-[var(--text-subtle)]/80 mt-1">8자 이상, 영문/숫자/특수문자 조합</p>
          </div>
           <div>
            <label htmlFor="confirmPassword" className="text-sm text-[var(--text-subtle)] mb-1 block">비밀번호 확인</label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-white text-base text-[var(--text-main)] p-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:outline-none transition-all" />
             {password && confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-[var(--color-warning)] mt-1">비밀번호가 일치하지 않아요.</p>
            )}
          </div>
        </form>
        
        <div className="mt-8 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center mb-3">
              <input id="agree-all" type="checkbox" checked={agreeAll} onChange={(e) => handleAgreeAll(e.target.checked)} className="w-5 h-5 accent-[var(--color-primary)] rounded mr-2" />
              <label htmlFor="agree-all" className="text-sm font-semibold text-[var(--text-main)]">전체 동의</label>
          </div>
          <div className="pl-7 space-y-2 text-sm text-[var(--text-subtle)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="agree-terms" type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 accent-[var(--color-primary)] rounded mr-2" />
                <label htmlFor="agree-terms">서비스 이용약관 (필수)</label>
              </div>
              <Link href="/terms" className="text-xs hover:underline">보기</Link>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="agree-privacy" type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} className="w-4 h-4 accent-[var(--color-primary)] rounded mr-2" />
                <label htmlFor="agree-privacy">개인정보 처리방침 (필수)</label>
              </div>
              <Link href="/privacy" className="text-xs hover:underline">보기</Link>
            </div>
          </div>
        </div>
      </motion.main>
      
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full py-3 bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-[var(--rounded-button)] font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:bg-[var(--color-primary-darker)]"
        >
          가입하기
        </button>
      </motion.div>
    </div>
  );
}