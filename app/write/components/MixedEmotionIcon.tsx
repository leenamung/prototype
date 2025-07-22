// app/write/components/MixedEmotionIcon.tsx
"use client";

import React from 'react';

interface MixedEmotionIconProps {
  colors: string[]; // e.g., ['#FFD6D6', '#FFEFBA']
  className?: string;
}

const MixedEmotionIcon: React.FC<MixedEmotionIconProps> = ({ colors, className }) => {
  // 색상이 하나뿐이면 단색, 두 개 이상이면 그라데이션 배경 생성
  const backgroundStyle = colors.length > 1
    ? { backgroundImage: `linear-gradient(to bottom right, ${colors.join(', ')})` }
    : { backgroundColor: colors[0] || '#E0E0E0' };

  return (
    <div
      className={`w-10 h-10 rounded-full flex-shrink-0 relative ${className}`}
      style={backgroundStyle}
    >
      {/* 여러 색이 섞였다는 것을 시각적으로 알려주는 아이콘 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <i className="ri-sparkling-2-fill text-white/70"></i>
      </div>
    </div>
  );
};

export default MixedEmotionIcon;