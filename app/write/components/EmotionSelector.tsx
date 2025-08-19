"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MixedEmotionIcon from './MixedEmotionIcon';

export interface EmotionOption {
  name: string;
  color: string;
}

export const emotions: EmotionOption[] = [
    { name: "행복", color: "#FFD6D6" }, { name: "기쁨", color: "#FFEFBA" },
    { name: "평온", color: "#D4F0F0" }, { name: "희망", color: "#E2F0CB" },
    { name: "만족", color: "#B5EAD7" }, { name: "차분", color: "#C7CEEA" },
    { name: "설렘", color: "#D8B5E0" }, { name: "사랑", color: "#F0D0D0" },
    { name: "무기력", color: "#E0E0E0" }, { name: "슬픔", color: "#B0C4DE" },
];

interface EmotionSelectorProps {
  selectedEmotions: EmotionOption[];
  onEmotionChange: (emotions: EmotionOption[]) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedEmotions, onEmotionChange }) => {
  const handleEmotionToggle = (emotion: EmotionOption) => {
    const isSelected = selectedEmotions.some(e => e.name === emotion.name);
    if (isSelected) {
      onEmotionChange(selectedEmotions.filter(e => e.name !== emotion.name));
    } else {
      if (selectedEmotions.length < 3) {
        onEmotionChange([...selectedEmotions, emotion]);
      } else {
        alert("감정은 최대 3개까지 선택할 수 있어요.");
      }
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-sm text-[var(--text-subtle)] mb-2">오늘의 감정 색</h3>
        <div className="p-3 bg-[var(--color-subtle-bg)] rounded-lg min-h-[60px] flex items-center space-x-3 border border-[var(--color-border)]">
          <AnimatePresence>
            {selectedEmotions.length > 0 && (
              <motion.div layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <MixedEmotionIcon colors={selectedEmotions.map(e => e.color)} />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-wrap gap-2">
            {selectedEmotions.length > 0 ? (
              selectedEmotions.map(emotion => (
                <span key={emotion.name} className="px-3 py-1 text-sm font-medium text-[var(--text-main)] bg-[var(--color-component-bg)] rounded-full shadow-sm border border-[var(--color-border)]">
                  {emotion.name}
                </span>
              ))
            ) : (
              <p className="text-sm text-[var(--text-subtle)]">아래에서 오늘 하루를 표현하는 색을 골라보세요.</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm text-[var(--text-subtle)] mb-2">감정 팔레트</h3>
        <div className="grid grid-cols-5 gap-x-3 gap-y-4">
          {emotions.map((emotion) => {
            const isSelected = selectedEmotions.some(e => e.name === emotion.name);
            return (
              <button
                key={emotion.name}
                onClick={() => handleEmotionToggle(emotion)}
                className="flex flex-col items-center justify-center text-center transition-transform duration-200 ease-out transform hover:scale-110 focus:outline-none"
                aria-pressed={isSelected}
              >
                <div
                  className="w-12 h-12 rounded-full cursor-pointer transition-all duration-200"
                  style={{ 
                    backgroundColor: emotion.color,
                    boxShadow: isSelected ? `0 0 0 2px var(--color-component-bg), 0 0 0 4px ${emotion.color}` : '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                >
                  {isSelected && (
                      <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-2xl font-bold" style={{textShadow: '0px 1px 2px rgba(0,0,0,0.2)'}}></i>
                      </div>
                  )}
                </div>
                <span className={`mt-2 text-xs transition-colors ${isSelected ? `font-semibold` : 'text-[var(--text-subtle)]'}`}
                      style={{color: isSelected ? emotion.color : ''}}
                >
                  {emotion.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmotionSelector;