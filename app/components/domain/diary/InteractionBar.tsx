// app/components/domain/diary/InteractionBar.tsx
"use client";
import React, { useState } from 'react';

interface InteractionBarProps {
    likes: number;
    isInitiallyLiked?: boolean;
}

const InteractionBar: React.FC<InteractionBarProps> = ({ likes, isInitiallyLiked }) => {
  const [isLiked, setIsLiked] = useState(isInitiallyLiked || false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  };
  
  return (
    <div className="mt-6 border-t border-[var(--color-border)] pt-4">
      <button 
        onClick={handleLike} 
        className="flex items-center space-x-1.5 px-2 py-1 rounded-md text-[var(--text-subtle)] hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
      >
        <i className={`ri-heart-3-${isLiked ? 'fill text-[var(--color-warning)]' : 'line'} ri-lg`}></i>
        <span className="text-sm">{currentLikes}</span>
      </button>
    </div>
  );
};

export default InteractionBar;