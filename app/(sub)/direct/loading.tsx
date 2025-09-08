import React from 'react';
import SkeletonMessageListItem from '../../components/domain/direct/MessageList/ui/skeletons/SkeletonMessageListItem';

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