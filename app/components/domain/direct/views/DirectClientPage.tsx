"use client";

import React from 'react';
import EmptyMessageList from '../ui/empty/EmptyMessageList';
import { MessageThread } from '../../../../data/messageSampleData';
import MessageList from '../features/MessageList/MessageList';

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