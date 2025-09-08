import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavigationBar 
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />
      {/* 이 children 영역이 메인 피드, 아지트 목록 등의 page.tsx 또는 loading.tsx가 됩니다. */}
      {children}
    </div>
  );
}