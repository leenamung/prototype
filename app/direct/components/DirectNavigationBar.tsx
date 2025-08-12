// app/direct/components/DirectNavigationBar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const DirectNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-gray-600"></i>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">메시지</h1>
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="새 메시지 작성"
        >
          <i className="ri-add-line ri-lg text-gray-600"></i>
        </button>
      </div>
    </div>
  );
};

export default DirectNavigationBar;