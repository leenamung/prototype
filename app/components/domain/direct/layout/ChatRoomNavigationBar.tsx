"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ChatRoomNavigationBarProps {
  participantName: string;
  participantImage: string;
}

const ChatRoomNavigationBar: React.FC<ChatRoomNavigationBarProps> = ({ participantName, participantImage }) => {
  const router = useRouter();

  return (
    <header className="flex-none w-full bg-[var(--color-component-bg)] shadow-sm z-20 border-b border-[var(--color-border)] h-14">
      <div className="flex items-center px-4 h-full">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
            <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
          </button>
          <div className="relative w-8 h-8 rounded-full overflow-hidden ml-2 mr-3">
              <Image src={participantImage} alt={participantName} fill className="object-cover" />
          </div>
          <p className="font-semibold text-[var(--text-main)]">{participantName}</p>
      </div>
    </header>
  );
};

export default ChatRoomNavigationBar;