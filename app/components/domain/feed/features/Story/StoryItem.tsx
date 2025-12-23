"use client";
import Image from "next/image";
import React from "react";

interface StoryEmotion {
  key: string;
}

interface StoryProps {
  story: {
      id: number;
      userName: string;
      userProfile: string;
      selectedEmotions: StoryEmotion[];
  }
}

const StoryItem: React.FC<StoryProps> = ({ story }) => {
  const { userName, userProfile, selectedEmotions } = story;

  const getBorderGradientStyle = () => {
    if (!selectedEmotions || selectedEmotions.length === 0) {
      return { background: 'var(--color-border)' };
    }

    const borderColors = selectedEmotions.map(e => `var(--emotion-${e.key}-border)`);

    if (borderColors.length === 1) {
      return { background: borderColors[0] };
    } else {
      return { background: `linear-gradient(135deg, ${borderColors.join(', ')})` };
    }
  };

  const borderStyle = getBorderGradientStyle();

  return (
    // ✨ [수정] group 클래스 제거 및 active(클릭) 효과만 유지
    <button className="flex flex-col items-center space-y-1.5 flex-shrink-0 active:opacity-80 transition-opacity">
      <div
        className="p-[2px] rounded-full relative"
        style={borderStyle}
      >
        <div className="bg-white rounded-full p-[2px]">
           <div className="w-16 h-16 relative rounded-full overflow-hidden">
            <Image
              src={userProfile}
              alt={`${userName}의 스토리`}
              fill
              className="object-cover"
              priority
            />
           </div>
        </div>
      </div>
      
      <span className="text-xs text-[var(--text-main)] font-medium truncate w-16 text-center">
        {userName}
      </span>
    </button>
  );
};

export default StoryItem;