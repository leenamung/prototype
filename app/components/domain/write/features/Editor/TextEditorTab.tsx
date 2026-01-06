"use client";
import React, { useEffect, useState } from 'react';

const placeholderOptions = [
  "오늘 하루는 어떤 색이었나요?",
  "마음속의 이야기를 천천히 꺼내보세요.",
  "사소한 순간도 소중한 기록이 됩니다.",
];

interface TextEditorTabProps {
  content: string;
  onContentChange: (content: string) => void;
}

const TextEditorTab: React.FC<TextEditorTabProps> = ({ content, onContentChange }) => {
  const [placeholder, setPlaceholder] = useState(placeholderOptions[0]);

  useEffect(() => {
    setPlaceholder(placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)]);
  }, []);
  
  return (
    <div className="w-full h-full relative">
        <textarea
          className="w-full h-full bg-transparent text-[var(--text-main)] text-[16px] 
                     resize-none outline-none border-none p-0 focus:ring-0
                     font-pretendard font-light
                     ruled-paper-input placeholder:text-[var(--text-subtle)]/40"
          // [수정 포인트] 5줄 정도의 높이 (2.4rem * 5 = 12rem)
          // min-h-[12rem]으로 설정하여 초기 진입 시 컴팩트하게 보여줍니다.
          // 내용이 길어지면 자동으로 늘어납니다 (h-full).
          style={{ 
              minHeight: '12rem', 
              letterSpacing: '0.01em',
              paddingTop: '0.1rem' 
          }}
          placeholder={placeholder}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          spellCheck={false}
        />
    </div>
  );
};

export default TextEditorTab;