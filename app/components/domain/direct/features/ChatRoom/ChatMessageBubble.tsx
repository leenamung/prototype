"use client";
import React from 'react';
import Image from 'next/image';
import type { Message } from '@/app/data/messageSampleData';

interface ChatMessageBubbleProps {
  message: Message;
  participantImage: string;
  participantName: string;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, participantImage, participantName }) => {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex items-start gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image 
            src={participantImage} 
            alt={participantName} 
            fill 
            className="object-cover" 
          />
        </div>
      )}
      <div className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words shadow-sm ${
        isMe 
          ? 'bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-br-lg border border-[var(--color-primary-dark)]' 
          : 'bg-[var(--color-component-bg)] text-[var(--text-main)] rounded-bl-lg border border-[var(--color-border)]'
      }`}>
        <p className="text-base">{message.content}</p>
      </div>
      <div className="flex-shrink-0 self-end text-xs text-[var(--text-subtle)]">
          {message.timestamp}
      </div>
    </div>
  );
};

export default ChatMessageBubble;