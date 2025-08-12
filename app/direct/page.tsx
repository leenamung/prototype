// app/direct/page.tsx
"use client";

import React from 'react';
import DirectNavigationBar from './components/DirectNavigationBar';
import MessageList from './components/MessageList';
import { sampleMessageThreads } from './data/messageSampleData';

export default function DirectMessagesPage() {
  return (
    <div className="pt-14"> {/* 상단 네비게이션 바 높이만큼 패딩 */}
      <DirectNavigationBar />
      
      <main>
        <MessageList threads={sampleMessageThreads} />
      </main>
    </div>
  );
}