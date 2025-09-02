// app/direct/components/DirectClientPage.tsx (새 파일)

"use client";

import React from 'react';
import MessageList from './MessageList';
import EmptyMessageList from './EmptyMessageList';
import { MessageThread } from '../data/messageSampleData';

interface DirectClientPageProps {
  threads: MessageThread[];
}

export default function DirectClientPage({ threads }: DirectClientPageProps) {
  const hasMessages = threads && threads.length > 0;

  return (
    <main>
      {hasMessages ? <MessageList threads={threads} /> : <EmptyMessageList />}
    </main>
  );
}