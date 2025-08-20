// app/write/components/VideoUploadTab.tsx
"use client";

import React, { useState, ChangeEvent, useRef } from 'react';

interface VideoUploadTabProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onVideoChange: (file: File | null) => void;
}

const VideoUploadTab: React.FC<VideoUploadTabProps> = ({ description, onDescriptionChange, onVideoChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onVideoChange(file);
    } else {
      setPreviewUrl(null);
      onVideoChange(null);
    }
  };

  const handleRemoveVideo = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onVideoChange(null);
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
            클릭 또는 드래그하여 영상 추가
          </p>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="mb-4">
          <div className="relative group">
            <video controls src={previewUrl} className="w-full h-auto max-h-[300px] rounded-lg"></video>
            <button
              onClick={handleRemoveVideo}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 active:bg-black/70 transition-all"
              aria-label="영상 삭제"
            >
              <i className="ri-close-line ri-lg w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      )}
      <textarea
        className="w-full bg-[var(--color-subtle-bg)] p-3 rounded-lg border-none focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-[var(--text-main)] text-sm h-24 resize-none"
        placeholder="영상에 대한 설명을 입력하세요"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};

export default VideoUploadTab;
