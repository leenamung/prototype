// app/direct/components/ChatRoom.tsx
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
    // ⬇️ h-screen을 유지하여 채팅방은 전체 화면을 사용하도록 합니다.
    <div className="h-screen flex flex-col">
      {/* 채팅방 헤더 (기존과 동일) */}
      <header className="fixed top-0 w-full bg-white shadow-sm z-20">
        <div className="flex items-center px-4 py-3 h-14">
            <button onClick={() => router.back()} className="p-2 -ml-2"><i className="ri-arrow-left-s-line ri-lg text-gray-600"></i></button>
            <div className="relative w-8 h-8 rounded-full overflow-hidden ml-2 mr-3">
                <Image src={thread.participant.profileImage} alt={thread.participant.name} fill className="object-cover" />
            </div>
            <p className="font-semibold text-gray-800">{thread.participant.name}</p>
        </div>
      </header>

      {/* ⬇️ 메시지 영역의 하단 패딩(pb)을 늘려서, 올라온 입력창에 마지막 메시지가 가려지지 않도록 합니다. */}
      <main className="flex-1 overflow-y-auto pt-16 pb-28 px-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender !== 'me' && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image src={thread.participant.profileImage} alt={thread.participant.name} fill className="object-cover" />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words ${msg.sender === 'me' ? 'bg-blue-500 text-white rounded-br-lg' : 'bg-gray-100 text-gray-800 rounded-bl-lg'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
            <div className="flex-shrink-0 self-end text-xs text-gray-400">
                {msg.timestamp}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* ⬇️ 메시지 입력창을 fixed로 유지하되, bottom-16 클래스를 추가하여 BottomTabBar 위로 올립니다. */}
      <footer className="fixed bottom-16 w-full bg-white border-t border-gray-200 p-2">
        <div className="flex items-center">
            <button className="p-2"><i className="ri-add-line ri-lg text-gray-500"></i></button>
            <input 
                type="text" 
                placeholder="메시지 입력..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button onClick={handleSendMessage} className="p-2"><i className="ri-send-plane-2-fill ri-lg text-blue-500"></i></button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;