import React from 'react';

// ProfileNavigationBar를 여기서 제거하고, 각 page나 ProfileView에서 렌더링하도록 변경
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}