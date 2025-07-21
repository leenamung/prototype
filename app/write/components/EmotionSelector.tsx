"use client";

import React from 'react';

interface EmotionOption {
  name: string;
  colorClass: string; // Tailwind CSS background color class e.g., bg-[#FFD6D6]
}

interface EmotionSelectorProps {
  selectedEmotion: string | null;
  onEmotionSelect: (emotionName: string) => void;
}

// From write.html, these are example emotion colors.
// You might want to map these to your --emotion-* variables or define new ones.
const emotions: EmotionOption[] = [
  { name: "행복", colorClass: "bg-[#FFD6D6]" }, // Example: Soft Pink
  { name: "기쁨", colorClass: "bg-[#FFEFBA]" }, // Example: Soft Yellow
  { name: "평온", colorClass: "bg-[#D4F0F0]" }, // Example: Soft Cyan
  { name: "희망", colorClass: "bg-[#E2F0CB]" }, // Example: Soft Green
  { name: "만족", colorClass: "bg-[#B5EAD7]" }, // Example: Soft Mint
  { name: "차분", colorClass: "bg-[#C7CEEA]" }, // Example: Soft Lavender
  { name: "설렘", colorClass: "bg-[#D8B5E0]" }, // Example: Soft Orchid
  { name: "사랑", colorClass: "bg-[#F0D0D0]" }, // Example: Soft Rose
  { name: "무기력", colorClass: "bg-[#C9C9C9]" }, // Example: Light Gray
  { name: "슬픔", colorClass: "bg-[#A0A0A0]" }, // Example: Medium Gray
  // Add more emotions as needed, ideally linking to your --emotion-* variables
  // e.g., { name: "기쁨 (Happy)", colorClass: "bg-[var(--emotion-happy)]" },
];

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedEmotion, onEmotionSelect }) => {
  return (
    <div className="mb-6">
      {/* 섹션 제목 텍스트 색상 적용 */}
      <h3 className="text-[var(--text-subtle)] text-sm mb-3">
        오늘의 감정을 색상으로 표현해보세요
      </h3>
      <div className="flex space-x-3 overflow-x-auto pb-2 -mx-1 px-1"> {/* Horizontal scroll with padding */}
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            onClick={() => onEmotionSelect(emotion.name)}
            className={`w-10 h-10 rounded-full flex-shrink-0 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none
                        ${emotion.colorClass}
                        ${selectedEmotion === emotion.name 
                            ? 'ring-2 ring-offset-2 ring-[var(--color-primary)] scale-110 shadow-md' 
                            : 'ring-1 ring-gray-300/50 hover:ring-gray-400/70'
                        }`}
            aria-pressed={selectedEmotion === emotion.name}
            aria-label={emotion.name}
            title={emotion.name}
          ></button>
        ))}
      </div>
      {selectedEmotion && (
        // 선택된 감정 텍스트 색상 적용
        <p className="text-xs text-[var(--text-subtle)] mt-2">
          선택된 감정: <span className="font-medium text-[var(--text-main)]">{selectedEmotion}</span>
        </p>
      )}
    </div>
  );
};

export default EmotionSelector;
