// app/profile/components/ProfileNavigationBar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface ProfileNavigationBarProps {
  onMoreOptionsClick?: () => void;
}

const ProfileNavigationBar: React.FC<ProfileNavigationBarProps> = ({ onMoreOptionsClick }) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <button 
          onClick={() => router.back()} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-sub-beige)] transition-colors"
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        <h1 className="text-lg font-medium text-[var(--text-main)]">프로필</h1>
        <button 
          onClick={onMoreOptionsClick} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-sub-beige)] transition-colors"
          aria-label="설정" // ⬇️ aria-label 수정
        >
          {/* ⬇️ 아이콘 변경 */}
          <i className="ri-settings-3-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
      </div>
    </div>
  );
};

export default ProfileNavigationBar;