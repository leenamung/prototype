'use client'; 
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DiaryEntry, diaryEntriesData } from '@/app/data/diaryEntries';
import DiaryDetailClient from '@/app/components/domain/diary/views/DiaryDetailClient';

// 스켈레톤 UI 컴포넌트
const SkeletonCard = ({ id }: { id: string }) => (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-background)]">
        {/* 1. 헤더 스켈레톤 (flex-none) */}
        <div className="flex-none h-14 px-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
        
        {/* 2. 콘텐츠 스켈레톤 (flex-1) */}
        <div className="flex-1 p-4 overflow-hidden flex justify-center items-start">
             <div className="w-full max-w-2xl bg-white/50 rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full aspect-video bg-gray-300/80"></div>
                <div className="p-6 space-y-4">
                    <div className="h-8 w-3/4 bg-gray-300/80 rounded-md"></div>
                    <div className="h-4 w-1/4 bg-gray-200/80 rounded-md"></div>
                    <div className="space-y-2 mt-4">
                        <div className="h-4 w-full bg-gray-200/80 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200/80 rounded"></div>
                    </div>
                </div>
             </div>
        </div>
    </div>
);


export default function DiaryModal() {
    const router = useRouter();
    const params = useParams();
    const { id } = params as { id: string };

    const [diary, setDiary] = useState<DiaryEntry | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const foundDiary = diaryEntriesData.find(d => d.id === id);
            setDiary(foundDiary || null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [id]);

    const handleClose = () => router.back();

    if (!diary) {
        return <SkeletonCard id={id} />;
    }

    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-background)]">
        
        {/* 1. 헤더 영역 (Flex-none) - 닫기 버튼 포함 */}
        {/* 기존의 fixed 포지셔닝(top-5 left-4) 제거하고 Flex 흐름 내 배치 */}
        <div className="flex-none h-14 px-4 flex items-center z-50">
          <motion.button 
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-[var(--text-main)] hover:bg-black/20 transition-colors"
            aria-label="뒤로 가기"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="ri-arrow-left-s-line ri-xl"></i>
          </motion.button>
        </div>

        {/* 2. 콘텐츠 영역 (Flex-1) */}
        {/* DiaryDetailClient 내부에서 스크롤(overflow-y-auto)을 처리하므로, 
            여기서는 남은 공간을 꽉 채우도록 설정 (flex-1) */}
        <div className="flex-1 overflow-hidden relative">
            <DiaryDetailClient diary={diary} />
        </div>
      </div>
    );
};