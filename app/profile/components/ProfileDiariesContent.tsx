"use client";
import React, { useState } from 'react';
import { sampleMySpaceDiaries as diaries } from '../data/mySpaceSampleData'; // 샘플 데이터 가져오기
import DiaryViewControls from './DiaryViewControls'; // 1단계에서 만든 컴포넌트
import DiaryListView from './DiaryListView'; // myspace의 컴포넌트 재사용
import DiaryGridView from './DiaryGridView'; // myspace의 컴포넌트 재사용
import DiaryCalendarView from './DiaryCalendarView'; // myspace의 컴포넌트 재사용
import FilterPanel, { ActiveFilters } from './FilterPanel'; // myspace의 컴포넌트 재사용

type ViewMode = 'list' | 'grid' | 'calendar';



const ProfileDiariesContent = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  const handleApplyFilters = (filters: ActiveFilters) => {
    setActiveFilters(filters);
    setIsFilterOpen(false); // 필터 적용 후 패널 닫기
  };

  return (
    <div>
      <DiaryViewControls
        currentView={viewMode}
        onViewChange={setViewMode}
        onFilterToggle={() => setIsFilterOpen(true)}
        hasActiveFilters={Object.keys(activeFilters).length > 0}
      />

      <div className="px-4 py-4">
        {viewMode === 'list' && <DiaryListView diaries={diaries} />}
        {viewMode === 'grid' && <DiaryGridView diaries={diaries} />}
        {viewMode === 'calendar' && <DiaryCalendarView diaries={diaries} />}
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