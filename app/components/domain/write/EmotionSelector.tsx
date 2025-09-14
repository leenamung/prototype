"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MixedEmotionIcon from './MixedEmotionIcon';
import { emotions, Emotion } from '../../../data/emotionData';

interface EmotionSelectorProps {
  selectedEmotions: Emotion[];
  onEmotionChange: (emotions: Emotion[]) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedEmotions, onEmotionChange }) => {
  const handleEmotionToggle = (emotion: Emotion) => {
    const isSelected = selectedEmotions.some(e => e.label === emotion.label);
    if (isSelected) {
      onEmotionChange(selectedEmotions.filter(e => e.label !== emotion.label));
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
      <div className="mb-8">
        <h3 className="text-sm text-[var(--text-subtle)] mb-2">오늘의 감정 색</h3>
        <div className="p-4 bg-[var(--color-subtle-bg)] rounded-lg h-[76px] flex items-center space-x-4 border border-[var(--color-border)]">
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
                <span key={emotion.label} className="px-3 py-1 text-sm font-medium text-[var(--text-main)] bg-[var(--color-component-bg)] rounded-full shadow-sm border border-[var(--color-border)]">
                  {emotion.label}
                </span>
              ))
            ) : (
              <p className="text-sm text-[var(--text-subtle)]">아래에서 오늘 하루를 표현하는 색을 골라보세요.</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm text-[var(--text-subtle)] mb-3">감정 팔레트</h3>
        <div className="grid grid-cols-5 gap-x-3 gap-y-4">
          {emotions.map((emotion) => {
            const isSelected = selectedEmotions.some(e => e.label === emotion.label);
            return (
              <button
                key={emotion.label}
                onClick={() => handleEmotionToggle(emotion)}
                className="flex flex-col items-center justify-center text-center transition-transform duration-200 ease-out transform hover:scale-110 active:scale-95 focus:outline-none"
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
                <span className={`mt-2 text-xs transition-colors ${isSelected ? `font-semibold text-stroke-1` : 'text-[var(--text-subtle)]'}`}
                      style={{color: isSelected ? emotion.color : ''}}
                >
                  {emotion.label}
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