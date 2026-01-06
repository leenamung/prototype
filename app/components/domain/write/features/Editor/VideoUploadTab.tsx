"use client";
import React, { useState, useRef } from 'react';

interface VideoUploadTabProps {
  content: string;
  onContentChange: (content: string) => void;
  onVideoChange: (file: File | null) => void;
}

const VideoUploadTab: React.FC<VideoUploadTabProps> = ({ content, onContentChange, onVideoChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoChange(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveVideo = () => {
    onVideoChange(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* 1. 비디오 업로드 영역 */}
      <div 
        onClick={() => !previewUrl && fileInputRef.current?.click()}
        className={`
          relative w-full rounded-xl overflow-hidden transition-all duration-300
          ${previewUrl ? 'h-auto' : 'h-32 border-2 border-dashed border-[var(--color-border)]/60 hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5 cursor-pointer'}
        `}
      >
        {previewUrl ? (
          <div className="relative group">
            <video src={previewUrl} controls className="w-full h-auto max-h-[300px] rounded-xl bg-black/5" />
            <button 
              onClick={(e) => { e.stopPropagation(); handleRemoveVideo(); }}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-subtle)] gap-2">
             <div className="w-10 h-10 rounded-full bg-[var(--color-subtle-bg)] flex items-center justify-center">
                <i className="ri-film-line ri-lg opacity-60"></i>
            </div>
            <span className="text-xs font-gowun-dodum opacity-70">이곳을 눌러 영상을 붙여보세요</span>
          </div>
        )}
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="video/*" 
            className="hidden" 
        />
      </div>

      {/* 2. 텍스트 에디터 */}
      <textarea
        className="w-full flex-1 bg-transparent text-[var(--text-main)] text-[16px] 
                   resize-none outline-none border-none p-0 focus:ring-0
                   font-pretendard font-light
                   ruled-paper-input placeholder:text-[var(--text-subtle)]/40"
        style={{ 
            minHeight: '8rem', 
            lineHeight: '2.4rem',
            backgroundSize: '100% 2.4rem',
            paddingTop: '0.1rem' 
        }}
        placeholder="이 영상의 순간을 기록해주세요."
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default VideoUploadTab;