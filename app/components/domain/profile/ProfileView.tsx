"use client";

import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileTabs, { ProfileTabKey } from './ProfileTabs/ProfileTabs';
import { UserProfileData } from '../../../data/profileSampleData';
import EmptyProfileDiaries from './ProfileContent/ui/empty/EmptyProfileDiaries';
import EmptyProfileAgits from './ProfileContent/ui/empty/EmptyProfileAgits';
import EmptyProfileFriends from './ProfileContent/ui/empty/EmptyProfileFriends';
import ProfileDiariesContent from './ProfileContent/ProfileDiariesContent';
import ProfileAgitsContent from './ProfileContent/ProfileAgitsContent';

interface ProfileViewProps {
  profileData: UserProfileData;
}

export default function ProfileView({ profileData }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('diaries');
  
  const hasDiaries = profileData.diaries && profileData.diaries.length > 0;
  const hasAgits = profileData.agits && profileData.agits.length > 0;
  const hasFriends = profileData.friendCount === 0;

  return (
    <>
      <ProfileHeader
        profileImage={profileData.profileImage}
        name={profileData.name}
        bio={profileData.bio}
        friendCount={profileData.friendCount}
        onEditProfileClick={() => console.log("Edit profile clicked")}
      />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="px-4 py-4">
        {activeTab === 'diaries' && (
          hasDiaries ? <ProfileDiariesContent diaries={profileData.diaries} /> : <EmptyProfileDiaries />
        )}
        {activeTab === 'friends' && (
          hasFriends ? <div className="text-center text-gray-500 py-8 text-sm">친구 목록 컴포넌트가 여기에 표시됩니다.</div> : <EmptyProfileFriends />
        )}
        {activeTab === 'agits' && (
          hasAgits ? <ProfileAgitsContent agits={profileData.agits} /> : <EmptyProfileAgits />
        )}
      </div>
    </>
  );
}