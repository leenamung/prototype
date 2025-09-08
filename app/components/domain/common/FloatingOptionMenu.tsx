"use client";

import { DiaryEntry } from "@/app/data/diaryEntries";
import React, { MouseEvent } from "react";

interface FloatingOptionMenuProps {
  entry: DiaryEntry | null;
  onClose: () => void;
}

const FloatingOptionMenu: React.FC<FloatingOptionMenuProps> = ({
  onClose,
}) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const menuItems = [
    { label: "신고", style: "text-[var(--color-warning)]", hoverStyle: "hover:bg-[var(--color-warning-bg)]" },
    { label: "팔로우", style: "text-[var(--text-main)]", hoverStyle: "hover:bg-[var(--color-subtle-bg)]" },
    { label: "게시물로 이동", style: "text-[var(--text-main)]", hoverStyle: "hover:bg-[var(--color-subtle-bg)]" },
    { label: "이 계정 정보", style: "text-[var(--text-main)]", hoverStyle: "hover:bg-[var(--color-subtle-bg)]" },
    { label: "닫기", onClick: onClose, style: "text-[var(--text-main)]", hoverStyle: "hover:bg-[var(--color-subtle-bg)]" },
  ];

  return (
    <div
      className="fixed inset-0 bg-[var(--text-main)]/50 flex items-center justify-center z-[60]"
      onClick={handleOverlayClick}
    >
      <div className="bg-[var(--color-component-bg)]/90 backdrop-blur-sm rounded-lg w-3/5 max-w-md animate-modalShowFront shadow-[0_4px_12px_rgba(0,0,0,0.05),_inset_0_0_0_1px_var(--color-inset-border)]">
        <div className="divide-y divide-[var(--color-divider)] rounded-lg overflow-hidden">
          {menuItems.map((item) => (
            <button 
              key={item.label} 
              onClick={item.onClick ? item.onClick : () => {}} 
              className={`w-full py-4 px-2 text-center font-medium cursor-pointer transition-colors duration-150 ${item.style} ${item.hoverStyle}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingOptionMenu;