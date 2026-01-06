"use client";
import React from 'react';
import { emotions, Emotion } from '@/app/data/emotionData';

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
        alert("감정은 최대 3개까지 섞을 수 있어요.");
      }
    }
  };

  return (
    <div className="px-1">
      <h3 className="text-center font-gowun-dodum text-xs text-[var(--text-subtle)] mb-4 opacity-80">
        오늘의 색을 섞어보세요
      </h3>

      <div className="bg-white/40 rounded-[24px] p-5 border border-[var(--color-border)] shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-5 gap-y-6 gap-x-2">
            {emotions.map((emotion) => {
            const isSelected = selectedEmotions.some(e => e.label === emotion.label);
            
            // Tone-on-Tone Variables
            const colorVar = `var(--emotion-${emotion.key})`;
            const borderVar = `var(--emotion-${emotion.key}-border, ${colorVar})`;

            return (
                <button
                    key={emotion.label}
                    onClick={() => handleEmotionToggle(emotion)}
                    className="flex flex-col items-center group relative focus:outline-none"
                    aria-pressed={isSelected}
                >
                {/* Color Circle */}
                <div 
                    className={`
                    w-10 h-10 rounded-full transition-all duration-300 ease-out
                    flex items-center justify-center
                    ${isSelected ? 'scale-110 shadow-md' : 'hover:scale-105'}
                    `}
                    style={{ 
                        // Unselected: 투명도 있는 배경
                        backgroundColor: isSelected ? colorVar : colorVar,
                        opacity: isSelected ? 1 : 0.4,
                        // Selected: 진한 테두리 (Tone-on-Tone)
                        border: isSelected ? `2px solid ${borderVar}` : '2px solid transparent',
                        // Glow Effect
                        boxShadow: isSelected ? `0 0 10px ${colorVar}66` : 'none'
                    }}
                >
                    {/* 선택 시 중앙에 작은 점 (Focus Point) - 아이콘 대신 점 사용 */}
                    <div 
                        className={`w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 ${isSelected ? 'scale-100 opacity-80' : 'scale-0 opacity-0'}`}
                    />
                </div>
                
                {/* Label */}
                <span className={`mt-2 text-[10px] font-gowun-dodum tracking-tight transition-colors duration-200 
                    ${isSelected ? 'text-[var(--text-main)] font-bold' : 'text-[var(--text-subtle)] opacity-70'}`}>
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