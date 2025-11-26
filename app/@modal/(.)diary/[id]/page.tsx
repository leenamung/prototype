'use client'; 
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DiaryEntry, diaryEntriesData } from '@/app/data/diaryEntries';
import DiaryDetailClient from '@/app/components/domain/diary/DiaryDetailClient';

// 스켈레톤 UI 컴포넌트
const SkeletonCard = ({ id }: { id: string }) => (
    <div className="fixed inset-0 z-40 flex justify-center items-start p-4 pt-20 pb-28">
        <motion.div
            layoutId={`diary-card-${id}`}
            className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
        >
            <div className="w-full aspect-video bg-gray-300/80 animate-pulse"></div>
            <div className="p-6 sm:p-8 space-y-4">
                <div className="h-8 w-3/4 bg-gray-300/80 rounded-md animate-pulse"></div>
                <div className="h-4 w-1/4 bg-gray-200/80 rounded-md animate-pulse"></div>
            </div>
        </motion.div>
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
      <>
        {/* 👈 [수정] Client Component 밖에서 버튼 렌더링 */}
        <motion.button 
          onClick={handleClose}
          className="fixed top-5 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          aria-label="뒤로 가기"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ delay: 0.3 }}
        >
          <i className="ri-arrow-left-s-line ri-xl"></i>
        </motion.button>

        {/* 👈 [수정] prop 제거 */}
        <DiaryDetailClient diary={diary} />
      </>
    );
};