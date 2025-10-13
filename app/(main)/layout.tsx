import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';

export default function MainLayout({
  children, modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <NavigationBar 
        userProfileImage="https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20woman%2C%20soft%20lighting%2C%20warm%20tones%2C%20natural%20look%2C%20gentle%20smile%2C%20high%20quality%2C%20professional%20photo&width=100&height=100&seq=1&orientation=squarish"
      />
      {/* ✅ [구조 변경] modal을 children과 함께 렌더링합니다.
        평소에는 modal이 비어있다가, /diary/[id]로 이동 시 여기에 모달 내용이 렌더링됩니다.
      */}
      {children}
      {modal}
    </div>
  );
}