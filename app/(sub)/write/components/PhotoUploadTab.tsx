// app/write/components/PhotoUploadTab.tsx
"use client";

import Image from 'next/image';
import React, { useState, ChangeEvent, useRef } from 'react';

interface PhotoUploadTabProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onPhotoChange: (file: File | null) => void;
}

const PhotoUploadTab: React.FC<PhotoUploadTabProps> = ({ description, onDescriptionChange, onPhotoChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // ⬇️ 1. 업로드된 이미지의 원본 크기를 저장할 state 추가
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultUrl = reader.result as string;
        setPreviewUrl(resultUrl);

        // ⬇️ 2. 이미지 크기를 알아내는 로직 추가
        const img = new window.Image();
        img.onload = () => {
          // 이미지의 실제 너비와 높이를 state에 저장
          setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = resultUrl;
      };
      reader.readAsDataURL(file);
      onPhotoChange(file);
    } else {
      setPreviewUrl(null);
      onPhotoChange(null);
      setImageSize({ width: 0, height: 0 }); // 파일 선택 취소 시 크기 초기화
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onPhotoChange(null);
    setImageSize({ width: 0, height: 0 }); // 사진 제거 시 크기 초기화
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm p-4 border border-[var(--color-border)]">
      {!previewUrl ? (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer mb-4 hover:border-[var(--color-primary)] transition-colors"
        >
          <i className="ri-image-add-line ri-2x text-[var(--color-border)] mb-2 w-12 h-12 flex items-center justify-center"></i>
          <p className="text-[var(--text-subtle)] text-sm text-center">
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
            {/* ⬇️ 3. imageSize.width가 있을 때만 렌더링하도록 조건 추가 */}
            {imageSize.width > 0 && (
              <Image
                src={previewUrl}
                alt="업로드된 사진"
                // ⬇️ 4. state에 저장된 실제 이미지 크기를 width와 height에 전달
                width={imageSize.width}
                height={imageSize.height}
                // ⬇️ 5. fill 속성을 제거하고, 반응형 및 높이 제한 클래스 적용
                className="w-full h-auto max-h-[300px] object-contain rounded-lg"
                sizes="(max-width: 640px) 100vw, 640px"
              />
            )}
            <button
              onClick={handleRemovePhoto}
              className="absolute top-2 right-2 bg-[var(--text-main)]/50 text-[var(--text-on-primary)] rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 active:bg-[var(--text-main)]/70 transition-all"
              aria-label="사진 삭제"
            >
              <i className="ri-close-line ri-lg w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      )}
      <textarea
        className="w-full min-h-[250px] bg-[var(--color-subtle-bg)] p-3 rounded-lg border-none focus:ring-2 focus:ring-[var(--color-primary)]/50 outline-none text-[var(--text-main)] text-base leading-relaxed resize-none placeholder:text-[var(--text-subtle)]/70 transition-shadow"
        placeholder="사진에 대한 설명을 입력하세요"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};

export default PhotoUploadTab;