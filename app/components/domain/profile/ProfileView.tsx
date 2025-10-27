"use client";

import React, { useState, useEffect, useMemo } from 'react'; // React 및 Hook import 확인
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileTabs, { ProfileTabKey } from './ProfileTabs/ProfileTabs';
import { UserProfileData, UserAgitSummary, MyDiaryEntry } from '../../../data/profileSampleData'; // 타입 import 확인
import EmptyProfileDiaries from './ProfileContent/ui/empty/EmptyProfileDiaries';
import EmptyProfileAgits from './ProfileContent/ui/empty/EmptyProfileAgits';
import EmptyProfileFriends from './ProfileContent/ui/empty/EmptyProfileFriends';
import ProfileDiariesContent from './ProfileContent/ProfileDiariesContent';
import ProfileAgitsContent from './ProfileContent/ProfileAgitsContent';
import ProfileNavigationBar from './ProfileNavigationBar/ProfileNavigationBar';
import UserProfileNavigationBar from './UserProfileNavigationBar/UserProfileNavigationBar';
import MutualFriendList from './ProfileContent/MutualFriendList';
import MutualAgitList from './ProfileContent/MutualAgitList';
// Friend 타입 및 샘플 데이터 import (실제 친구 데이터 로딩 로직 구현 시 필요)
import { Friend, sampleMyFriends } from '@/app/data/sampleFriendData';


interface ProfileViewProps {
  profileData: UserProfileData | null;
}

export default function ProfileView({ profileData }: ProfileViewProps) {
  if (!profileData) {
     // 또는 로딩 상태나 에러 메시지를 표시할 수 있습니다.
     // page.tsx에서 notFound()를 호출하므로 이 경우는 거의 발생하지 않아야 합니다.
    return <div>프로필 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
const [activeTab, setActiveTab] = useState<ProfileTabKey>('diaries');
  const isMyProfile = profileData.relationshipStatus === 'self';

  // --- 파생 데이터 계산 ---
  const mutualAgitIds = profileData.mutualAgitIds; // 함께 소속된 아지트 ID 목록

  // 공개 설정 및 관계 + 아지트 공유 여부에 따라 필터링된 일기 목록
  const viewableDiaries: MyDiaryEntry[] = useMemo(() => {
    // 내 프로필이면 모든 일기 반환
    if (isMyProfile) {
      return profileData.diaries;
    }
    // 상대방 프로필이면 필터링 적용
    return profileData.diaries.filter(diary => {
      if (diary.privacy === 'public') return true; // 전체 공개는 항상 보임
      if (diary.privacy === 'friends' && profileData.relationshipStatus === 'friend') return true; // 친구 공개는 친구일 때만 보임
      // ⬇️ 'group' 공개 설정 처리 로직 추가
      if (diary.privacy === 'group') {
        // 나와 상대방이 함께 속한 아지트가 하나라도 있으면 보여줌
        // (주의: 이 로직은 '어떤 아지트에 공개했는지'는 검사하지 않음. 프로토타입용 간략화 로직)
        return mutualAgitIds && mutualAgitIds.length > 0;
      }
      // private이거나 다른 경우는 보이지 않음
      return false;
    });
    // 의존성 배열에 mutualAgitIds 추가
  }, [profileData.diaries, profileData.relationshipStatus, isMyProfile, mutualAgitIds]);

  const hasViewableDiaries = viewableDiaries.length > 0;

  const mutualFriendIds = profileData.mutualFriendIds;
  const mutualFriends: Friend[] = useMemo(() => {
     return mutualFriendIds
       ? sampleMyFriends.filter(friend => mutualFriendIds.includes(friend.id))
       : [];
  }, [mutualFriendIds]);
  const hasMutualFriends = mutualFriends.length > 0;
  const hasFriendsToShow = hasMutualFriends;

  const userAgits = profileData.agits || [];
  const mutualAgits: UserAgitSummary[] = useMemo(() => {
    return mutualAgitIds
      ? userAgits.filter(agit => mutualAgitIds.includes(agit.id))
      : [];
  }, [mutualAgitIds, userAgits]);
  const hasMutualAgits = mutualAgits.length > 0;
  const hasAgitsToShow = userAgits.length > 0;

  // ⬇️ useEffect는 최상위 레벨 호출 확인 (친구/아지트 데이터 로딩 로직 예시)
  useEffect(() => {
    // 만약 친구/아지트 데이터를 비동기적으로 불러와야 한다면 여기서 처리
    // 예: fetchMutualFriends(profileData.mutualFriendIds).then(setFriends);
    console.log("ProfileView mounted or profileData changed");
  }, [profileData]);


  return (
    // pt-14 추가: layout.tsx에서 제거했으므로 여기서 네비게이션 바 공간 확보
    <div className="pt-14">
      {isMyProfile ? (
        <ProfileNavigationBar />
      ) : (
        <UserProfileNavigationBar
          userName={profileData.name}
          userId={profileData.userId}
          relationshipStatus={profileData.relationshipStatus}
        />
      )}

      <ProfileHeader
        profileImage={profileData.profileImage}
        name={profileData.name}
        bio={profileData.bio}
        friendCount={profileData.friendCount}
        onEditProfileClick={isMyProfile ? () => console.log("Edit profile clicked") : undefined}
        relationshipStatus={profileData.relationshipStatus}
        // TODO: 핸들러 연결
      />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 콘텐츠 영역 */}
      <div>
        {activeTab === 'diaries' && (
          hasViewableDiaries ? <ProfileDiariesContent diaries={viewableDiaries} /> : <EmptyProfileDiaries isMyProfile={isMyProfile}/>
        )}
        {activeTab === 'friends' && (
          // ⬇️ 직접 계산한 mutualFriends 사용
          hasFriendsToShow ? (
             <div>
               <MutualFriendList title="함께 아는 친구" friendIds={mutualFriendIds} /> {/* ID 전달 유지 or 직접 데이터 전달 */}
               {/* <MutualFriendList title="함께 아는 친구" friends={mutualFriends} /> */} {/* 데이터 직접 전달 방식 */}
               {/* TODO: 전체 친구 목록 등 추가 */}
            </div>
           ) : (
             <EmptyProfileFriends isMyProfile={isMyProfile}/>
           )
        )}
        {activeTab === 'agits' && (
          // ⬇️ 직접 계산한 mutualAgits 사용
          hasAgitsToShow || hasMutualAgits ? (
             <div>
              <MutualAgitList title="함께 소속된 아지트" agitIds={mutualAgitIds} allAgits={userAgits} /> {/* ID 전달 유지 or 직접 데이터 전달 */}
              {/* <MutualAgitList title="함께 소속된 아지트" agits={mutualAgits} /> */} {/* 데이터 직접 전달 방식 */}
              {/* ProfileAgitsContent는 전체 아지트 목록을 표시 */}
              {userAgits.length > 0 && <ProfileAgitsContent agits={userAgits} />}
             </div>
          ) : (
            <EmptyProfileAgits isMyProfile={isMyProfile}/>
          )
        )}
      </div>
    </div>
  );
}