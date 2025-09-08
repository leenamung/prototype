import React from 'react';
import ProfileNavigationBar from '../../components/domain/profile/ProfileNavigationBar/ProfileNavigationBar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // ProfileView에서 네비게이션을 포함하므로, 여기서는 div만 렌더링
  return (
    <div className="pt-14">
      <ProfileNavigationBar />
      {children}
    </div>
  );
}