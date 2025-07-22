// app/profile/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import ProfileNavigationBar from './components/ProfileNavigationBar';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs, { ProfileTabKey } from './components/ProfileTabs';
import ProfileDiariesContent from './components/ProfileDiariesContent';
import ProfileAgitsContent from './components/ProfileAgitsContent';
import { sampleUserProfileData, UserProfileData } from './data/profileSampleData'; // 샘플 데이터 임포트

// For dynamic routes, you might get userId from params
// interface ProfilePageProps {
//   params: { userId: string };
// }
// const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
//   const { userId } = params;
//   // Fetch profileData based on userId

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('diaries');
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);

  // Simulate fetching profile data
  useEffect(() => {
    // In a real app, fetch data based on logged-in user or userId param
    setProfileData(sampleUserProfileData); 
  }, []);

  // Calculate the height of the fixed navigation bar (h-14 = 56px)
  const navBarHeight = "56px";
  // Calculate the height of the sticky tabs (py-3 + border = ~46px, but can vary)
  // For simplicity, let's assume ProfileTabs height is around 48px (h-12)
  // The ProfileHeader is not sticky in this setup.
  // The ProfileTabs will stick at `top-14` (below ProfileNavigationBar)

  if (!profileData) {
    return (
      // Basic loading state
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    // The main container for the profile page
    // pb-16 is for the global BottomTabBar
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

      {/* Content area with padding to avoid being overlapped by sticky tabs and nav bar */}
      {/* The ProfileTabs component is sticky at top-14.
          The ProfileHeader is part of the scrollable content.
          The ProfileNavigationBar is fixed at top-0.
          So, the content below ProfileTabs needs no additional top padding if ProfileTabs handles its own layout correctly.
      */}
      <div className="px-4 py-4">
        {activeTab === 'diaries' && (
          <ProfileDiariesContent diaries={profileData.diaries} />
        )}
        {activeTab === 'friends' && (
          <div className="text-center text-gray-500 py-8 text-sm">
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
