// app/(sub)/direct/layout.tsx (새 파일)
import React from 'react';
import DirectNavigationBar from './components/DirectNavigationBar';

export default function DirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-14">
      <DirectNavigationBar />
      {children}
    </div>
  );
}