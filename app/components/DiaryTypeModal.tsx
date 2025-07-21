// components/DiaryTypeModal.tsx
"use client";

import React, { MouseEvent } from 'react';

interface DiaryTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSelectType: (type: string) => void; // To handle type selection
}

const DiaryTypeModal: React.FC<DiaryTypeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const diaryTypes = [
    { icon: "ri-text-line", label: "텍스트" },
    { icon: "ri-image-line", label: "사진" },
    { icon: "ri-mic-line", label: "음성" },
    { icon: "ri-video-line", label: "영상" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-4/5 max-w-md">
        <h3 className="text-lg font-bold mb-4">일기 작성하기</h3>
        <p className="mb-6">어떤 유형의 일기를 작성하시겠어요?</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {diaryTypes.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-[var(--rounded-button)] hover:bg-gray-200 transition-colors"
              // onClick={() => onSelectType(item.label.toLowerCase())} // Example usage
            >
              <i className={`${item.icon} ri-2x mb-2 text-[var(--color-primary)]`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-200 rounded-[var(--rounded-button)] hover:bg-gray-300 transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DiaryTypeModal;
