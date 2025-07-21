// app/profile/components/ProfileAgitsContent.tsx
"use client";

import React from 'react';
import ProfileAgitListItem from './ProfileAgitListItem';
import type { UserAgitSummary } from '../data/profileSampleData';

interface ProfileAgitsContentProps {
  agits: UserAgitSummary[];
}

const ProfileAgitsContent: React.FC<ProfileAgitsContentProps> = ({ agits }) => {
  return (
    <div>
      {agits && agits.length > 0 ? (
        <div>
          {agits.map(agit => (
            <ProfileAgitListItem key={agit.id} agit={agit} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8 text-sm">소속된 아지트가 없습니다.</p>
      )}
    </div>
  );
};

export default ProfileAgitsContent;
