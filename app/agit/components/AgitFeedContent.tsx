"use client";

import React from 'react';
import AgitFeedCard from './AgitFeedCard';
import type { AgitFeedItem } from '../data/agitSampleData';

interface AgitFeedContentProps {
  notice?: {
    title: string;
    content: string;
  };
  feedItems: AgitFeedItem[];
}

const AgitFeedContent: React.FC<AgitFeedContentProps> = ({ notice, feedItems }) => {
  return (
    <div className="p-4">
      {notice && (
        // 공지사항 배경색은 globals.css의 --agit-notice-badge-bg 사용
        <div className="agit-notice-badge rounded-lg mb-4 shadow-sm"> 
          <div className="p-4 flex items-start">
            <div className="w-5 h-5 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0">
              <i className="ri-pushpin-fill text-[var(--color-primary)] ri-lg"></i>
            </div>
            <div>
              {/* 공지 제목 텍스트 색상 변경 */}
              <p className="font-semibold text-sm text-[var(--text-main)]">{notice.title}</p>
              {/* 공지 내용 텍스트 색상 변경 */}
              <p className="text-xs text-[var(--text-subtle)] mt-1 leading-relaxed whitespace-pre-wrap">{notice.content}</p>
            </div>
          </div>
        </div>
      )}

      {feedItems && feedItems.length > 0 ? (
        <div className="space-y-4">
          {feedItems.map((item) => (
            <AgitFeedCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        // 메시지 텍스트 색상 변경
        <p className="text-center text-[var(--text-subtle)] py-8 text-sm">아직 게시된 피드가 없습니다.</p>
      )}
    </div>
  );
};

export default AgitFeedContent;
