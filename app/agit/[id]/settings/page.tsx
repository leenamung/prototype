import React from 'react';
import { notFound } from 'next/navigation';
import { sampleAgitData } from '@/app/data/agitSampleData'; 
import type { AgitInfo } from '@/app/data/agitSampleData';
import AgitSettingsClientPage from '@/app/components/domain/agit/views/AgitSettingsClientPage';

// 가상의 현재 사용자 ID (실제 구현 시 로그인 상태에서 가져와야 함)
const currentUserId = "member1"; // 관리자로 가정

// 데이터 페칭 시뮬레이션
async function getAgitData(id: string): Promise<AgitInfo | null> {
  // console.log("Fetching data for agit settings:", id);
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  if (id === sampleAgitData.id) {
    return sampleAgitData;
  }
  return null;
}

// 관리자 확인 로직
function checkIsAdmin(agitData: AgitInfo, userId: string): boolean {
  return agitData.members.some(member => member.id === userId && member.isAdmin);
}

// 페이지 컴포넌트
export default async function AgitSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agitData = await getAgitData(id);

  if (!agitData) {
    notFound();
  }

  const isAdmin = checkIsAdmin(agitData, currentUserId);

  if (!isAdmin) {
    // 관리자가 아닐 경우 처리 (여기서는 notFound로 간단히 처리)
    notFound();
  }

  // ✅ NavigationBar는 AgitSettingsClientPage 내부에서 상태와 함께 렌더링됩니다.
  return <AgitSettingsClientPage agitData={agitData} />;
}