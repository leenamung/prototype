// app/components/NavigationBar.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationBarProps {
  userProfileImage: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ userProfileImage }) => {
  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[#E0E0E0] shadow-sm z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="font-pacifico text-xl text-[var(--color-primary)] cursor-pointer">logo</div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer relative">
            <Link href="/notifications">
            <i className="ri-notification-3-line ri-lg"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-primary)] border border-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white text-xs">3</span>
            </Link>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
            <Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
              <Image
                src={userProfileImage}
                alt="프로필"
                className="w-full h-full object-cover"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;