// app/write/components/PhotoUploadTab.tsx
"use client";

import React, { useState, ChangeEvent, useRef } from 'react';

interface PhotoUploadTabProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onPhotoChange: (file: File | null) => void; // To notify parent about file change
}

const PhotoUploadTab: React.FC<PhotoUploadTabProps> = ({ description, onDescriptionChange, onPhotoChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoChange(file);
    } else {
      setPreviewUrl(null);
      onPhotoChange(null);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
    onPhotoChange(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {!previewUrl ? (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer mb-4 hover:border-[var(--color-primary)] transition-colors"
        >
          <i className="ri-image-add-line ri-2x text-gray-400 mb-2 w-12 h-12 flex items-center justify-center"></i>
          <p className="text-gray-500 text-sm text-center">
            클릭 또는 드래그하여 사진 추가
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="mb-4">
          <div className="relative group">
            <img
              src={previewUrl}
              alt="업로드된 사진"
              className="w-full h-auto max-h-[300px] object-contain rounded-lg"
            />
            <button
              onClick={handleRemovePhoto}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="사진 삭제"
            >
              <i className="ri-close-line ri-lg w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      )}
      <textarea
        className="w-full bg-[#FFFAF0] p-3 rounded-lg border-none focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-gray-800 text-sm h-24 resize-none"
        placeholder="사진에 대한 설명을 입력하세요"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};

export default PhotoUploadTab;
