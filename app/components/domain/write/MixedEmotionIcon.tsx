"use client";
import React from 'react';

interface MixedEmotionIconProps {
  colors: string[];
  size?: number;
}

const MixedEmotionIcon: React.FC<MixedEmotionIconProps> = ({ colors, size = 40 }) => {
  const numColors = colors.length;

  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  if (numColors === 0) {
    // 감정이 선택되지 않았을 때
    style.backgroundColor = 'var(--color-border)';
  } else if (numColors === 1) {
    // 감정이 1개 선택되었을 때
    style.backgroundColor = colors[0];
  } else {
    // 감정이 2개 이상 선택되었을 때 (그라데이션)
    // 마지막에 첫 색상을 한번 더 추가해서 경계선 없이 부드럽게 이어지도록 합니다.
    // 첫 번째 색상을 제외한 나머지 색상 배열을 뒤집습니다.
    const reversedTail = colors.slice(1).reverse();
    // 첫 번째 색상과 뒤집힌 나머지 색상 배열을 합칩니다.
    const gradientOrder = [colors[0], ...reversedTail];
    
    // 마지막에 첫 색상을 한번 더 추가해서 경계선 없이 부드럽게 이어지도록 합니다.
    const gradientColors = [...gradientOrder, gradientOrder[0]].join(', ');
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