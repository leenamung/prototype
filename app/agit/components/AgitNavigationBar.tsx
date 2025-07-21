"use client";

import React from 'react';
import Link from 'next/link'; // For logo navigation

interface AgitNavigationBarProps {
  onNotificationClick?: () => void;
  onMoreOptionsClick?: () => void;
}

const AgitNavigationBar: React.FC<AgitNavigationBarProps> = ({ onNotificationClick, onMoreOptionsClick }) => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="flex justify-between items-center px-4 py-3 h-14">
        <Link href="/" legacyBehavior>
          <a className="font-pacifico text-xl text-[var(--color-primary)] cursor-pointer">logo</a>
        </Link>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onNotificationClick} 
            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-[var(--color-sub-beige)] transition-colors"
            aria-label="알림"
          >
            <i className="ri-notification-3-line ri-lg text-[var(--text-subtle)]"></i>
          </button>
          <button 
            onClick={onMoreOptionsClick} 
            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-[var(--color-sub-beige)] transition-colors"
            aria-label="더보기"
          >
            <i className="ri-more-2-fill ri-lg text-[var(--text-subtle)]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgitNavigationBar;
