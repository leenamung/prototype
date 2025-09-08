"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const EmptyMessageList = () => {
  const router = useRouter();

  const handleNewMessageClick = () => {
    // 실제로는 친구 목록을 보여주거나 새 메시지 작성 화면으로 이동합니다.
    console.log("New Message Clicked");
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-chat-smile-3-line text-5xl text-[var(--color-border)]"></i>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        아직 대화를 시작하지 않았어요
      </h2>
      <p className="text-base text-[var(--text-subtle)] mb-8">
        친구를 찾아 먼저 말을 걸어보는 건 어떨까요?
      </p>
      <button
        onClick={handleNewMessageClick}
        className="bg-[var(--color-primary)] text-[var(--text-on-primary)] px-8 py-3 rounded-[var(--rounded-button)] font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
      >
        새로운 대화 시작하기
      </button>
    </div>
  );
};

export default EmptyMessageList;