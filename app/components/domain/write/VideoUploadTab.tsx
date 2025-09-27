"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from 'react';

const placeholderOptions = [
    "움직이는 추억에 당신의 생각을 더해주세요.",
    "영상 속 살아있는 순간을 글로 남겨보세요.",
];

interface VideoUploadTabProps {
  content: string;
  onContentChange: (content: string) => void;
  onVideoChange: (file: File | null) => void;
}

const VideoUploadTab: React.FC<VideoUploadTabProps> = ({ content, onContentChange, onVideoChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [placeholder, setPlaceholder] = useState(placeholderOptions[0]);

  useEffect(() => {
    setPlaceholder(placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)]);
  }, []);

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
              className="absolute top-2 right-2 bg-[var(--text-main)]/50 text-[var(--text-on-primary)] rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 active:bg-[var(--text-main)]/70 transition-all"
              aria-label="영상 삭제"
            >
              <i className="ri-close-line ri-lg w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      )}
      <div className="bg-[var(--color-subtle-bg)] rounded-lg p-3 border border-transparent
                    focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 
                    transition-all">
        <textarea
          className="w-full min-h-[250px] bg-transparent text-[var(--text-main)] text-base leading-relaxed 
                     resize-none placeholder:text-[var(--text-subtle)]/70 
                     outline-none border-none p-0 focus:ring-0"
          placeholder={placeholder}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default VideoUploadTab;
