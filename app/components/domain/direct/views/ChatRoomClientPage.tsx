"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import type { Message, MessageThread } from '../../../../data/messageSampleData';
import ChatMessageBubble from '../features/ChatRoom/ChatMessageBubble';

interface ChatRoomProps {
  thread: MessageThread;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ thread }) => {
  const [messages, setMessages] = useState<Message[]>(thread.messages);
  const [newMessage, setNewMessage] = useState('');
  
  const scrollRef = useRef<HTMLElement>(null);
  const isInitialMount = useRef(true);
  
  useLayoutEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      requestAnimationFrame(() => {
        scrollContainer.style.opacity = '1';
      });
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth',
        });
      }, 0);
    }
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
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* 메시지 영역 */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4"
        style={{ opacity: 0 }} 
      >
        {messages.map(msg => (
          // ✅ [수정] ChatMessageBubble 컴포넌트 사용
          <ChatMessageBubble 
            key={msg.id} 
            message={msg} 
            participantImage={thread.participant.profileImage}
            participantName={thread.participant.name}
          />
        ))}
      </main>
      
      {/* 입력창 영역 */}
      <footer className="flex-none w-full bg-[var(--color-component-bg)] border-t border-[var(--color-border)] p-2">
        <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
              <i className="ri-add-line ri-lg text-[var(--text-subtle)]"></i>
            </button>
            <div className="flex-1 flex items-center bg-[var(--color-subtle-bg)] rounded-lg px-4 py-2 
                          border border-transparent 
                          focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 
                          transition-all">
              <input 
                  type="text" 
                  placeholder="메시지 입력..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-transparent text-base outline-none border-none p-0 focus:ring-0"
              />
            </div>
            <button onClick={handleSendMessage} className="p-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
              <i className="ri-send-plane-2-fill ri-lg text-[var(--color-primary-dark)]"></i>
            </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;