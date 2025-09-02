// app/direct/loading.tsx (새 파일)

import React from 'react';
import SkeletonMessageListItem from './components/SkeletonMessageListItem';

export default function Loading() {
  return (
    <main>
      <SkeletonMessageListItem />
      <SkeletonMessageListItem />
      <SkeletonMessageListItem />
      <SkeletonMessageListItem />
      <SkeletonMessageListItem />
    </main>
  );
}