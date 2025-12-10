"use client";
import React from 'react';

interface MixedEmotionIconProps {
  colors: string[]; // 이제 "var(--emotion-happy)" 같은 문자열이 들어옴
  size?: number;
}

const MixedEmotionIcon: React.FC<MixedEmotionIconProps> = ({ colors, size = 40 }) => {
  const numColors = colors.length;

  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  if (numColors === 0) {
    style.backgroundColor = 'var(--color-border)';
  } else if (numColors === 1) {
    style.backgroundColor = colors[0]; // var(...)도 그대로 할당 가능
  } else {
    const reversedTail = colors.slice(1).reverse();
    const gradientOrder = [colors[0], ...reversedTail];
    const gradientColors = [...gradientOrder, gradientOrder[0]].join(', ');
    // conic-gradient는 var()를 잘 지원합니다.
    style.background = `conic-gradient(${gradientColors})`;
  }

  return (
    <div style={style} className="relative rounded-full">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <i className="ri-sparkling-2-fill text-white/70 text-lg"></i>
      </div>
    </div>
  );
};

export default MixedEmotionIcon;