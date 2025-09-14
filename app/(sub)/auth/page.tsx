"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 로그인/회원가입 페이지는 하단 탭 바가 필요 없으므로
// (sub) 그룹에 생성하는 것이 좋습니다.
export default function AuthPage() {
  return (
    <div className="relative w-full h-screen bg-[var(--color-background)] flex flex-col justify-between overflow-hidden">
      {/* 1. 감성적인 배경 이미지 */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/login-background.png" // 앙주1.jpg 이미지를 public/images/login-background.jpg 로 저장해주세요.
          alt="감성적인 배경"
          fill
          className="object-cover"
          priority
        />
        {/* 노이즈 질감 오버레이 */}
        <div className="noise-background" style={{ opacity: 0.2 }} />
        {/* 부드러운 하단 그라데이션 */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
      </motion.div>

      {/* 2. 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 text-center">
        {/* 상단 로고 및 슬로건 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="font-pacifico text-3xl text-[var(--color-primary-dark)] mt-16">
            Our Diary
          </h1>
          <p className="font-maru-buri text-lg text-[var(--text-subtle)] mt-8 leading-relaxed">
            &quot;오늘 당신의 하루는<br/>어떤 색이었나요?&quot;
          </p>
        </motion.div>

        {/* 하단 버튼 영역 */}
        <motion.div
          className="w-full max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <div className="space-y-3">
            <button className="w-full py-3 bg-[#FEE500] text-[#000000] rounded-[var(--rounded-button)] flex items-center justify-center text-sm font-medium transition-opacity hover:opacity-90">
              <i className="ri-kakao-talk-fill ri-lg mr-2"></i>
              카카오로 시작하기
            </button>
            <button className="w-full py-3 bg-white text-[#4285F4] rounded-[var(--rounded-button)] flex items-center justify-center text-sm font-medium border border-[var(--color-border)] transition-colors hover:bg-[var(--color-subtle-bg)]">
              <i className="ri-google-fill ri-lg mr-2"></i>
              Google로 시작하기
            </button>
          </div>
          <div className="mt-6 text-xs text-[var(--text-subtle)]">
            <Link href="/auth/signup" className="hover:underline">이메일로 가입하기</Link>
            <span className="mx-2">|</span>
            <Link href="/login" className="hover:underline">로그인</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}