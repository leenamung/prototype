"use client";
import React from 'react';
import AgitFeedCard from './AgitFeedCard';
import type { AgitFeedItem } from '../data/agitSampleData';
import EmptyAgitFeed from './EmptyAgitFeed';

interface AgitFeedContentProps {
  notice?: { title: string; content: string; };
  feedItems: AgitFeedItem[];
  onWritePostClick: () => void;
}

const AgitFeedContent: React.FC<AgitFeedContentProps> = ({ notice, feedItems, onWritePostClick }) => {
  return (
    <div className="p-4">
      {notice && (
        <div className="bg-[var(--agit-notice-badge-bg)] rounded-lg mb-4 shadow-sm border border-[var(--color-border)]"> 
          <div className="p-4 flex items-start">
            <div className="w-5 h-5 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0">
              <i className="ri-pushpin-fill text-[var(--color-primary-dark)] ri-lg"></i>
            </div>
            <div>
              <p className="font-semibold text-sm text-[var(--text-main)]">{notice.title}</p>
              <p className="text-xs text-[var(--text-subtle)] mt-1 leading-relaxed whitespace-pre-wrap">{notice.content}</p>
            </div>
          </div>
        </div>
      )}

      {feedItems.length > 0 ? (
        <div className="space-y-4">
          {feedItems.map((item) => (<AgitFeedCard key={item.id} item={item} />))}
        </div>
      ) : (
        <EmptyAgitFeed onWritePostClick={onWritePostClick} />
      )}
    </div>
  );
};

export default AgitFeedContent;