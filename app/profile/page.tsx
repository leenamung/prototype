"use client";
import React, { useState, useEffect } from 'react';
import ProfileNavigationBar from './components/ProfileNavigationBar';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs, { ProfileTabKey } from './components/ProfileTabs';
import ProfileDiariesContent from './components/ProfileDiariesContent';
import ProfileAgitsContent from './components/ProfileAgitsContent';
import { sampleUserProfileData, UserProfileData } from './data/profileSampleData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('diaries');
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    setProfileData(sampleUserProfileData); 
  }, []);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--text-subtle)]">프로필을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div>
      <ProfileNavigationBar 
        onMoreOptionsClick={() => console.log("Profile more options clicked")}
      />
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
          <ProfileDiariesContent />
        )}
        {activeTab === 'friends' && (
          <div className="text-center text-[var(--text-subtle)] py-8 text-sm">
            친구 목록이 여기에 표시됩니다.
          </div>
        )}
        {activeTab === 'agits' && (
          <ProfileAgitsContent agits={profileData.agits} />
        )}
      </div>
    </div>
  );
}