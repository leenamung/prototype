"use client";
import React from 'react';
import type { UserAgitSummary } from '@/app/data/profileSampleData';
import ProfileAgitListItem from '../../../common/AgitListItem';
import EmptyProfileAgits from '@/app/components/domain/profile/ui/empty/EmptyProfileAgits';

interface ProfileAgitsContentProps {
  agits: UserAgitSummary[];
}

const ProfileAgitsContent: React.FC<ProfileAgitsContentProps> = ({ agits }) => {
  return (
    <div>
      {agits.length > 0 ? (
        <div>
          {agits.map(agit => (<ProfileAgitListItem key={agit.id} agit={agit} />))}
        </div>
      ) : (
        <EmptyProfileAgits />
      )}
    </div>
  );
};

export default ProfileAgitsContent;