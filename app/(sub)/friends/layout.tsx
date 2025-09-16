import React from 'react';

// 페이지(page.tsx, requests/page.tsx)가 각자 다른 헤더를 렌더링하므로
// 레이아웃은 자식만 통과시킵니다.
export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}