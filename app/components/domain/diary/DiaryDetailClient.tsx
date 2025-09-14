// app/components/domain/diary/DiaryDetailClient.tsx

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DiaryEntry } from '@/app/data/diaryEntries';
import { CommentEntry } from '@/app/data/commentEntries';
import CommentItem from '@/app/components/domain/feed/Reply/CommentItem';

interface DiaryDetailClientProps {
  diary: DiaryEntry;
  initialComments: CommentEntry[];
}

const emotionIcons = [
    { key: 'like', icon: 'ri-heart-3-line', label: '공감'},
    { key: 'empathy', icon: 'ri-emotion-line', label: '이해돼요' },
    { key: 'sad', icon: 'ri-emotion-sad-line', label: '슬퍼요' },
    { key: 'cheer', icon: 'ri-quill-pen-line', label: '응원해요' },
];

export default function DiaryDetailClient({ diary, initialComments }: DiaryDetailClientProps) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [selectedReaction, setSelectedReaction] = useState<string | null>(diary.isInitiallyLiked ? 'like' : null);
  const [likes, setLikes] = useState(diary.likes);

  const getGradientStyle = () => {
    if (!diary.selectedEmotions || diary.selectedEmotions.length === 0) {
      return { backgroundColor: 'var(--color-component-bg)' };
    }
    if (diary.selectedEmotions.length === 1) {
      const color = diary.selectedEmotions[0].color;
      return { background: `linear-gradient(145deg, ${color}20, ${color}05)` };
    }
    const colors = diary.selectedEmotions.map(e => `${e.color}30`).join(', ');
    return { background: `linear-gradient(145deg, ${colors})` };
  };

  const handleReaction = (reactionKey: string) => {
    if (selectedReaction === reactionKey) {
        setSelectedReaction(null);
        if(reactionKey === 'like') setLikes(l => l - 1);
    } else {
        if(selectedReaction === 'like' && reactionKey !== 'like') setLikes(l => l - 1);
        if(reactionKey === 'like' && selectedReaction !== 'like') setLikes(l => l + 1);
        setSelectedReaction(reactionKey);
    }
  };
  
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentEntry: CommentEntry = {
        id: `comment-${Date.now()}`,
        author: '현재 사용자',
        profileImage: 'https://i.pravatar.cc/150?img=10', // Placeholder
        content: newComment,
        timestamp: '방금 전',
        likes: 0,
        comments: 0, // 대댓글 기능 추가 시 필요
      };
      setComments([newCommentEntry, ...comments]);
      setNewComment('');
    }
  };


  return (
    <div className="bg-[var(--color-background)] min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-[var(--color-component-bg)]/80 backdrop-blur-sm z-20 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-2 h-14">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
            <i className="ri-arrow-left-s-line ri-xl text-[var(--text-subtle)]"></i>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
            <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
          </button>
        </div>
      </header>

      <main className="flex-grow pt-14 pb-16 overflow-y-auto">
        <motion.div 
          className="relative px-5 py-6" 
          style={getGradientStyle()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="noise-background absolute inset-0 opacity-10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image src={diary.profileImage} alt={diary.author} fill className="object-cover" />
              </div>
              <div>
                {/* 폰트 수정: 닉네임, 시간은 '마루 부리' */}
                <p className="font-maru-buri font-semibold text-sm text-[var(--text-main)]">{diary.author}</p>
                <p className="font-maru-buri text-xs text-[var(--text-subtle)]">{diary.timestamp}</p>
              </div>
            </div>

            {diary.selectedEmotions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {diary.selectedEmotions.map(emotion => (
                  <div key={emotion.key} className="px-3 py-1 rounded-full text-xs font-maru-buri" style={{ backgroundColor: `${emotion.color}40` }}>
                    {/* ✅ 글자 테두리 효과 적용: text-stroke-1 클래스 사용 */}
                    <span className="text-stroke-1" style={{ color: emotion.color }}>{emotion.label}</span>
                  </div>
                ))}
              </div>
            )}

            {diary.imageUrl && (
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6 shadow-sm">
                <Image src={diary.imageUrl} alt="일기 이미지" fill className="object-cover" />
              </div>
            )}
            
            {/* 폰트 수정: 일기 본문은 '프리텐다드' */}
            <p className="font-pretendard text-base text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">
              {diary.content}
            </p>
          </div>
        </motion.div>
        
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-border)]">
              <div className="flex items-center space-x-2">
                 {emotionIcons.map(reaction => (
                   <button 
                     key={reaction.key}
                     onClick={() => handleReaction(reaction.key)}
                     className={`p-2 rounded-full transition-colors ${selectedReaction === reaction.key ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-dark)]' : 'text-[var(--text-subtle)] hover:bg-[var(--color-subtle-bg)]'}`}
                     aria-label={reaction.label}
                   >
                     <i className={`${reaction.icon} ri-lg`}></i>
                   </button>
                 ))}
              </div>
              <span className="font-pretendard text-sm text-[var(--text-subtle)]">공감 {likes}개</span>
          </div>

          <div className="space-y-4">
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} setReplyUerInfo={() => {}} />
            ))}
          </div>
        </div>
      </main>
      
      <footer className="fixed bottom-0 w-full bg-[var(--color-component-bg)] border-t border-[var(--color-border)] p-2 z-10">
        <div className="flex items-center">
            <input 
                type="text" 
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="flex-1 bg-[var(--color-subtle-bg)] rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 font-pretendard text-[var(--text-main)] placeholder:text-[var(--text-subtle)]"
            />
            <button 
              onClick={handleCommentSubmit}
              className="p-2 ml-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
            >
              <i className="ri-send-plane-2-fill ri-lg text-[var(--color-primary-dark)]"></i>
            </button>
        </div>
      </footer>
    </div>
  );
}