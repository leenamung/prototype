"use client";

import React from 'react';

interface LocationDisplayProps {
  currentLocation: string | null;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ currentLocation }) => {
  return (
    // 카드 배경색 변경
    <div className="bg-white rounded-lg shadow-sm p-4 -mt-3 border-t border-gray-50 animate-modalShowUp">
      <div
        className="h-32 sm:h-40 rounded-lg overflow-hidden mb-2 bg-cover bg-center bg-[var(--color-sub-light-gray)]" // 지도 플레이스홀더 배경색 변경
        style={{ backgroundImage: `url('https://placehold.co/600x200/E2E8F0/A0AEC0?text=Map+Placeholder')` }}
        role="img"
        aria-label="지도 위치"
      ></div>
      {currentLocation ? (
        // 위치 정보 텍스트 색상 변경
        <div className="flex items-center text-xs text-[var(--text-subtle)]">
          <i className="ri-map-pin-fill mr-1.5 text-[var(--color-primary)]"></i>
          <span>{currentLocation}</span>
        </div>
      ) : (
        // 로딩 메시지 텍스트 색상 변경
        <p className="text-xs text-[var(--text-subtle)]">위치 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default LocationDisplay;
