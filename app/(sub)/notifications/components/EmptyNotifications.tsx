"use client";
import React from 'react';

const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-24 h-24 flex items-center justify-center bg-[var(--color-subtle-bg)] rounded-full mb-6">
        <i className="ri-notification-off-line text-5xl text-[var(--color-border)]"></i>
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-main)] mb-2">
        새로운 소식이 없어요
      </h2>
      <p className="text-base text-[var(--text-subtle)]">
        다른 사람들과 소통하며 새로운 이야기를 만들어보세요.
      </p>
    </div>
  );
};

export default EmptyNotifications;