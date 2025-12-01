"use client";
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { AgitInfo } from '@/app/data/agitSampleData';
import AgitHeader from '../features/Header/AgitHeader';
import AgitTabs, { AgitTabKey } from '../components/AgitTabs';
import AgitInfoContent from '../features/Info/AgitInfoContent';
import AgitFeedContent from '../features/Feed/AgitFeedContent';
import AgitMembersContent from '../features/Members/AgitMembersContent';

interface AgitDetailClientProps {
  agitData: AgitInfo | null;
}

// 가상의 현재 사용자 ID (실제 구현 시 로그인 상태에서 가져와야 함)
// ⭐️ 관리자(member1)로 변경하여 테스트
const currentUserId = "member1"; 
// const currentUserId = "member3"; // 예시: 일반 멤버

const AgitDetailClient: React.FC<AgitDetailClientProps> = ({ agitData }) => {
  const [activeTab, setActiveTab] = useState<AgitTabKey>('feed');
  const router = useRouter();

  const adminInfo = useMemo(() => {
    const adminMember = agitData?.members.find(member => member.isAdmin);
    if (!adminMember) return null; // 관리자가 없는 경우 대비

    // AgitInfoContent가 기대하는 형식으로 admin 객체를 만듭니다.
    // adminSince 정보는 현재 AgitMember에 없으므로, 필요하다면 추가하거나 기본값을 사용합니다.
    return {
      name: adminMember.name,
      profileImage: adminMember.profileImage,
      adminSince: `${adminMember.joinDate}부터 관리자`, // joinDate 활용 또는 별도 필드 필요
    };
  }, [agitData?.members]);

  const currentUserMemberInfo = useMemo(() => {
      return agitData?.members.find(member => member.id === currentUserId);
  }, [agitData?.members]);

  const canUserInvite = currentUserMemberInfo?.isAdmin || currentUserMemberInfo?.canInvite;
  const isUserAdmin = currentUserMemberInfo?.isAdmin; // 👈 관리자 여부 확인

  if (!agitData) {
    return <div className="pt-20 text-center text-base text-[var(--text-subtle)]">아지트 정보를 불러올 수 없습니다.</div>;
  }
  
  const handleWritePost = () => {
    console.log(`Writing post for agit ${agitData.id}`);
    router.push('/write');
  };

  const handleInviteMember = () => {
    if (canUserInvite) {
        console.log("Invite member clicked by user:", currentUserId);
        // 멤버 초대 관련 로직 (예: 초대 모달 열기)
    } else {
        console.log("User does not have permission to invite:", currentUserId);
        // 권한 없을 시 사용자에게 알림 (옵션)
    }
  };

  return (
    <div>
      <AgitHeader
        agitId={agitData.id} // 👈 agitId 전달
        coverImage={agitData.headerImage || agitData.iconImage} 
        name={agitData.name}
        memberCount={agitData.memberCount}
        onWritePostClick={handleWritePost}
        onInviteMemberClick={handleInviteMember}
        showInviteButton={canUserInvite}
        showSettingsButton={isUserAdmin} // 👈 관리자일 경우 설정 버튼 표시
      />

      <AgitTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'feed' && (
        <AgitFeedContent notice={agitData.notice} feedItems={agitData.feedItems} onWritePostClick={handleWritePost} />
      )}
      {activeTab === 'info' && adminInfo && ( 
        <AgitInfoContent
          description={agitData.description}
          rules={agitData.rules}
          admin={adminInfo} 
          creationDate={agitData.creationDate}
          meetingCycle={agitData.meetingCycle}
        />
      )}
      {activeTab === 'info' && !adminInfo && (
        <div className="p-4 text-center text-[var(--text-subtle)]">관리자 정보를 불러올 수 없습니다.</div>
      )}
      {activeTab === 'members' && (
        <AgitMembersContent members={agitData.members} totalMemberCount={agitData.memberCount} />
      )}
    </div>
  );
};

export default AgitDetailClient;