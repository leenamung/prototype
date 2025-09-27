"use client";
import React, { useEffect, useState } from 'react';

const placeholderOptions = [
  "오늘 당신의 마음에 남은 조각은 무엇인가요?",
  "사소한 감정이라도 괜찮아요. 오늘의 이야기를 들려주세요.",
  "오늘 하루, 어떤 생각들이 스쳐 지나갔나요?",
];

interface TextEditorTabProps {
  content: string;
  onContentChange: (content: string) => void;
}

const TextEditorTab: React.FC<TextEditorTabProps> = ({ content, onContentChange }) => {
  const [placeholder, setPlaceholder] = useState(placeholderOptions[0]);

  useEffect(() => {
    const randomPlaceholder = placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
    setPlaceholder(randomPlaceholder);
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 합니다.
  
  return (
    <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm p-4 border border-[var(--color-border)]">
      <div className="bg-[var(--color-subtle-bg)] rounded-lg p-3 border border-transparent
                    focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 
                    transition-all">
        <textarea
          className="w-full min-h-[410px] bg-transparent text-[var(--text-main)] text-base leading-relaxed 
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

export default TextEditorTab;