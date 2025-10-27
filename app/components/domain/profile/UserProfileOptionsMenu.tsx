"use client";

import React, { MouseEvent } from "react";
import { motion } from "framer-motion";
import { RelationshipStatus } from "@/app/data/profileSampleData"; // RelationshipStatus 타입 import

interface UserProfileOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: () => void;
  onBlock: () => void;
  onUnfriend?: () => void; // 친구 끊기 핸들러 추가 (옵셔널)
  userName: string;
  relationshipStatus: RelationshipStatus; // 관계 상태 추가
}

const UserProfileOptionsMenu: React.FC<UserProfileOptionsMenuProps> = ({
  isOpen,
  onClose,
  onReport,
  onBlock,
  onUnfriend, // 핸들러 받기
  userName,
  relationshipStatus, // 관계 상태 받기
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const baseMenuItems = [
    { label: `${userName}님 신고하기`, onClick: onReport, style: "text-[var(--color-warning)]", hoverStyle: "hover:bg-[var(--color-warning-bg)]" },
    { label: `${userName}님 차단하기`, onClick: onBlock, style: "text-[var(--color-warning)]", hoverStyle: "hover:bg-[var(--color-warning-bg)]" },
  ];

  // 친구 관계일 때만 '친구 끊기' 메뉴 추가
  const friendMenuItems = relationshipStatus === 'friend' && onUnfriend
    ? [{ label: `${userName}님과 친구 끊기`, onClick: onUnfriend, style: "text-[var(--color-warning)]", hoverStyle: "hover:bg-[var(--color-warning-bg)]" }]
    : [];

  const menuItems = [
    ...baseMenuItems,
    ...friendMenuItems, // 친구 끊기 메뉴 삽입
    { label: "취소", onClick: onClose, style: "text-[var(--text-main)]", hoverStyle: "hover:bg-[var(--color-subtle-bg)]" },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-[var(--text-main)]/50 flex items-center justify-center z-[60]"
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-[var(--color-component-bg)]/90 backdrop-blur-sm rounded-lg w-3/5 max-w-xs shadow-[0_4px_12px_rgba(0,0,0,0.05),_inset_0_0_0_1px_var(--color-inset-border)] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="divide-y divide-[var(--color-divider)]">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full py-4 px-2 text-center text-sm font-medium cursor-pointer transition-colors duration-150 ${item.style} ${item.hoverStyle} active:opacity-75`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfileOptionsMenu;