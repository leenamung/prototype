"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import AgitDetailLayout from '@/app/components/domain/agit/features/Detail/AgitDetailLayout';
import DiaryHeader from '@/app/components/domain/agit/features/Detail/DiaryHeader';
import ClubHeader from '@/app/components/domain/agit/features/Detail/ClubHeader';
import AgitPostList from '@/app/components/domain/agit/features/Detail/AgitPostList';

export default function AgitDetailPage({ params }: { params:  {id: string} }) {
  const searchParams = useSearchParams();

  const { id } =  params;
  

  const type = (searchParams.get('type') as 'diary' | 'club') || 'diary'; 
  const title = type === 'diary' ? '우리의 비밀 일기장' : '강남 독서 모임';

  return (
    // [수정] agitId={params.id} 전달
    <AgitDetailLayout title={title} type={type} agitId={id}>
      
      {type === 'diary' ? <DiaryHeader /> : <ClubHeader />}
      
      <AgitPostList type={type} />

    </AgitDetailLayout>
  );
}