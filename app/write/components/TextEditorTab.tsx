"use client";
import React from 'react';

interface TextEditorTabProps {
  content: string;
  onContentChange: (content: string) => void;
  placeholder?: string;
}

const TextEditorTab: React.FC<TextEditorTabProps> = ({ content, onContentChange, placeholder }) => {
  return (
    <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm p-4 border border-[var(--color-border)]"> 
      <textarea
        className="w-full min-h-[250px] bg-[var(--color-subtle-bg)] p-3 rounded-lg border-none focus:ring-2 focus:ring-[var(--color-primary)]/50 outline-none text-[var(--text-main)] text-sm leading-relaxed resize-none placeholder:text-[var(--text-subtle)]/70 transition-shadow"
        placeholder={placeholder || "오늘 어떤 일이 있었나요?"}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default TextEditorTab;