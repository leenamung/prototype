// app/write/components/WeatherSelectionModal.tsx
"use client";

import React from 'react';

// 날씨 옵션 타입 정의
export interface WeatherOption {
  name: string; // 'sunny', 'cloudy', etc.
  label: string; // '맑음', '흐림'
  icon: string; // 'ri-sun-line'
}

// 사용 가능한 날씨 목록
export const weatherOptions: WeatherOption[] = [
  { name: 'sunny', label: '맑음', icon: 'ri-sun-line' },
  { name: 'partly_cloudy', label: '구름 조금', icon: 'ri-cloudy-2-line' },
  { name: 'cloudy', label: '흐림', icon: 'ri-cloudy-line' },
  { name: 'rainy', label: '비', icon: 'ri-rainy-line' },
  { name: 'snowy', label: '눈', icon: 'ri-snowy-line' },
  { name: 'windy', label: '바람', icon: 'ri-windy-line' },
];

interface WeatherSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWeatherSelect: (weather: WeatherOption) => void;
}

const WeatherSelectionModal: React.FC<WeatherSelectionModalProps> = ({ isOpen, onClose, onWeatherSelect }) => {
  if (!isOpen) return null;

  const handleSelect = (weather: WeatherOption) => {
    onWeatherSelect(weather);
    onClose();
  };

  return (
    // 배경 오버레이 (클릭 시 닫기)
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-modalShowUp" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
    >
      {/* 모달 컨텐츠 */}
      <div 
        className="bg-white rounded-lg p-4 w-4/5 max-w-xs shadow-xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-md font-semibold text-center mb-4 text-gray-800">오늘의 날씨</h3>
        {/* 날씨 아이콘 그리드 */}
        <div className="grid grid-cols-3 gap-4">
          {weatherOptions.map((weather) => (
            <button
              key={weather.name}
              onClick={() => handleSelect(weather)}
              className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
              aria-label={weather.label}
            >
              <i className={`${weather.icon} ri-2x mb-1`}></i>
              <span className="text-xs">{weather.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSelectionModal;