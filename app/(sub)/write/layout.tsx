// app/(sub)/write/layout.tsx (수정)

import React from 'react';

// WriteNavigationBar를 여기서 제거합니다.
// 레이아웃은 자식 컴포넌트를 감싸는 역할만 합니다.
export default function WriteLayout({
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