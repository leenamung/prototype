// app/components/FloatingOptionMenu.tsx
"use client";

import React, { MouseEvent } from "react";
import { DiaryEntry } from "../data/diaryEntries";

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

  const menu = [
    { label: "신고", buttonStyle: "border-b border-[var(--color-sub-light-gray)] text-[var(--warnning-red)] hover:bg-[var(--warnning-red-bg)] rounded-t-lg" },
    { label: "팔로우", buttonStyle: "border-b border-[var(--color-sub-light-gray)] hover:bg-[var(--color-sub-beige)] " },
    { label: "게시물로 이동", buttonStyle: "border-b border-[var(--color-sub-light-gray)] hover:bg-[var(--color-sub-beige)] " },
    { label: "이 계정 정보", buttonStyle: "border-b border-[var(--color-sub-light-gray)] hover:bg-[var(--color-sub-beige)] " },
    { label: "닫기", onClick: onClose, buttonStyle: "hover:bg-[var(--color-sub-beige)] rounded-b-lg" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg w-3/5 max-w-md flex-col animate-modalShowFront">
        {menu.map((item) => (
          <button key={item.label} onClick={item.onClick ? item.onClick : () => { }} className={`flex py-4 px-2 w-full items-center justify-center cursor-pointer ${item.buttonStyle}`}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingOptionMenu;