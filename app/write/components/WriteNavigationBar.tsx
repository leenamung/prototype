// app/write/components/WriteNavigationBar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // For cancel button functionality

interface WriteNavigationBarProps {
  onPublish: () => void; // Function to call when "발행하기" is clicked
  isPublishDisabled?: boolean; // To disable publish button if content is empty etc.
}

const WriteNavigationBar: React.FC<WriteNavigationBarProps> = ({ onPublish, isPublishDisabled }) => {
  const router = useRouter();

  const handleCancel = () => {
    // Navigate back or to a default page, e.g., home or previous page
    router.back(); 
    // Alternatively, router.push('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-20 px-4 py-3 flex justify-between items-center h-14"> {/* Explicit height */}
      <button 
        onClick={handleCancel}
        className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
      >
        취소
      </button>
      <h1 className="text-lg font-semibold text-gray-800">일기 쓰기</h1>
      <button
        onClick={onPublish}
        disabled={isPublishDisabled}
        className={`bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-[var(--rounded-button)] font-medium text-sm transition-opacity
                    ${isPublishDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      >
        발행하기
      </button>
    </nav>
  );
};

export default WriteNavigationBar;
