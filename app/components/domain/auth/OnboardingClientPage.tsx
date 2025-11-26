"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// 샘플 관심사 데이터
const interests = [
  { key: 'reading', icon: 'ri-book-open-line', label: '독서' },
  { key: 'movie', icon: 'ri-film-line', label: '영화' },
  { key: 'cafe', icon: 'ri-cafe-line', label: '카페 탐방' },
  { key: 'hiking', icon: 'ri-landscape-line', label: '등산' },
  { key: 'writing', icon: 'ri-quill-pen-line', label: '글쓰기' },
  { key: 'photography', icon: 'ri-camera-line', label: '사진' },
  { key: 'music', icon: 'ri-music-2-line', label: '음악' },
  { key: 'travel', icon: 'ri-plane-line', label: '여행' },
];

export default function OnboardingClientPage() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // 닉네임은 이전 페이지에서 받아와야 하지만, 여기서는 임시로 '하늘'을 사용합니다.
  const nickname = "하늘";

  const toggleInterest = (interestKey: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestKey)
        ? prev.filter(item => item !== interestKey)
        : [...prev, interestKey]
    );
  };

  const handleStart = () => {
    console.log("선택된 관심사:", selectedInterests);
    router.push('/'); // 메인 피드로 이동
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] p-5"> {/* 헤더 높이(3.5rem)만큼 뺀 최소 높이 */}
      <main className="flex-grow flex flex-col justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-maru-buri text-2xl font-semibold text-[var(--text-main)]">
            {nickname}님, 반가워요!
          </h1>
          <p className="font-maru-buri text-lg text-[var(--text-subtle)] mt-4">
            어떤 이야기에 관심 있으세요?
          </p>
          <p className="text-xs text-[var(--text-subtle)]/80 mt-1">
            관심사를 선택하면 더 풍부한 이야기를 만날 수 있어요.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {interests.map((interest) => {
            const isSelected = selectedInterests.includes(interest.key);
            return (
              <button
                key={interest.key}
                onClick={() => toggleInterest(interest.key)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ease-in-out transform active:scale-95
                  ${isSelected 
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                    : 'border-[var(--color-border)] bg-[var(--color-component-bg)] hover:border-[var(--color-primary-dark)]'
                  }`}
              >
                <i className={`${interest.icon} ri-2x mb-2 ${isSelected ? 'text-[var(--color-primary-dark)]' : 'text-[var(--text-subtle)]'}`}></i>
                <span className={`text-sm font-medium ${isSelected ? 'text-[var(--text-main)]' : 'text-[var(--text-subtle)]'}`}>
                  {interest.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </main>

      <motion.footer
        className="w-full max-w-sm mx-auto flex-shrink-0 mt-8 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <button
          onClick={handleStart}
          className="w-full py-3 bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-[var(--rounded-button)] font-semibold transition-opacity hover:opacity-90 active:bg-[var(--color-primary-darker)]"
        >
          시작하기
        </button>
      </motion.footer>
    </div>
  );
}