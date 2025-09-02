"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Message, MessageThread } from '../data/messageSampleData';

interface ChatRoomProps {
  thread: MessageThread;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ thread }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(thread.messages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const messageToSend: Message = {
      id: `msg${Date.now()}`,
      content: newMessage,
      timestamp: '방금',
      sender: 'me'
    };
    setMessages(prev => [...prev, messageToSend]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100dvh-4em)] flex flex-col bg-[var(--color-component-bg)]">
      <header className="fixed top-0 w-full bg-[var(--color-component-bg)] shadow-sm z-20 border-b border-[var(--color-border)]">
        <div className="flex items-center px-4 py-3 h-14">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
              <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
            </button>
            <div className="relative w-8 h-8 rounded-full overflow-hidden ml-2 mr-3">
                <Image src={thread.participant.profileImage} alt={thread.participant.name} fill className="object-cover" />
            </div>
            <p className="font-semibold text-[var(--text-main)]">{thread.participant.name}</p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto pt-16 pb-20 px-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender !== 'me' && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image src={thread.participant.profileImage} alt={thread.participant.name} fill className="object-cover" />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words ${msg.sender === 'me' ? 'bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-br-lg' : 'bg-[var(--color-subtle-bg)] text-[var(--text-main)] rounded-bl-lg'}`}>
              <p className="text-base">{msg.content}</p>
            </div>
            <div className="flex-shrink-0 self-end text-xs text-[var(--text-subtle)]">
                {msg.timestamp}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <footer className="fixed bottom-16 w-full bg-[var(--color-component-bg)] border-t border-[var(--color-border)] p-2">
        <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
              <i className="ri-add-line ri-lg text-[var(--text-subtle)]"></i>
            </button>
            <input 
                type="text" 
                placeholder="메시지 입력..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-[var(--color-subtle-bg)] rounded-full px-4 py-2 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary-dark)] transition-all"
            />
            <button onClick={handleSendMessage} className="p-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
              <i className="ri-send-plane-2-fill ri-lg text-[var(--color-primary-dark)]"></i>
            </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;