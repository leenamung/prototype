"use client";
import React from 'react';

interface LocationDisplayProps {
  currentLocation: string | null;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ currentLocation }) => {
  return (
    <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm p-4 -mt-3 border-x border-b border-[var(--color-border)] animate-modalShowUp">
      <div
        className="h-32 sm:h-40 rounded-lg overflow-hidden mb-2 bg-cover bg-center bg-[var(--color-border)]"
        style={{ backgroundImage: `url('https://placehold.co/600x200/EAE3D9/8D8D8D?text=Map+Placeholder')` }}
        role="img"
        aria-label="지도 위치"
      ></div>
      {currentLocation ? (
        <div className="flex items-center text-xs text-[var(--text-subtle)]">
          <i className="ri-map-pin-fill mr-1.5 text-[var(--color-primary)]"></i>
          <span>{currentLocation}</span>
        </div>
      ) : (
        <p className="text-xs text-[var(--text-subtle)]">위치 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default LocationDisplay;