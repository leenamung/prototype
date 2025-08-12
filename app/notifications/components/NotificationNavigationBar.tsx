// app/notifications/components/NotificationNavigationBar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const NotificationNavigationBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="flex items-center px-4 py-3 h-14">
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-gray-600"></i>
        </button>
        <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2">알림</h1>
      </div>
    </div>
  );
};

export default NotificationNavigationBar;