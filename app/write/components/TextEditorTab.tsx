"use client";

import React from 'react';

interface TextEditorTabProps {
  content: string;
  onContentChange: (content: string) => void;
  placeholder?: string;
}

const TextEditorTab: React.FC<TextEditorTabProps> = ({ content, onContentChange, placeholder }) => {
  return (
    // 카드 배경색 변경
    <div className="bg-white rounded-lg shadow-sm p-4"> 
      <textarea
        // 텍스트 영역 배경색 변경 및 텍스트 색상 적용
        className="w-full min-h-[250px] bg-[var(--color-sub-beige)] p-3 rounded-lg border-none focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-[var(--text-main)] text-sm leading-relaxed resize-none placeholder:text-[var(--text-subtle)]/70"
        placeholder={placeholder || "오늘 어떤 일이 있었나요?"}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default TextEditorTab;
