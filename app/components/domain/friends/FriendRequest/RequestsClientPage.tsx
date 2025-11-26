"use client";
import React from 'react';
// RequestsNavigationBar 제거 ❌
import FriendRequestItem from '@/app/components/domain/friends/FriendRequest/RequestItem/FriendRequestItem';
import type { FriendRequest } from '@/app/data/sampleFriendData';

interface RequestsClientPageProps {
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
}

export default function RequestsClientPage({ sentRequests, receivedRequests }: RequestsClientPageProps) {
  return (
    <>
      {/* ❌ RequestsNavigationBar 제거됨 */}

      {/* ✅ pt-14 제거 (부모에서 처리) */}
      <main>
        
        {/* 섹션 1: 내가 보낸 친구 요청 */}
        <section className="mb-4">
          <h2 className="text-sm font-semibold text-[var(--text-main)] px-4 py-2 bg-[var(--color-subtle-bg)] border-b border-[var(--color-border)]">
            내가 보낸 친구 요청
          </h2>
          <div className="bg-[var(--color-component-bg)]">
            {sentRequests.length > 0 ? (
              sentRequests.map(req => (
                <FriendRequestItem key={req.id} request={req} type="sent" />
              ))
            ) : (
              <p className="text-sm text-[var(--text-subtle)] text-center py-8">보낸 친구 요청이 없습니다.</p>
            )}
          </div>
        </section>

        {/* 섹션 2: 나에게 온 친구 요청 */}
        <section>
          <h2 className="text-sm font-semibold text-[var(--text-main)] px-4 py-2 bg-[var(--color-subtle-bg)] border-b border-[var(--color-border)]">
            나에게 온 친구 요청
          </h2>
          <div className="bg-[var(--color-component-bg)]">
            {receivedRequests.length > 0 ? (
              receivedRequests.map(req => (
                <FriendRequestItem key={req.id} request={req} type="received" />
              ))
            ) : (
              <p className="text-sm text-[var(--text-subtle)] text-center py-8">받은 친구 요청이 없습니다.</p>
            )}
          </div>
        </section>

      </main>
    </>
  );
}