"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import type { Message, MessageThread } from '../../../../data/messageSampleData';

interface ChatRoomProps {
  thread: MessageThread;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ thread }) => {
  const [messages, setMessages] = useState<Message[]>(thread.messages);
  const [newMessage, setNewMessage] = useState('');
  
  const scrollRef = useRef<HTMLElement>(null);
  const isInitialMount = useRef(true);
  
  // ✅ 초기 로딩 시 "깜빡임 없이" 하단 고정을 위한 로직 (이전과 동일하게 유지)
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
    // ✅ [레이아웃 수정] h-full로 부모 영역(page.tsx에서 잡은 safe area)을 가득 채움
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* ✅ [스크롤 영역]
        - flex-1: 남은 높이를 모두 차지 (입력창 제외한 공간)
        - overflow-y-auto: 내용이 넘치면 스크롤 발생 (입력창 위까지만!)
        - padding은 이제 콘텐츠 여백 용도로만 사용 (구조적 여백 X)
      */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4"
        style={{ opacity: 0 }} // 초기 위치 잡기 전까지 숨김 (useLayoutEffect에서 해제)
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender !== 'me' && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image src={thread.participant.profileImage} alt={thread.participant.name} fill className="object-cover" />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words shadow-sm ${
              msg.sender === 'me' 
                ? 'bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-br-lg border border-[var(--color-primary-dark)]' 
                : 'bg-[var(--color-component-bg)] text-[var(--text-main)] rounded-bl-lg border border-[var(--color-border)]'
            }`}>
              <p className="text-base">{msg.content}</p>
            </div>
            <div className="flex-shrink-0 self-end text-xs text-[var(--text-subtle)]">
                {msg.timestamp}
            </div>
          </div>
        ))}
      </main>
      
      {/* ✅ [입력창 영역]
        - fixed 제거: Flex 흐름에 따라 main 아래에 자연스럽게 위치
        - flex-none: 높이가 줄어들지 않도록 고정
        - z-index 불필요: 자연스러운 스택킹 컨텍스트 따름
      */}
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