import DirectNavigationBar from '@/app/components/domain/direct/MessageList/DirectNavigationBar';
import React from 'react';

export default function DirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-14">
      <DirectNavigationBar />
      {children}
    </div>
  );
}