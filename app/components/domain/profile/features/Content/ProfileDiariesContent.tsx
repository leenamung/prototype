"use client";
import React, { useState } from 'react';
import DiaryViewControls from '@/app/components/domain/profile/components/DiaryViewControls';
import DiaryListView from '@/app/components/domain/profile/features/Content/DiaryListView'; 
import DiaryGridView from '@/app/components/domain/profile/features/Content/DiaryGridView';
import DiaryCalendarView from '@/app/components/domain/profile/features/Content/DiaryCalendarView';
import FilterPanel, { ActiveFilters } from '@/app/components/domain/profile/features/Content/FilterPanel';
import { MyDiaryEntry } from '@/app/data/profileSampleData';
import EmptyProfileDiaries from '@/app/components/domain/profile/ui/empty/EmptyProfileDiaries';

type ViewMode = 'list' | 'grid' | 'calendar';

interface ProfileDiariesContentProps {
  diaries: MyDiaryEntry[];
}

const ProfileDiariesContent: React.FC<ProfileDiariesContentProps> = ({ diaries }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  const handleApplyFilters = (filters: ActiveFilters) => {
    setActiveFilters(filters);
    setIsFilterOpen(false); // 필터 적용 후 패널 닫기
  };

  const isDiariesEmpty = diaries.length === 0;
  return (
    <div>
      {!isDiariesEmpty && (
        <DiaryViewControls
          currentView={viewMode}
          onViewChange={setViewMode}
          onFilterToggle={() => setIsFilterOpen(true)}
          hasActiveFilters={Object.keys(activeFilters).length > 0}
        />
      )}

      <div className="px-4 py-4">
        {isDiariesEmpty ? (
          <EmptyProfileDiaries />
        ) : (
          <>
            {viewMode === 'list' && <DiaryListView diaries={diaries} />}
            {viewMode === 'grid' && <DiaryGridView diaries={diaries} />}
            {viewMode === 'calendar' && <DiaryCalendarView diaries={diaries} />}
          </>
        )}
      </div>

      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default ProfileDiariesContent;