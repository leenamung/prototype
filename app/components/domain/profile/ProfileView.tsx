"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileTabs, { ProfileTabKey } from './ProfileTabs/ProfileTabs';
import { UserProfileData, UserAgitSummary, MyDiaryEntry } from '../../../data/profileSampleData';
import EmptyProfileDiaries from './ProfileContent/ui/empty/EmptyProfileDiaries';
import EmptyProfileAgits from './ProfileContent/ui/empty/EmptyProfileAgits';
import EmptyProfileFriends from './ProfileContent/ui/empty/EmptyProfileFriends';
import ProfileDiariesContent from './ProfileContent/ProfileDiariesContent';
import ProfileAgitsContent from './ProfileContent/ProfileAgitsContent';
import MutualFriendList from './ProfileContent/MutualFriendList';
import MutualAgitList from './ProfileContent/MutualAgitList';
import { Friend, sampleMyFriends } from '@/app/data/sampleFriendData';

interface ProfileViewProps {
  profileData: UserProfileData;
}

export default function ProfileView({ profileData }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('diaries');
  const isMyProfile = profileData.relationshipStatus === 'self';

  // --- 파생 데이터 계산 ---
  const mutualAgitIds = profileData.mutualAgitIds;

  // 공개 설정 및 관계 + 아지트 공유 여부에 따라 필터링된 일기 목록
  const viewableDiaries: MyDiaryEntry[] = useMemo(() => {
    if (isMyProfile) {
      return profileData.diaries;
    }
    return profileData.diaries.filter(diary => {
      if (diary.privacy === 'public') return true;
      if (diary.privacy === 'friends' && profileData.relationshipStatus === 'friend') return true;
      if (diary.privacy === 'group') {
        return mutualAgitIds && mutualAgitIds.length > 0;
      }
      return false;
    });
  }, [profileData.diaries, profileData.relationshipStatus, isMyProfile, mutualAgitIds]);

  const hasViewableDiaries = viewableDiaries.length > 0;

  const mutualFriendIds = profileData.mutualFriendIds;
  const mutualFriends: Friend[] = useMemo(() => {
     return mutualFriendIds
       ? sampleMyFriends.filter(friend => mutualFriendIds.includes(friend.id))
       : [];
  }, [mutualFriendIds]);
  
  // 여기서는 mutualFriendIds가 있으면 표시하도록 로직 유지 (실제 데이터 연동 시 수정 가능)
  const hasFriendsToShow = mutualFriendIds && mutualFriendIds.length > 0;

  const userAgits = profileData.agits || [];
  const mutualAgits: UserAgitSummary[] = useMemo(() => {
    return mutualAgitIds
      ? userAgits.filter(agit => mutualAgitIds.includes(agit.id))
      : [];
  }, [mutualAgitIds, userAgits]);
  
  const hasMutualAgits = mutualAgits.length > 0;
  const hasAgitsToShow = userAgits.length > 0;

  useEffect(() => {
    // 데이터 로딩 관련 사이드 이펙트 처리
    // console.log("ProfileView mounted or profileData changed");
  }, [profileData]);

  return (
    // ✅ pt-14 및 네비게이션 바 제거됨 (부모 Page에서 처리)
    <div>
      <ProfileHeader
        profileImage={profileData.profileImage}
        name={profileData.name}
        bio={profileData.bio}
        friendCount={profileData.friendCount}
        onEditProfileClick={isMyProfile ? () => console.log("Edit profile clicked") : undefined}
        relationshipStatus={profileData.relationshipStatus}
      />
      
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 콘텐츠 영역 */}
      <div>
        {activeTab === 'diaries' && (
          hasViewableDiaries ? <ProfileDiariesContent diaries={viewableDiaries} /> : <EmptyProfileDiaries isMyProfile={isMyProfile}/>
        )}
        
        {activeTab === 'friends' && (
          hasFriendsToShow ? (
             <div>
               <MutualFriendList title="함께 아는 친구" friendIds={mutualFriendIds} />
               {/* 내 프로필인 경우 전체 친구 목록을 보여주는 로직이 추가될 수 있음 */}
            </div>
           ) : (
             <EmptyProfileFriends isMyProfile={isMyProfile}/>
           )
        )}
        
        {activeTab === 'agits' && (
          hasAgitsToShow || hasMutualAgits ? (
             <div>
              {!isMyProfile && <MutualAgitList title="함께 소속된 아지트" agitIds={mutualAgitIds} allAgits={userAgits} />}
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