"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationBarProps {
  userProfileImage: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ userProfileImage }) => {
  return (
    <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-50">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <div className="font-pacifico text-xl text-[var(--color-primary)] cursor-pointer">logo</div>
        <div className="flex items-center space-x-2">
          <Link href="/notifications" className="w-8 h-8 flex items-center justify-center cursor-pointer relative rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
            <i className="ri-notification-3-line ri-lg text-[var(--text-subtle)]"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-xs">3</span>
          </Link>
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
    </nav>
  );
};

export default NavigationBar;