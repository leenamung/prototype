// app/direct/components/MessageList.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { MessageThread } from '../data/messageSampleData';

interface MessageListProps {
  threads: MessageThread[];
}

const MessageList: React.FC<MessageListProps> = ({ threads }) => {
  return (
    <div>
      {threads.map(thread => (
        <Link 
          key={thread.id}
          href={`/direct/${thread.id}`} 
          className="flex items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 mr-3">
            <Image src={thread.participant.profileImage} alt={thread.participant.name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-800 truncate">{thread.participant.name}</p>
              <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{thread.lastMessage.timestamp}</p>
            </div>
            <p className={`text-sm mt-0.5 truncate ${thread.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
              {thread.lastMessage.content}
            </p>
          </div>
          {thread.unreadCount > 0 && (
            <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center ml-3 flex-shrink-0">
              {thread.unreadCount}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default MessageList;