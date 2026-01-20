"use client";
import React, { ReactNode, useRef } from 'react';
import AgitDetailNavigationBar from '../../layout/AgitDetailNavigationBar';
import { AgitScrollProvider } from '../../context/AgitScrollContext';

interface AgitDetailLayoutProps {
  children: ReactNode;
  title: string;
  type: 'diary' | 'club';
  agitId: string; // 👈 [추가]
}

export default function AgitDetailLayout({ children, title, type, agitId }: AgitDetailLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);

  const bgClass = type === 'diary' 
    ? "bg-texture-cream" 
    : "bg-gray-50"; 

  return (
    <div className={`flex flex-col h-[100dvh] overflow-hidden ${bgClass}`}>
      
      {/* NavBar에 agitId 전달 */}
      <AgitDetailNavigationBar title={title} type={type} agitId={agitId} />
      
      <AgitScrollProvider scrollContainerRef={mainRef}>
        <main 
          ref={mainRef}
          className="flex-1 overflow-y-auto pt-14 pb-10 relative"
        >
          {children}
        </main>
      </AgitScrollProvider>
    </div>
  );
}