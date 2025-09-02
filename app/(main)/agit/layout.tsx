// app/(main)/agit/layout.tsx (새 파일 - agit는 main 그룹에 속합니다)
import React from 'react';

export default function AgitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-14">
      {children}
    </div>
  );
}