import React from 'react';
import WriteClientPage from '@/app/components/domain/write/views/WriteClientPage';

export default function WritePage() {
  return (
    // ✅ [수정] h-full 추가
    <div className="h-full">
      <WriteClientPage />
    </div>
  );
}